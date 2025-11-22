import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
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
  
  // Updated prompt for 10 questions focusing on logic and code
  const prompt = `
    Create a challenging quiz about "${topicTitle}" in JavaScript. 
    Generate exactly 10 multiple-choice questions.
    
    CRITICAL INSTRUCTIONS:
    1. Focus on **Practical Logic**, **Code Output Prediction**, and **Spotting Errors**.
    2. Avoid simple definition questions (e.g., NOT "What is a variable?").
    3. Instead, provide small code snippets and ask what the console log will be, or why a bug occurs.
    
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