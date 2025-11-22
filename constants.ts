import { CurriculumModule } from './types';

export const CURRICULUM: CurriculumModule[] = [
  {
    id: 'module-1-foundations',
    title: 'Module 1: Foundations',
    topics: [
      {
        id: 'm1-history',
        title: '1. History & Versions',
        description: 'Brendan Eich, Netscape, and ES6+.',
        promptContext: 'Explain the history of JavaScript. Created in 10 days by Brendan Eich. Explain ECMAScript (ES) versions, specifically ES5 vs ES6 (2015) and why it matters today.',
        practiceCode: `// JavaScript was created in 1995.
// Today, we use "Modern JavaScript" (ES6+).

// This is a comment (ignored by the computer).
console.log("Welcome to the evolution of Web Development.");`
      },
      {
        id: 'm1-engines',
        title: '2. How JS Works (Engines)',
        description: 'V8, SpiderMonkey, and JIT compilation.',
        promptContext: 'Explain how JavaScript runs. It is interpreted/JIT compiled. Mention the V8 Engine (Chrome/Node) and SpiderMonkey (Firefox). Explain single-threaded nature briefly.',
        practiceCode: `// JS runs in an "Engine" (like V8 in Chrome).
// It reads code line-by-line (mostly).

console.log("Line 1 executes");
console.log("Line 2 executes");
// The engine compiles this to machine code on the fly.`
      },
      {
        id: 'm1-setup',
        title: '3. Environment Setup',
        description: 'Node.js vs Browser console.',
        promptContext: 'Explain the difference between running JS in a Browser (Window object, DOM) vs Node.js (Process object, no DOM).',
        practiceCode: `// We are strictly in a JS environment here.
// In a browser, you have 'window'.
// In Node.js, you have 'global'.

console.log("Where am I running?");
// console.log(window); // Uncommenting this might error if in Node!`
      },
      {
        id: 'm1-variables',
        title: '4. Variables (var, let, const)',
        description: 'Storage containers for data.',
        promptContext: 'Deep dive into `var`, `let`, and `const`. Explain why we avoid `var` (function scope, hoisting issues) and prefer `const` by default, `let` when reassignment is needed.',
        practiceCode: `// 1. CONST (Constant) - The default choice
const birthYear = 1995;
// birthYear = 2000; // Error! Cannot change.

// 2. LET (Block Scoped) - Use when values change
let age = 25;
age = 26; // Totally fine.

// 3. VAR (Legacy) - Avoid this
var oldWay = "I cause bugs";`
      },
      {
        id: 'm1-naming',
        title: '5. Naming Conventions',
        description: 'camelCase and reserved words.',
        promptContext: 'Explain standard naming conventions: camelCase for variables/functions, PascalCase for Classes, UPPER_SNAKE_CASE for constants. Mention reserved keywords (if, class, return).',
        practiceCode: `// Standard: camelCase
const firstName = "John";
const isActiveUser = true;

// Classes: PascalCase
class UserProfile {}

// Constants: SCREAMING_SNAKE_CASE
const MAX_RETRY_COUNT = 5;`
      },
      {
        id: 'm1-primitives-string',
        title: '6. Primitives: Strings',
        description: 'Text, quotes, and concatenation.',
        promptContext: 'Explain the String data type. Single quotes vs Double quotes. Basic concatenation with `+`. Escaping characters.',
        practiceCode: `const single = 'Single quotes';
const double = "Double quotes";

// Concatenation
const greeting = "Hello " + "World";

// Escaping
const quote = "He said, \\"JS is cool\\""; 
console.log(quote);`
      },
      {
        id: 'm1-primitives-number',
        title: '7. Primitives: Numbers',
        description: 'Integers, Floats, and NaN.',
        promptContext: 'Explain the Number type. JS implies floats. Mention `NaN` (Not a Number), Infinity, and basic math operations.',
        practiceCode: `const int = 42;
const float = 3.14;

console.log(10 + 5); // Add
console.log(10 / 2); // Divide

// Special Numbers
console.log(10 / "Apple"); // NaN
console.log(1 / 0);        // Infinity`
      },
      {
        id: 'm1-boolean',
        title: '8. Primitives: Boolean',
        description: 'True, False, and toggle logic.',
        promptContext: 'Explain Boolean logic. strictly `true` or `false`. Explain how comparisons result in booleans.',
        practiceCode: `const isCoding = true;
const isSleeping = false;

const isGreater = 10 > 5; // true
console.log("Is 10 > 5?", isGreater);

// Toggling
let lightSwitch = true;
lightSwitch = !lightSwitch; // Now false`
      },
      {
        id: 'm1-null-undefined',
        title: '9. Null vs Undefined',
        description: 'The absence of value.',
        promptContext: 'Explain the crucial difference. `undefined` (variable declared but not assigned) vs `null` (intentional absence of value).',
        practiceCode: `let waiting;
console.log(waiting); // undefined

let emptyBox = null;
console.log(emptyBox); // null

// Bug check:
console.log(typeof null); // "object" (Famous JS Bug)`
      },
      {
        id: 'm1-symbols-bigint',
        title: '10. Symbols & BigInt',
        description: 'Advanced primitives.',
        promptContext: 'Briefly explain `BigInt` for large integers (n suffix) and `Symbol` for unique identifiers.',
        practiceCode: `// BigInt
const huge = 9007199254740991n; 
const huge2 = huge + 1n;
console.log(huge2);

// Symbol (Unique ID)
const id1 = Symbol("id");
const id2 = Symbol("id");
console.log(id1 === id2); // false`
      },
      {
        id: 'm1-typeof',
        title: '11. The typeof Operator',
        description: 'Checking data types dynamically.',
        promptContext: 'Teach the `typeof` operator to inspect value types at runtime.',
        practiceCode: `console.log(typeof "Hello"); // string
console.log(typeof 42);      // number
console.log(typeof true);    // boolean
console.log(typeof {});      // object
console.log(typeof function(){}); // function`
      },
      {
        id: 'm1-strict',
        title: '12. Strict Mode',
        description: '"use strict" and cleaner code.',
        promptContext: 'Explain `"use strict"`. How it prevents using undeclared variables and reserved keywords.',
        practiceCode: `"use strict";

// x = 3.14; // Error: x is not defined
let x = 3.14; // Correct

function strictDemo() {
  // "use strict" applies here too
  return "Secure code";
}`
      }
    ]
  },
  {
    id: 'module-2-operators',
    title: 'Module 2: Operators & Logic',
    topics: [
      {
        id: 'm2-arithmetic',
        title: '1. Arithmetic Operators',
        description: 'Math, Modulo, and Exponentiation.',
        promptContext: 'Cover +, -, *, /, %. Explain the Modulo operator (%) for remainders and Exponentiation (**).',
        practiceCode: `console.log(10 % 3); // 1 (Remainder)
console.log(2 ** 3); // 8 (2 to the power of 3)

let num = 5;
num++; // Increment
console.log(num);`
      },
      {
        id: 'm2-assignment',
        title: '2. Assignment Operators',
        description: '=, +=, -=, and friends.',
        promptContext: 'Explain assignment (=) vs modification assignment (+=, -=, *=).',
        practiceCode: `let score = 10;

score += 5; // Same as score = score + 5
console.log(score); // 15

score *= 2; 
console.log(score); // 30`
      },
      {
        id: 'm2-comparison',
        title: '3. Comparison Operators',
        description: '== vs === and inequalities.',
        promptContext: 'Explain Loose equality (==) vs Strict equality (===). Always use Strict. >, <, >=, <=.',
        practiceCode: `// The "Evil" Twins
console.log(5 == "5");  // true (Type coercion)
console.log(5 === "5"); // false (Checks type too)

console.log(10 > 5); // true
console.log(10 !== 10); // false`
      },
      {
        id: 'm2-logical',
        title: '4. Logical Operators',
        description: 'AND, OR, NOT (&&, ||, !).',
        promptContext: 'Explain Boolean logic gates. && (both true), || (one true), ! (flip).',
        practiceCode: `const hasID = true;
const hasTicket = false;

console.log(hasID && hasTicket); // false
console.log(hasID || hasTicket); // true
console.log(!hasID); // false`
      },
      {
        id: 'm2-truthy-falsy',
        title: '5. Truthy vs Falsy',
        description: 'How JS evaluates non-booleans.',
        promptContext: 'List the falsy values: false, 0, "", null, undefined, NaN. Everything else is Truthy.',
        practiceCode: `const val = ""; // Falsy

if (val) {
  console.log("This won't run");
} else {
  console.log("Empty string is falsy");
}

if ("Hello") console.log("String is truthy");`
      },
      {
        id: 'm2-if-else',
        title: '6. If, Else If, Else',
        description: 'Branching logic flow.',
        promptContext: 'Standard conditional branching syntax.',
        practiceCode: `const hour = 14;

if (hour < 12) {
  console.log("Good Morning");
} else if (hour < 18) {
  console.log("Good Afternoon");
} else {
  console.log("Good Evening");
}`
      },
      {
        id: 'm2-ternary',
        title: '7. Ternary Operator',
        description: 'One-line if statements.',
        promptContext: 'Explain the conditional operator `condition ? trueVal : falseVal`.',
        practiceCode: `const age = 20;
const type = age >= 18 ? "Adult" : "Minor";

console.log("User is:", type);

// Nested (hard to read, be careful)
const status = age > 60 ? "Senior" : (age > 18 ? "Adult" : "Kid");`
      },
      {
        id: 'm2-switch',
        title: '8. Switch Statements',
        description: 'Handling many cases.',
        promptContext: 'Explain `switch`, `case`, `break`, and `default`.',
        practiceCode: `const fruit = "Apple";

switch(fruit) {
  case "Banana":
    console.log("Yellow");
    break;
  case "Apple":
    console.log("Red");
    break;
  default:
    console.log("Unknown color");
}`
      },
      {
        id: 'm2-while',
        title: '9. While & Do-While',
        description: 'Looping until a condition is met.',
        promptContext: 'Explain `while` loops. Mention infinite loop dangers. Briefly `do...while` (runs once).',
        practiceCode: `let count = 0;

while (count < 3) {
  console.log("While loop:", count);
  count++;
}

// Do While runs at least once
do {
  console.log("Run once");
} while (false);`
      },
      {
        id: 'm2-for',
        title: '10. The For Loop',
        description: 'The classic iterator.',
        promptContext: 'Explain `for (init; condition; step)`. The most common loop structure.',
        practiceCode: `for (let i = 0; i < 5; i++) {
  console.log(\`Iteration \${i}\`);
}

// Reverse
for (let i = 3; i > 0; i--) {
  console.log("Countdown:", i);
}`
      },
      {
        id: 'm2-break-continue',
        title: '11. Break & Continue',
        description: 'Controlling loop execution.',
        promptContext: 'Explain `break` (exit loop) and `continue` (skip current iteration).',
        practiceCode: `for (let i = 0; i < 10; i++) {
  if (i === 2) continue; // Skip 2
  if (i === 5) break;    // Stop at 5
  console.log(i);
}`
      },
      {
        id: 'm2-errors',
        title: '12. Basic Error Handling',
        description: 'Try, Catch, Finally.',
        promptContext: 'Introduction to `try { ... } catch (e) { ... }`. Handling runtime crashes gracefully.',
        practiceCode: `try {
  // nonExistentFunction();
  throw new Error("Something went wrong!");
} catch (error) {
  console.error("Caught:", error.message);
} finally {
  console.log("Cleanup runs regardless");
}`
      }
    ]
  },
  {
    id: 'module-3-functions',
    title: 'Module 3: Functions & Scope',
    topics: [
      {
        id: 'm3-declaration',
        title: '1. Declarations vs Expressions',
        description: 'Ways to define functions.',
        promptContext: 'Explain Function Declarations (hoisted) vs Function Expressions (not hoisted).',
        practiceCode: `// Declaration (Hoisted)
console.log(add(2, 2)); 

function add(a, b) {
  return a + b;
}

// Expression (Not Hoisted)
const subtract = function(a, b) {
  return a - b;
};`
      },
      {
        id: 'm3-return',
        title: '2. Return Values',
        description: 'Getting data out of functions.',
        promptContext: 'Explain `return`. Functions return `undefined` by default if no return statement is present.',
        practiceCode: `function multiply(a, b) {
  return a * b;
  console.log("Dead code - never runs");
}

const result = multiply(5, 5);
console.log(result); // 25`
      },
      {
        id: 'm3-params',
        title: '3. Parameters vs Arguments',
        description: 'Inputs for your functions.',
        promptContext: 'Explain Parameters (variables in definition) vs Arguments (values passed in call). Order matters.',
        practiceCode: `function greet(name, title) {
  console.log(\`Hello \${title} \${name}\`);
}

greet("Bond", "Mr."); // Arguments`
      },
      {
        id: 'm3-defaults',
        title: '4. Default Parameters',
        description: 'Fallback values (ES6).',
        promptContext: 'Explain how to set default values `function(a = 0)`.',
        practiceCode: `function cook(dish = "Pasta") {
  console.log("Cooking " + dish);
}

cook(); // Uses default
cook("Steak"); // Overrides default`
      },
      {
        id: 'm3-scope',
        title: '5. Scope Chains',
        description: 'Global, Function, and Block Scope.',
        promptContext: 'Deep dive into where variables are accessible. Lexical scoping.',
        practiceCode: `const globalVar = "Global";

function outer() {
  const outerVar = "Outer";
  
  if (true) {
    const blockVar = "Block";
    console.log(globalVar); // Works
    console.log(outerVar);  // Works
  }
  // console.log(blockVar); // Error
}
outer();`
      },
      {
        id: 'm3-hoisting',
        title: '6. Hoisting',
        description: 'How JS lifts declarations.',
        promptContext: 'Explain Hoisting. Why function declarations can be called before definition, but variables (var) return undefined, and let/const throw errors (TDZ).',
        practiceCode: `// Function Hoisting
hoistedFunc();

function hoistedFunc() {
  console.log("I am lifted to the top!");
}

// Variable Hoisting
console.log(myVar); // undefined (not error!)
var myVar = 10;`
      },
      {
        id: 'm3-arrow-basic',
        title: '7. Arrow Functions',
        description: 'Concise ES6 Syntax.',
        promptContext: 'Introduction to `() => {}`. Implicit returns for one-liners.',
        practiceCode: `// Traditional
const square = function(x) { return x * x; }

// Arrow
const squareArrow = x => x * x; 

console.log(squareArrow(5)); // 25`
      },
      {
        id: 'm3-arrow-this',
        title: '8. Arrow Functions & "this"',
        description: 'Lexical `this` binding.',
        promptContext: 'Advanced: Explain that Arrow functions do NOT have their own `this`. They inherit it from the parent scope.',
        practiceCode: `const obj = {
  name: "Hero",
  regular: function() { console.log(this.name) },
  arrow: () => { console.log(this.name) } // 'this' is window/global
};

obj.regular(); // "Hero"
obj.arrow();   // undefined (usually)`
      },
      {
        id: 'm3-iife',
        title: '9. IIFE',
        description: 'Immediately Invoked Function Expressions.',
        promptContext: 'Explain `(function(){})()`. Used for isolation before modules existed.',
        practiceCode: `(function() {
  const secret = "I am hidden";
  console.log("Running immediately!");
})();

// console.log(secret); // Error`
      },
      {
        id: 'm3-callbacks',
        title: '10. Callback Functions',
        description: 'Passing functions as data.',
        promptContext: 'Explain Higher Order Functions. Passing a function into another function to be called later.',
        practiceCode: `function processUser(name, callback) {
  console.log("Processing " + name);
  callback();
}

processUser("Alice", () => {
  console.log("Finished!");
});`
      },
      {
        id: 'm3-recursion',
        title: '11. Recursion',
        description: 'Functions calling themselves.',
        promptContext: 'Explain base cases and recursive steps. Example: Factorial or Countdown.',
        practiceCode: `function countdown(n) {
  if (n <= 0) {
    console.log("Liftoff!");
    return;
  }
  console.log(n);
  countdown(n - 1);
}

countdown(3);`
      },
      {
        id: 'm3-closures',
        title: '12. Closures (Advanced)',
        description: 'Memory and Scope retention.',
        promptContext: 'Explain how a function "closes over" variables from its outer scope, remembering them even after the outer function finishes.',
        practiceCode: `function makeBank(balance) {
  return function(amount) {
    balance += amount;
    return \`New Balance: \${balance}\`;
  };
}

const myWallet = makeBank(100);
console.log(myWallet(50)); // 150
console.log(myWallet(-20)); // 130`
      }
    ]
  },
  {
    id: 'module-4-objects-arrays',
    title: 'Module 4: Arrays & Objects',
    topics: [
      {
        id: 'm4-objects',
        title: '1. Object Literals',
        description: 'Key-value pairs.',
        promptContext: 'Basics of objects `{}`. Keys (strings/symbols) and Values (any type).',
        practiceCode: `const hero = {
  name: "Batman",
  city: "Gotham",
  age: 35
};
console.log(hero);`
      },
      {
        id: 'm4-access',
        title: '2. Dot vs Bracket Notation',
        description: 'Accessing properties.',
        promptContext: '`obj.prop` vs `obj["prop"]`. Use bracket notation for dynamic keys.',
        practiceCode: `const car = { color: "red", "max-speed": 200 };

console.log(car.color);
// console.log(car.max-speed); // Error
console.log(car["max-speed"]); // Correct

const key = "color";
console.log(car[key]); // Dynamic`
      },
      {
        id: 'm4-methods',
        title: '3. Object Methods',
        description: 'Functions inside objects.',
        promptContext: 'Defining methods using ES6 shorthand `method() {}`. Accessing internal data with `this`.',
        practiceCode: `const mathObj = {
  add(a, b) { return a + b; },
  pi: 3.14
};

console.log(mathObj.add(10, 5));`
      },
      {
        id: 'm4-arrays',
        title: '4. Arrays Basics',
        description: 'Ordered lists of data.',
        promptContext: '`[]` syntax. 0-based indexing. `length` property.',
        practiceCode: `const fruits = ["Apple", "Banana", "Cherry"];

console.log(fruits[0]); // Apple
console.log(fruits.length); // 3
fruits[1] = "Blueberry"; // Mutable`
      },
      {
        id: 'm4-array-basic-methods',
        title: '5. Push, Pop, Shift, Unshift',
        description: 'Adding and removing items.',
        promptContext: 'Explain standard queue/stack operations. Push/Pop (End), Shift/Unshift (Start).',
        practiceCode: `const stack = [1, 2];

stack.push(3); // [1, 2, 3]
const last = stack.pop(); // 3

stack.unshift(0); // [0, 1, 2]
stack.shift(); // 0 removed`
      },
      {
        id: 'm4-search',
        title: '6. Searching Arrays',
        description: 'indexOf, includes, find.',
        promptContext: 'How to find items. Primitive search (indexOf/includes) vs Condition search (find).',
        practiceCode: `const nums = [10, 20, 30, 40];

console.log(nums.includes(20)); // true
console.log(nums.indexOf(30)); // 2

// Find first number > 25
const match = nums.find(n => n > 25);
console.log(match); // 30`
      },
      {
        id: 'm4-map',
        title: '7. Transform: .map()',
        description: 'Create new arrays from old ones.',
        promptContext: 'Explain `.map()`. Crucial: it returns a *new* array, doesn`t mutate original.',
        practiceCode: `const prices = [10, 20, 30];

const withTax = prices.map(p => p * 1.1);

console.log(prices);  // Original unchanged
console.log(withTax); // New values`
      },
      {
        id: 'm4-filter',
        title: '8. Filter: .filter()',
        description: 'Selecting specific items.',
        promptContext: 'Explain `.filter()`. Returns new array with items that pass the test.',
        practiceCode: `const ages = [12, 18, 25, 10];

const adults = ages.filter(age => age >= 18);

console.log(adults); // [18, 25]`
      },
      {
        id: 'm4-reduce',
        title: '9. Accumulate: .reduce()',
        description: 'Boiling arrays down to one value.',
        promptContext: 'Deep dive into `.reduce((acc, curr) => {}, initial)`. The Swiss Army knife of arrays.',
        practiceCode: `const nums = [1, 2, 3, 4];

const sum = nums.reduce((total, current) => {
  return total + current;
}, 0);

console.log("Total:", sum); // 10`
      },
      {
        id: 'm4-destructure-obj',
        title: '10. Object Destructuring',
        description: 'Extracting properties easily.',
        promptContext: 'ES6 Destructuring `{ name } = user`. Renaming variables and default values.',
        practiceCode: `const user = { id: 1, name: "Neo", role: "Admin" };

const { name, role: job } = user;

console.log(name); // Neo
console.log(job);  // Admin`
      },
      {
        id: 'm4-destructure-arr',
        title: '11. Array Destructuring',
        description: 'Unpacking lists.',
        promptContext: '`const [first, second] = arr`. Skipping items with commas.',
        practiceCode: `const coords = [100, 200, 300];

const [x, y] = coords;
console.log(x, y); // 100, 200

const [,, z] = coords; // Skip first two
console.log(z); // 300`
      },
      {
        id: 'm4-ref-vs-value',
        title: '12. Reference vs Value',
        description: 'How data is stored.',
        promptContext: 'Crucial concept: Primitives are by value (copy), Objects are by reference (address). Mutating an object variable affects copies.',
        practiceCode: `let a = 10;
let b = a;
b = 20; 
console.log(a); // 10 (Unchanged)

const obj1 = { val: 10 };
const obj2 = obj1; // Reference copy
obj2.val = 20;
console.log(obj1.val); // 20 (Changed!)`
      }
    ]
  },
  {
    id: 'module-5-modern-data',
    title: 'Module 5: Modern JS & Data',
    topics: [
      {
        id: 'm5-string-methods',
        title: '1. Advanced Strings',
        description: 'Template literals and methods.',
        promptContext: '`split`, `join`, `slice`, `trim`. Template literals `${}`.',
        practiceCode: `const text = "  JavaScript is fun  ";
console.log(text.trim().toUpperCase());

const words = "cat,dog,bird".split(",");
console.log(words); // Array`
      },
      {
        id: 'm5-math',
        title: '2. Math Object',
        description: 'Number crunching.',
        promptContext: '`Math.random()`, `Math.floor/ceil/round`, `Math.max/min`.',
        practiceCode: `const rand = Math.random(); // 0 to 1
const dice = Math.floor(rand * 6) + 1;
console.log("Dice roll:", dice);

console.log(Math.max(10, 50, 5)); // 50`
      },
      {
        id: 'm5-date',
        title: '3. Date Object',
        description: 'Time is hard.',
        promptContext: '`new Date()`. Getting year, month, day. Timestamps (Date.now()).',
        practiceCode: `const now = new Date();
console.log(now.getFullYear());

// Timestamp
const start = Date.now();
// ... do work
console.log("Time elapsed:", Date.now() - start);`
      },
      {
        id: 'm5-json',
        title: '4. JSON',
        description: 'JavaScript Object Notation.',
        promptContext: '`JSON.stringify()` and `JSON.parse()`. The standard for API data.',
        practiceCode: `const data = { id: 1, active: true };

const jsonString = JSON.stringify(data);
console.log(jsonString); // '{"id":1,"active":true}'

const parsed = JSON.parse(jsonString);
console.log(parsed.id);`
      },
      {
        id: 'm5-map',
        title: '5. Map (Data Structure)',
        description: 'Better Key-Value pairs.',
        promptContext: '`Map` vs `Object`. Keys can be any type in Map. `.set`, `.get`, `.has`.',
        practiceCode: `const inventory = new Map();

inventory.set("apples", 10);
inventory.set(true, "boolean key logic"); // Key can be anything

console.log(inventory.get("apples"));
console.log(inventory.size);`
      },
      {
        id: 'm5-set',
        title: '6. Set (Data Structure)',
        description: 'Unique values only.',
        promptContext: '`Set`. Removes duplicates automatically. `.add`, `.has`, `.delete`.',
        practiceCode: `const ids = new Set([1, 2, 2, 3, 3, 3]);

console.log(ids); // {1, 2, 3}
console.log(ids.has(2)); // true

ids.add(4);`
      },
      {
        id: 'm5-spread',
        title: '7. Spread Operator',
        description: '...Expanding iterables.',
        promptContext: 'Using `...` to copy arrays/objects and merge them.',
        practiceCode: `const arr1 = [1, 2];
const arr2 = [...arr1, 3, 4]; // Copy and add

const base = { a: 1 };
const merged = { ...base, b: 2 };

console.log(merged);`
      },
      {
        id: 'm5-rest',
        title: '8. Rest Parameter',
        description: '...Gathering arguments.',
        promptContext: 'Using `...args` in function definitions to accept infinite arguments.',
        practiceCode: `function sumAll(...numbers) {
  return numbers.reduce((a, b) => a + b, 0);
}

console.log(sumAll(1, 2, 3, 4, 5)); // 15`
      },
      {
        id: 'm5-optional-chain',
        title: '9. Optional Chaining',
        description: 'Safe property access `?.`.',
        promptContext: 'Explain `user?.address?.street`. Prevents errors if intermediate property is null/undefined.',
        practiceCode: `const user = { name: "Alice" };

// console.log(user.address.city); // CRASH!
console.log(user.address?.city); // undefined (Safe)

console.log(user.getProfile?.()); // Safe method call`
      },
      {
        id: 'm5-nullish',
        title: '10. Nullish Coalescing',
        description: 'The `??` operator.',
        promptContext: 'Difference between `||` (checks falsy) and `??` (checks only null/undefined).',
        practiceCode: `const count = 0;

// || thinks 0 is bad
console.log(count || 10); // 10 (Wrong logic often)

// ?? only cares about null/undefined
console.log(count ?? 10); // 0 (Correct)`
      },
      {
        id: 'm5-for-of',
        title: '11. For...Of vs For...In',
        description: 'Modern iteration.',
        promptContext: '`for...of` (iterables: arrays, strings) vs `for...in` (object keys).',
        practiceCode: `const list = ["a", "b"];

for (const item of list) {
  console.log("Value:", item);
}

const obj = { a: 1, b: 2 };
for (const key in obj) {
  console.log("Key:", key);
}`
      },
      {
        id: 'm5-generators',
        title: '12. Generators',
        description: 'Functions that pause.',
        promptContext: 'Brief intro to `function*` and `yield`.',
        practiceCode: `function* idMaker() {
  let index = 0;
  while(true)
    yield index++;
}

const gen = idMaker();
console.log(gen.next().value); // 0
console.log(gen.next().value); // 1`
      }
    ]
  },
  {
    id: 'module-6-dom',
    title: 'Module 6: The DOM',
    topics: [
      {
        id: 'm6-tree',
        title: '1. DOM Tree Structure',
        description: 'Document Object Model.',
        promptContext: 'Explain DOM as a tree of nodes. Window -> Document -> HTML -> Body.',
        practiceCode: `console.log(document.title);
console.log(document.body.nodeName); // BODY`
      },
      {
        id: 'm6-selectors',
        title: '2. Selecting Elements',
        description: 'querySelector & getElement.',
        promptContext: '`getElementById`, `querySelector` (single), `querySelectorAll` (NodeList).',
        practiceCode: `// Assume <div id="app"> exists
const app = document.getElementById("app");
const items = document.querySelectorAll("div");

console.log(app); // Element or null`
      },
      {
        id: 'm6-content',
        title: '3. Text vs HTML',
        description: 'textContent vs innerHTML.',
        promptContext: 'Difference between `textContent` (safe, text only) and `innerHTML` (parses HTML, XSS risk).',
        practiceCode: `const div = document.createElement("div");

div.textContent = "<strong>Safe</strong>";
console.log(div.innerHTML); // &lt;strong&gt;...

div.innerHTML = "<b>Bold</b>";
console.log(div.textContent); // Bold`
      },
      {
        id: 'm6-style',
        title: '4. Manipulating Styles',
        description: 'Changing CSS via JS.',
        promptContext: '`element.style.property`. CamelCase usage (backgroundColor).',
        practiceCode: `// const box = document.querySelector(".box");
// box.style.backgroundColor = "red";
// box.style.fontSize = "20px";
console.log("Styles applied via JS object model.");`
      },
      {
        id: 'm6-classes',
        title: '5. ClassList API',
        description: 'Adding/Removing classes.',
        promptContext: '`classList.add`, `.remove`, `.toggle`, `.contains`. Cleaner than string manipulation.',
        practiceCode: `// element.classList.add("active");
// element.classList.toggle("hidden");

// if (element.classList.contains("active")) { ... }
console.log("Using classList is better than .className");`
      },
      {
        id: 'm6-create',
        title: '6. Creating Elements',
        description: 'createElement & append.',
        promptContext: '`document.createElement`, `appendChild`, `prepend`.',
        practiceCode: `const btn = document.createElement("button");
btn.textContent = "Click Me";

// document.body.appendChild(btn);
console.log("Button created in memory.");`
      },
      {
        id: 'm6-events',
        title: '7. Event Listeners',
        description: 'Reacting to user input.',
        promptContext: '`addEventListener("click", fn)`. Importance of not using `onclick` property.',
        practiceCode: `// btn.addEventListener("click", () => {
//   console.log("Clicked!");
// });

console.log("Listeners attached.");`
      },
      {
        id: 'm6-event-obj',
        title: '8. The Event Object',
        description: 'e.target, e.preventDefault.',
        promptContext: 'The `event` argument. `target` (what was clicked), `type`. `preventDefault()` for forms.',
        practiceCode: `function handleClick(event) {
  console.log("Clicked on:", event.target.tagName);
  event.preventDefault(); // Stop link navigation
}
console.log("Event object holds all the details.");`
      },
      {
        id: 'm6-bubble',
        title: '9. Bubbling vs Capturing',
        description: 'Event propagation flow.',
        promptContext: 'Explain that events bubble up from child to parent. `stopPropagation()`.',
        practiceCode: `// Div -> Button
// Clicking button triggers button click, THEN div click (Bubbling).

// event.stopPropagation(); // Stops the bubble.`
      },
      {
        id: 'm6-delegation',
        title: '10. Event Delegation',
        description: 'Efficient event handling.',
        promptContext: 'Adding one listener to a parent (`ul`) to handle clicks on children (`li`) using `e.target`.',
        practiceCode: `// document.querySelector("ul").addEventListener("click", (e) => {
//   if (e.target.tagName === "LI") {
//      console.log("List item clicked");
//   }
// });`
      },
      {
        id: 'm6-traversal',
        title: '11. DOM Traversal',
        description: 'Moving around the tree.',
        promptContext: '`parentElement`, `children`, `nextElementSibling`, `closest()`.',
        practiceCode: `// const parent = child.parentElement;
// const next = item.nextElementSibling;

// const card = btn.closest(".card"); // Finds specific parent up the tree`
      },
      {
        id: 'm6-forms',
        title: '12. Form Handling',
        description: 'Inputs and values.',
        promptContext: 'Accessing input values (`input.value`). The `submit` event vs `click` event.',
        practiceCode: `// form.addEventListener("submit", (e) => {
//   e.preventDefault();
//   const val = input.value;
//   console.log(val);
// });`
      }
    ]
  },
  {
    id: 'module-7-oop',
    title: 'Module 7: Object Oriented JS',
    topics: [
      {
        id: 'm7-prototypes',
        title: '1. Prototypes',
        description: 'The chain of inheritance.',
        promptContext: 'JS is prototype-based. `__proto__`, `Object.getPrototypeOf`.',
        practiceCode: `const bird = { fly: true };
const eagle = Object.create(bird);

console.log(eagle.fly); // true (inherited)`
      },
      {
        id: 'm7-constructor',
        title: '2. Constructor Functions',
        description: 'The old way of classes.',
        promptContext: 'Using `function User() {}` and `new` keyword. Adding methods to `.prototype`.',
        practiceCode: `function User(name) {
  this.name = name;
}

User.prototype.sayHi = function() {
  console.log("Hi " + this.name);
};

const u = new User("Sam");
u.sayHi();`
      },
      {
        id: 'm7-classes',
        title: '3. ES6 Classes',
        description: 'Syntactic sugar for prototypes.',
        promptContext: '`class`, `constructor`. Cleaner syntax.',
        practiceCode: `class User {
  constructor(name) {
    this.name = name;
  }
  
  sayHi() {
    console.log("Hi " + this.name);
  }
}
new User("Bob").sayHi();`
      },
      {
        id: 'm7-inheritance',
        title: '4. Inheritance',
        description: 'Extending classes.',
        promptContext: '`class Dog extends Animal`. Inheriting methods.',
        practiceCode: `class Animal {
  speak() { console.log("Noise"); }
}

class Dog extends Animal {
  speak() { console.log("Bark"); }
}

new Dog().speak();`
      },
      {
        id: 'm7-super',
        title: '5. The Super Keyword',
        description: 'Calling parent methods.',
        promptContext: 'Using `super()` in constructor and `super.method()`.',
        practiceCode: `class Cat extends Animal {
  constructor(name) {
    super(); // Must call first
    this.name = name;
  }
}`
      },
      {
        id: 'm7-static',
        title: '6. Static Methods',
        description: 'Methods on the class itself.',
        promptContext: '`static` keyword. Helper functions that don\'t need an instance.',
        practiceCode: `class MathUtil {
  static add(a, b) { return a + b; }
}

console.log(MathUtil.add(1, 1));
// const m = new MathUtil(); m.add() // Error`
      },
      {
        id: 'm7-get-set',
        title: '7. Getters & Setters',
        description: 'Computed properties.',
        promptContext: '`get prop()`, `set prop(val)`. Controlling access.',
        practiceCode: `class Circle {
  constructor(radius) { this.r = radius; }
  
  get area() { return 3.14 * this.r ** 2; }
  
  set radius(val) {
    if (val < 0) throw new Error("Negative radius");
    this.r = val;
  }
}`
      },
      {
        id: 'm7-private',
        title: '8. Private Fields',
        description: 'True privacy with #.',
        promptContext: 'ES2022 Private fields `#var`. Cannot be accessed outside class.',
        practiceCode: `class Bank {
  #balance = 0;
  
  deposit(amount) { this.#balance += amount; }
  getBalance() { return this.#balance; }
}

const b = new Bank();
// console.log(b.#balance); // Syntax Error`
      },
      {
        id: 'm7-this-global',
        title: '9. This: Global & Function',
        description: 'The confusing "this".',
        promptContext: '`this` in global scope (window) vs regular function (window/undefined in strict).',
        practiceCode: `function show() {
  console.log(this); 
}
show(); // Window or undefined`
      },
      {
        id: 'm7-this-obj',
        title: '10. This: Object Method',
        description: 'Context is the object.',
        promptContext: 'When called as `obj.method()`, `this` is `obj`.',
        practiceCode: `const obj = {
  id: 1,
  print() { console.log(this.id); }
};
obj.print(); // 1`
      },
      {
        id: 'm7-call-apply-bind',
        title: '11. Call, Apply, Bind',
        description: 'Manual context binding.',
        promptContext: '`call(obj, arg)`, `apply(obj, [args])`, `bind(obj)` returns new function.',
        practiceCode: `function greet() { console.log(this.name); }

const p1 = { name: "A" };
const p2 = { name: "B" };

greet.call(p1); // A
const greetB = greet.bind(p2);
greetB(); // B`
      },
      {
        id: 'm7-polymorphism',
        title: '12. Polymorphism',
        description: 'Overriding behavior.',
        promptContext: 'Same method name, different behavior in children classes.',
        practiceCode: `class Shape { draw() {} }
class Circle extends Shape { draw() { console.log("O"); } }
class Square extends Shape { draw() { console.log("[]"); } }

const shapes = [new Circle(), new Square()];
shapes.forEach(s => s.draw());`
      }
    ]
  },
  {
    id: 'module-8-async',
    title: 'Module 8: Asynchronous JS',
    topics: [
      {
        id: 'm8-sync-vs-async',
        title: '1. Sync vs Async',
        description: 'Blocking vs Non-blocking.',
        promptContext: 'Explain how JS is single-threaded. Sync code blocks. Async code (timers, network) waits in queue.',
        practiceCode: `console.log("Start");
setTimeout(() => console.log("Timeout"), 0);
console.log("End");

// Output: Start -> End -> Timeout`
      },
      {
        id: 'm8-callbacks-hell',
        title: '2. Callback Hell',
        description: 'The pyramid of doom.',
        promptContext: 'Why we needed Promises. Nested callbacks make code unreadable.',
        practiceCode: `// The old way
// getData(function(a) {
//   getMore(a, function(b) {
//     getFinal(b, function(c) {
//       console.log(c);
//     });
//   });
// });`
      },
      {
        id: 'm8-promises',
        title: '3. Promises Basics',
        description: 'Resolve and Reject.',
        promptContext: '`new Promise((resolve, reject) => ...)`. States: Pending, Fulfilled, Rejected.',
        practiceCode: `const p = new Promise((resolve, reject) => {
  const success = true;
  if (success) resolve("Done!");
  else reject("Error");
});

p.then(res => console.log(res));`
      },
      {
        id: 'm8-chaining',
        title: '4. Promise Chaining',
        description: '.then() chains.',
        promptContext: 'Returning a value/promise in `.then` passes it to the next `.then`.',
        practiceCode: `Promise.resolve(10)
  .then(num => num * 2)
  .then(num => console.log(num)); // 20`
      },
      {
        id: 'm8-async-await',
        title: '5. Async / Await',
        description: 'Synchronous-looking Async.',
        promptContext: '`async` function returns promise. `await` pauses execution until resolved.',
        practiceCode: `async function run() {
  const val = await Promise.resolve("Hello");
  console.log(val);
}
run();`
      },
      {
        id: 'm8-async-error',
        title: '6. Async Error Handling',
        description: 'Try / Catch in Async.',
        promptContext: 'Using standard try/catch blocks for await calls.',
        practiceCode: `async function risky() {
  try {
    await Promise.reject("Boom");
  } catch (err) {
    console.log("Caught:", err);
  }
}
risky();`
      },
      {
        id: 'm8-promise-all',
        title: '7. Promise.all',
        description: 'Parallel execution.',
        promptContext: 'Running multiple promises at once. Fails if ONE fails.',
        practiceCode: `const p1 = Promise.resolve("A");
const p2 = Promise.resolve("B");

Promise.all([p1, p2]).then(res => console.log(res));
// ["A", "B"]`
      },
      {
        id: 'm8-promise-methods',
        title: '8. AllSettled, Race, Any',
        description: 'Advanced combinators.',
        promptContext: '`allSettled` (wait for all regardless of result), `race` (first one wins), `any` (first success).',
        practiceCode: `// race: first to settle wins
Promise.race([
  new Promise(r => setTimeout(r, 100, "Slow")),
  new Promise(r => setTimeout(r, 10, "Fast"))
]).then(console.log); // "Fast"`
      },
      {
        id: 'm8-event-loop',
        title: '9. The Event Loop',
        description: 'Call Stack & Callback Queue.',
        promptContext: 'Deep concept: Call Stack, Web APIs, Task Queue (Callbacks), Microtask Queue (Promises). Why Promises run before timeouts.',
        practiceCode: `console.log(1);
setTimeout(() => console.log(2), 0); // Task
Promise.resolve().then(() => console.log(3)); // Microtask
console.log(4);

// Order: 1, 4, 3, 2`
      },
      {
        id: 'm8-fetch',
        title: '10. Fetch API',
        description: 'Network Requests.',
        promptContext: 'Modern AJAX. `fetch(url)`. Returns a promise. Handling JSON response.',
        practiceCode: `// fetch('https://api.example.com')
//   .then(res => res.json())
//   .then(data => console.log(data));`
      },
      {
        id: 'm8-modules',
        title: '11. ES Modules',
        description: 'Import / Export.',
        promptContext: 'Splitting code into files. `export const`, `export default`, `import ... from`.',
        practiceCode: `// import { useState } from 'react';
// export const add = (a, b) => a + b;

console.log("Modules help organize large apps.");`
      },
      {
        id: 'm8-storage',
        title: '12. LocalStorage',
        description: 'Persisting data.',
        promptContext: '`localStorage.setItem`, `getItem`. Stores strings only.',
        practiceCode: `localStorage.setItem("user", "Alice");
console.log(localStorage.getItem("user"));

// Objects must be stringified
localStorage.setItem("settings", JSON.stringify({ dark: true }));`
      }
    ]
  }
];

export const INITIAL_SYSTEM_INSTRUCTION = `
You are "JS Sensei", an elite JavaScript mentor. 
Your goal is to take the user from a beginner to an advanced developer using a "Code First" approach.

Guidance Rules:
1. **Deep Explanations**: Don't just say "what", explain "why" and "how". Use analogies.
2. **Modern Syntax**: Always prefer ES6+ syntax (const, let, arrow functions, destructuring) unless teaching legacy concepts specifically (like var or hoisting).
3. **Interactive**: Ask the user to predict outputs or spot bugs in small snippets.
4. **Formatting**: Use bold for terms, markdown for code. 
5. **Context**: Stick strictly to the selected topic but feel free to reference previous topics to reinforce learning.
`;