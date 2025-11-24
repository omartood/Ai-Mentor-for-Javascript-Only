import { GoogleGenAI, Chat, GenerateContentResponse, LiveServerMessage, Modality, Blob } from "@google/genai";
import { INITIAL_SYSTEM_INSTRUCTION } from '../constants';
import { QuizQuestion } from "../types";

// Singleton instance holder
let aiInstance: GoogleGenAI | null = null;

const getAI = (): GoogleGenAI => {
  if (!aiInstance) {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      throw new Error("API Key not found in environment variables");
    }
    aiInstance = new GoogleGenAI({ apiKey });
  }
  return aiInstance;
};

export const createMentorChat = (): Chat => {
  const ai = getAI();
  return ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: INITIAL_SYSTEM_INSTRUCTION,
      temperature: 0.7, // Balance between creativity and strict teaching
      maxOutputTokens: 2000,
    },
  });
};

export const sendMessageStream = async (
  chat: Chat, 
  message: string
): Promise<AsyncIterable<GenerateContentResponse>> => {
  try {
    return await chat.sendMessageStream({ message });
  } catch (error) {
    console.error("Error sending message to Gemini:", error);
    throw error;
  }
};

export const generateQuizForTopic = async (topicTitle: string): Promise<QuizQuestion[]> => {
  const ai = getAI();
  
  // Updated prompt for mixed questions (Concepts, Logic, Coding)
  const prompt = `
    Create a comprehensive quiz about "${topicTitle}" in JavaScript. 
    Generate exactly 10 multiple-choice questions.
    
    CRITICAL INSTRUCTIONS:
    You MUST provide a balanced mix of question types to test full competency:
    
    1. **Conceptual Mastery (~30%)**: Questions that test *why* it works or *when* to use it. (e.g., "Why prefer const over var?", "How does the Event Loop handle this?"). Avoid trivial definitions.
    2. **Code Output Prediction (~40%)**: Provide a markdown code snippet and ask the user to predict the exact console output.
    3. **Debugging & Logic Solving (~30%)**: Provide a buggy snippet or a logic puzzle and ask "What is the error?" or "How to fix this?".
    
    Strictly return ONLY a JSON array with the following structure for each object:
    {
      "id": number,
      "question": "string (can include markdown code blocks)",
      "options": ["string", "string", "string", "string"],
      "correctAnswer": number (0-3 index of the correct option),
      "explanation": "string (short explanation why)"
    }
    
    Do not include markdown formatting (like \`\`\`json) wrapping the whole response. Just the raw JSON array.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        temperature: 0.4, // Lower temperature for more deterministic JSON
      }
    });

    const text = response.text || '[]';
    // Cleanup text in case the model adds markdown despite instructions
    const cleanedText = text.replace(/```json/g, '').replace(/```/g, '').trim();
    
    const quizData = JSON.parse(cleanedText);
    return quizData as QuizQuestion[];
  } catch (error) {
    console.error("Error generating quiz:", error);
    // Fallback/Error handled by caller
    throw error;
  }
};

// --- Live API Audio Utils ---

function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

function encode(bytes: Uint8Array) {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

function createBlob(data: Float32Array): Blob {
  const l = data.length;
  const int16 = new Int16Array(l);
  for (let i = 0; i < l; i++) {
    int16[i] = data[i] * 32768;
  }
  return {
    data: encode(new Uint8Array(int16.buffer)),
    mimeType: 'audio/pcm;rate=16000',
  };
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

// --- Live Session Handler ---

export const connectLiveSession = async (
  onAudioData: (audioBuffer: AudioBuffer) => void,
  onClose: () => void
) => {
  const ai = getAI();
  const inputAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
  
  // We need to pass the output context from the caller or create one here, but decoding happens here
  // Ideally, the caller handles audio playback context, but to decode we need a context.
  // We'll create a temporary context just for decoding or expect the user to provide one.
  // For simplicity, we create one here, but real app might share.
  const decodeCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });

  let stream: MediaStream | null = null;
  
  try {
    stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  } catch (err) {
    console.error("Microphone access denied", err);
    onClose();
    return null;
  }

  const sessionPromise = ai.live.connect({
    model: 'gemini-2.5-flash-native-audio-preview-09-2025',
    config: {
      responseModalities: [Modality.AUDIO],
      systemInstruction: "You are JS Sensei, a friendly verbal JavaScript tutor. Your goal is to discuss JavaScript concepts, quiz the user verbally, and explain logic. If the user asks about non-JS topics, politely steer them back to code. Keep responses conversational, encouraging, and concise.",
      speechConfig: {
        voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } },
      },
    },
    callbacks: {
      onopen: () => {
        console.log("Live session opened");
        // Start streaming mic input
        const source = inputAudioContext.createMediaStreamSource(stream!);
        const scriptProcessor = inputAudioContext.createScriptProcessor(4096, 1, 1);
        
        scriptProcessor.onaudioprocess = (audioProcessingEvent) => {
          const inputData = audioProcessingEvent.inputBuffer.getChannelData(0);
          const pcmBlob = createBlob(inputData);
          
          sessionPromise.then((session) => {
            session.sendRealtimeInput({ media: pcmBlob });
          });
        };
        
        source.connect(scriptProcessor);
        scriptProcessor.connect(inputAudioContext.destination);
      },
      onmessage: async (message: LiveServerMessage) => {
        const base64Audio = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
        if (base64Audio) {
          const audioBuffer = await decodeAudioData(
            decode(base64Audio),
            decodeCtx,
            24000,
            1
          );
          onAudioData(audioBuffer);
        }
        
        if (message.serverContent?.interrupted) {
          console.log("Model interrupted");
          // Handle interruption (clear queues in UI)
        }
      },
      onclose: () => {
        console.log("Live session closed");
        onClose();
      },
      onerror: (err) => {
        console.error("Live session error", err);
        onClose();
      }
    }
  });

  return {
    close: async () => {
      inputAudioContext.close();
      decodeCtx.close();
      if (stream) stream.getTracks().forEach(track => track.stop());
      const session = await sessionPromise;
      session.close();
    }
  };
};