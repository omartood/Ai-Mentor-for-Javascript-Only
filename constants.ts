import { CurriculumModule } from './types';

export const CURRICULUM: CurriculumModule[] = [
  {
    id: 'basics',
    title: 'JavaScript Basics',
    topics: [
      {
        id: 'intro',
        title: 'Introduction to JS',
        description: 'What is JavaScript and how does it run?',
        promptContext: 'Teach the absolute basics of JavaScript. Explain what it is, where it runs (browser/node), and how to log "Hello World" to the console.'
      },
      {
        id: 'variables',
        title: 'Variables & Types',
        description: 'let, const, var and primitive types.',
        promptContext: 'Explain variables in JavaScript. Compare `let`, `const`, and `var`. Explain primitive types: string, number, boolean, null, undefined.'
      },
      {
        id: 'operators',
        title: 'Basic Operators',
        description: 'Math and comparison operators.',
        promptContext: 'Teach arithmetic (+, -, *, /) and comparison (==, ===, !=, !==) operators. Emphasize strict equality (===).'
      }
    ]
  },
  {
    id: 'flow',
    title: 'Control Flow',
    topics: [
      {
        id: 'conditionals',
        title: 'Conditionals',
        description: 'If/Else and Switch statements.',
        promptContext: 'Explain if/else statements and ternary operators. Briefly mention switch statements.'
      },
      {
        id: 'loops',
        title: 'Loops',
        description: 'For, While, and Do-While loops.',
        promptContext: 'Explain loops in JavaScript. Focus on the standard `for` loop and the `while` loop. Give examples of iterating a counter.'
      }
    ]
  },
  {
    id: 'functions',
    title: 'Functions',
    topics: [
      {
        id: 'func-basics',
        title: 'Function Declarations',
        description: 'Defining and calling functions.',
        promptContext: 'Explain how to declare functions, pass parameters, and return values.'
      },
      {
        id: 'arrow-func',
        title: 'Arrow Functions',
        description: 'Modern ES6 arrow syntax.',
        promptContext: 'Teach ES6 Arrow Functions (`=>`). Explain implicit returns and how they differ syntactically from regular functions.'
      }
    ]
  },
  {
    id: 'structures',
    title: 'Data Structures',
    topics: [
      {
        id: 'arrays',
        title: 'Arrays',
        description: 'Lists of data and methods.',
        promptContext: 'Explain Arrays. Show how to create them, access elements by index, and common methods like `.push()`, `.pop()`, and `.map()`.'
      },
      {
        id: 'objects',
        title: 'Objects',
        description: 'Key-value pairs and properties.',
        promptContext: 'Explain JavaScript Objects. Show how to define object literals, access properties with dot notation and bracket notation.'
      }
    ]
  },
  {
    id: 'dom',
    title: 'The DOM',
    topics: [
      {
        id: 'dom-selection',
        title: 'Selecting Elements',
        description: 'querySelector and getElementById.',
        promptContext: 'Explain the Document Object Model (DOM). Show how to select elements using `document.querySelector` and `document.getElementById`.'
      },
      {
        id: 'dom-events',
        title: 'Event Listeners',
        description: 'Handling clicks and user input.',
        promptContext: 'Teach how to add interactivity using `addEventListener`. Show a click event example.'
      }
    ]
  },
  {
    id: 'async',
    title: 'Asynchronous JS',
    topics: [
      {
        id: 'promises',
        title: 'Promises',
        description: 'Handling async operations.',
        promptContext: 'Explain the concept of Asynchronous programming. Introduce Promises, `.then()`, and `.catch()`.'
      },
      {
        id: 'async-await',
        title: 'Async / Await',
        description: 'Modern async syntax.',
        promptContext: 'Teach `async` and `await` syntax as a cleaner way to handle Promises. Provide a try/catch block example.'
      }
    ]
  }
];

export const INITIAL_SYSTEM_INSTRUCTION = `
You are "JS Sensei", an expert, patient, and encouraging JavaScript mentor. 
Your goal is to teach the user JavaScript from start to finish based on the specific topic they have selected.

Style Guidelines:
1. **Be Concise but Clear**: Explain concepts simply without overwhelming jargon.
2. **Code First**: Always provide clear, runnable code examples. Use standard Markdown code blocks (e.g., \`\`\`javascript).
3. **Interactive**: Ask the user small questions or give them mini-challenges to test their understanding.
4. **Formatting**: Use bolding for key terms. Use bullet points for lists.
5. **Context Aware**: If the user asks a question off-topic, answer it briefly but gently guide them back to the current lesson topic.
`;
