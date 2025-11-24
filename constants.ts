import { CurriculumModule } from './types';

export const CURRICULUM: CurriculumModule[] = [
  {
    id: 'module-1-foundations',
    title: 'Module 1: Foundations',
    subModules: [
      {
        title: 'Introduction & Environment',
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
console.log("Line 2 executes");`
          },
          {
            id: 'm1-setup',
            title: '3. Environment Setup',
            description: 'Node.js vs Browser console.',
            promptContext: 'Explain the difference between running JS in a Browser (Window object, DOM) vs Node.js (Process object, no DOM).',
            practiceCode: `// In a browser, you have 'window'.
// In Node.js, you have 'global'.

console.log("Where am I running?");`
          },
          {
            id: 'm1-strict',
            title: '4. Strict Mode',
            description: '"use strict" and cleaner code.',
            promptContext: 'Explain `"use strict"`. How it prevents using undeclared variables and reserved keywords.',
            practiceCode: `"use strict";
// x = 5; // Error!
let x = 5; // OK`
          }
        ]
      },
      {
        title: 'Data Basics',
        topics: [
          {
            id: 'm1-variables',
            title: '5. Variables (var, let, const)',
            description: 'Storage containers for data.',
            promptContext: 'Deep dive into `var`, `let`, and `const`. Explain why we avoid `var` (function scope, hoisting issues) and prefer `const` by default, `let` when reassignment is needed.',
            practiceCode: `const birthYear = 1995;
// birthYear = 2000; // Error!

let age = 25;
age = 26; // OK.

var oldWay = "Avoid me";`
          },
          {
            id: 'm1-naming',
            title: '6. Naming Conventions',
            description: 'camelCase and reserved words.',
            promptContext: 'Explain standard naming conventions: camelCase for variables/functions, PascalCase for Classes, UPPER_SNAKE_CASE for constants. Mention reserved keywords.',
            practiceCode: `const firstName = "John";
const isActive = true;
const MAX_COUNT = 100;`
          },
          {
            id: 'm1-typeof',
            title: '7. The typeof Operator',
            description: 'Checking data types dynamically.',
            promptContext: 'Teach the `typeof` operator to inspect value types at runtime.',
            practiceCode: `console.log(typeof "Hello");
console.log(typeof 123);
console.log(typeof true);`
          }
        ]
      },
      {
        title: 'Primitive Types',
        topics: [
          {
            id: 'm1-primitives-string',
            title: '8. Primitives: Strings',
            description: 'Text, quotes, and concatenation.',
            promptContext: 'Explain the String data type. Single quotes vs Double quotes. Basic concatenation with `+`. Escaping characters.',
            practiceCode: `const greeting = "Hello " + "World";
const escaped = "He said \\"Hi\\"";
console.log(greeting);`
          },
          {
            id: 'm1-primitives-number',
            title: '9. Primitives: Numbers',
            description: 'Integers, Floats, and NaN.',
            promptContext: 'Explain the Number type. JS implies floats. Mention `NaN` (Not a Number), Infinity, and basic math operations.',
            practiceCode: `const val = 10 / "Apple"; // NaN
const inf = 1 / 0;        // Infinity
console.log(val, inf);`
          },
          {
            id: 'm1-boolean',
            title: '10. Primitives: Boolean',
            description: 'True, False, and toggle logic.',
            promptContext: 'Explain Boolean logic. strictly `true` or `false`. Explain how comparisons result in booleans.',
            practiceCode: `const isReady = true;
const isGreater = 10 > 5;
console.log(isReady, isGreater);`
          },
          {
            id: 'm1-null-undefined',
            title: '11. Null vs Undefined',
            description: 'The absence of value.',
            promptContext: 'Explain the crucial difference. `undefined` (variable declared but not assigned) vs `null` (intentional absence of value).',
            practiceCode: `let x;
console.log(x); // undefined

let y = null;
console.log(y); // null`
          },
          {
            id: 'm1-symbols-bigint',
            title: '12. Symbols & BigInt',
            description: 'Advanced primitives.',
            promptContext: 'Briefly explain `BigInt` for large integers (n suffix) and `Symbol` for unique identifiers.',
            practiceCode: `const big = 9007199254740991n;
const sym = Symbol("id");
console.log(typeof big);`
          }
        ]
      }
    ]
  },
  {
    id: 'module-2-operators',
    title: 'Module 2: Operators & Logic',
    subModules: [
      {
        title: 'Operators',
        topics: [
          {
            id: 'm2-arithmetic',
            title: '1. Arithmetic Operators',
            description: 'Math, Modulo, and Exponentiation.',
            promptContext: 'Cover +, -, *, /, %. Explain the Modulo operator (%) for remainders and Exponentiation (**).',
            practiceCode: `console.log(10 % 3); // 1
console.log(2 ** 3); // 8`
          },
          {
            id: 'm2-assignment',
            title: '2. Assignment Operators',
            description: '=, +=, -=, and friends.',
            promptContext: 'Explain assignment (=) vs modification assignment (+=, -=, *=).',
            practiceCode: `let x = 10;
x += 5; // 15
x *= 2; // 30`
          },
          {
            id: 'm2-comparison',
            title: '3. Comparison Operators',
            description: '== vs === and inequalities.',
            promptContext: 'Explain Loose equality (==) vs Strict equality (===). Always use Strict. >, <, >=, <=.',
            practiceCode: `console.log(5 == "5");  // true
console.log(5 === "5"); // false`
          },
          {
            id: 'm2-logical',
            title: '4. Logical Operators',
            description: 'AND, OR, NOT (&&, ||, !).',
            promptContext: 'Explain Boolean logic gates. && (both true), || (one true), ! (flip).',
            practiceCode: `const a = true, b = false;
console.log(a && b); // false
console.log(a || b); // true`
          },
          {
            id: 'm2-truthy-falsy',
            title: '5. Truthy vs Falsy',
            description: 'How JS evaluates non-booleans.',
            promptContext: 'List the falsy values: false, 0, "", null, undefined, NaN. Everything else is Truthy.',
            practiceCode: `if ("") console.log("Truthy");
else console.log("Falsy"); // Runs`
          }
        ]
      },
      {
        title: 'Control Flow',
        topics: [
          {
            id: 'm2-if-else',
            title: '6. If, Else If, Else',
            description: 'Branching logic flow.',
            promptContext: 'Standard conditional branching syntax.',
            practiceCode: `const x = 10;
if (x > 5) console.log("Big");
else console.log("Small");`
          },
          {
            id: 'm2-ternary',
            title: '7. Ternary Operator',
            description: 'One-line if statements.',
            promptContext: 'Explain the conditional operator `condition ? trueVal : falseVal`.',
            practiceCode: `const age = 20;
const status = age >= 18 ? "Adult" : "Minor";`
          },
          {
            id: 'm2-switch',
            title: '8. Switch Statements',
            description: 'Handling many cases.',
            promptContext: 'Explain `switch`, `case`, `break`, and `default`.',
            practiceCode: `const fruit = "Apple";
switch(fruit) {
  case "Apple": console.log("Red"); break;
  default: console.log("Unknown");
}`
          }
        ]
      },
      {
        title: 'Loops & Errors',
        topics: [
          {
            id: 'm2-while',
            title: '9. While & Do-While',
            description: 'Looping until a condition is met.',
            promptContext: 'Explain `while` loops. Mention infinite loop dangers. Briefly `do...while` (runs once).',
            practiceCode: `let i = 0;
while(i < 3) {
  console.log(i++);
}`
          },
          {
            id: 'm2-for',
            title: '10. The For Loop',
            description: 'The classic iterator.',
            promptContext: 'Explain `for (init; condition; step)`. The most common loop structure.',
            practiceCode: `for (let i = 0; i < 5; i++) {
  console.log(i);
}`
          },
          {
            id: 'm2-break-continue',
            title: '11. Break & Continue',
            description: 'Controlling loop execution.',
            promptContext: 'Explain `break` (exit loop) and `continue` (skip current iteration).',
            practiceCode: `for (let i = 0; i < 5; i++) {
  if (i === 2) continue;
  if (i === 4) break;
  console.log(i);
}`
          },
          {
            id: 'm2-errors',
            title: '12. Basic Error Handling',
            description: 'Try, Catch, Finally.',
            promptContext: 'Introduction to `try { ... } catch (e) { ... }`. Handling runtime crashes gracefully.',
            practiceCode: `try {
  throw new Error("Oops");
} catch(e) {
  console.log(e.message);
}`
          }
        ]
      }
    ]
  },
  {
    id: 'module-3-functions',
    title: 'Module 3: Functions & Scope',
    subModules: [
      {
        title: 'Function Basics',
        topics: [
          {
            id: 'm3-declaration',
            title: '1. Declarations vs Expressions',
            description: 'Ways to define functions.',
            promptContext: 'Explain Function Declarations (hoisted) vs Function Expressions (not hoisted).',
            practiceCode: `function add(a, b) { return a + b; }
const sub = function(a, b) { return a - b; };`
          },
          {
            id: 'm3-return',
            title: '2. Return Values',
            description: 'Getting data out of functions.',
            promptContext: 'Explain `return`. Functions return `undefined` by default if no return statement is present.',
            practiceCode: `function getNum() { return 42; }
console.log(getNum());`
          },
          {
            id: 'm3-params',
            title: '3. Parameters vs Arguments',
            description: 'Inputs for your functions.',
            promptContext: 'Explain Parameters (variables in definition) vs Arguments (values passed in call). Order matters.',
            practiceCode: `function greet(name) { console.log("Hi " + name); }
greet("Alice");`
          },
          {
            id: 'm3-defaults',
            title: '4. Default Parameters',
            description: 'Fallback values (ES6).',
            promptContext: 'Explain how to set default values `function(a = 0)`.',
            practiceCode: `function roll(sides = 6) {
  console.log(sides);
}
roll(); // 6`
          }
        ]
      },
      {
        title: 'Scope & Execution',
        topics: [
          {
            id: 'm3-scope',
            title: '5. Scope Chains',
            description: 'Global, Function, and Block Scope.',
            promptContext: 'Deep dive into where variables are accessible. Lexical scoping.',
            practiceCode: `const global = "A";
function test() {
  const local = "B";
  console.log(global, local);
}`
          },
          {
            id: 'm3-hoisting',
            title: '6. Hoisting',
            description: 'How JS lifts declarations.',
            promptContext: 'Explain Hoisting. Why function declarations can be called before definition.',
            practiceCode: `sayHi(); // Works
function sayHi() { console.log("Hi"); }`
          },
          {
            id: 'm3-iife',
            title: '7. IIFE',
            description: 'Immediately Invoked Function Expressions.',
            promptContext: 'Explain `(function(){})()`. Used for isolation before modules existed.',
            practiceCode: `(function() {
  console.log("Runs instantly");
})();`
          }
        ]
      },
      {
        title: 'Modern & Advanced',
        topics: [
          {
            id: 'm3-arrow-basic',
            title: '8. Arrow Functions',
            description: 'Concise ES6 Syntax.',
            promptContext: 'Introduction to `() => {}`. Implicit returns for one-liners.',
            practiceCode: `const add = (a, b) => a + b;
console.log(add(2, 3));`
          },
          {
            id: 'm3-arrow-this',
            title: '9. Arrow Functions & "this"',
            description: 'Lexical `this` binding.',
            promptContext: 'Advanced: Explain that Arrow functions do NOT have their own `this`.',
            practiceCode: `const obj = {
  val: 10,
  fn: () => console.log(this.val) // undefined
};`
          },
          {
            id: 'm3-callbacks',
            title: '10. Callback Functions',
            description: 'Passing functions as data.',
            promptContext: 'Explain Higher Order Functions. Passing a function into another function to be called later.',
            practiceCode: `function run(cb) { cb(); }
run(() => console.log("Callback!"));`
          },
          {
            id: 'm3-recursion',
            title: '11. Recursion',
            description: 'Functions calling themselves.',
            promptContext: 'Explain base cases and recursive steps. Example: Factorial or Countdown.',
            practiceCode: `function count(n) {
  if(n === 0) return;
  console.log(n);
  count(n - 1);
}`
          },
          {
            id: 'm3-closures',
            title: '12. Closures (Advanced)',
            description: 'Memory and Scope retention.',
            promptContext: 'Explain how a function "closes over" variables from its outer scope, remembering them even after the outer function finishes.',
            practiceCode: `function createCounter() {
  let count = 0;
  return () => ++count;
}
const c = createCounter();
console.log(c()); // 1`
          }
        ]
      }
    ]
  },
  {
    id: 'module-4-objects-arrays',
    title: 'Module 4: Arrays & Objects',
    subModules: [
      {
        title: 'Objects',
        topics: [
          {
            id: 'm4-objects',
            title: '1. Object Literals',
            description: 'Key-value pairs.',
            promptContext: 'Basics of objects `{}`. Keys (strings/symbols) and Values (any type).',
            practiceCode: `const car = { make: "Ford", year: 2020 };
console.log(car.make);`
          },
          {
            id: 'm4-access',
            title: '2. Dot vs Bracket Notation',
            description: 'Accessing properties.',
            promptContext: '`obj.prop` vs `obj["prop"]`. Use bracket notation for dynamic keys.',
            practiceCode: `const obj = { a: 1 };
const key = "a";
console.log(obj[key]);`
          },
          {
            id: 'm4-methods',
            title: '3. Object Methods',
            description: 'Functions inside objects.',
            promptContext: 'Defining methods using ES6 shorthand `method() {}`. Accessing internal data with `this`.',
            practiceCode: `const obj = {
  val: 1,
  inc() { this.val++; }
};`
          },
          {
            id: 'm4-destructure-obj',
            title: '4. Object Destructuring',
            description: 'Extracting properties easily.',
            promptContext: 'ES6 Destructuring `{ name } = user`. Renaming variables and default values.',
            practiceCode: `const obj = { x: 1, y: 2 };
const { x, y } = obj;`
          }
        ]
      },
      {
        title: 'Arrays',
        topics: [
          {
            id: 'm4-arrays',
            title: '5. Arrays Basics',
            description: 'Ordered lists of data.',
            promptContext: '`[]` syntax. 0-based indexing. `length` property.',
            practiceCode: `const arr = [1, 2, 3];
console.log(arr.length);`
          },
          {
            id: 'm4-array-basic-methods',
            title: '6. Push, Pop, Shift, Unshift',
            description: 'Adding and removing items.',
            promptContext: 'Explain standard queue/stack operations. Push/Pop (End), Shift/Unshift (Start).',
            practiceCode: `const arr = [1];
arr.push(2);
arr.unshift(0);
console.log(arr);`
          },
          {
            id: 'm4-search',
            title: '7. Searching Arrays',
            description: 'indexOf, includes, find.',
            promptContext: 'How to find items. Primitive search (indexOf/includes) vs Condition search (find).',
            practiceCode: `const arr = [10, 20, 30];
console.log(arr.find(n => n > 15));`
          },
          {
            id: 'm4-destructure-arr',
            title: '8. Array Destructuring',
            description: 'Unpacking lists.',
            promptContext: '`const [first, second] = arr`. Skipping items with commas.',
            practiceCode: `const arr = [10, 20];
const [first] = arr;`
          }
        ]
      },
      {
        title: 'Functional & Memory',
        topics: [
          {
            id: 'm4-map',
            title: '9. Transform: .map()',
            description: 'Create new arrays from old ones.',
            promptContext: 'Explain `.map()`. Crucial: it returns a *new* array, doesn`t mutate original.',
            practiceCode: `const nums = [1, 2, 3];
const doubled = nums.map(n => n * 2);`
          },
          {
            id: 'm4-filter',
            title: '10. Filter: .filter()',
            description: 'Selecting specific items.',
            promptContext: 'Explain `.filter()`. Returns new array with items that pass the test.',
            practiceCode: `const nums = [1, 2, 3, 4];
const evens = nums.filter(n => n % 2 === 0);`
          },
          {
            id: 'm4-reduce',
            title: '11. Accumulate: .reduce()',
            description: 'Boiling arrays down to one value.',
            promptContext: 'Deep dive into `.reduce((acc, curr) => {}, initial)`. The Swiss Army knife of arrays.',
            practiceCode: `const sum = [1, 2, 3].reduce((a, b) => a + b, 0);
console.log(sum);`
          },
          {
            id: 'm4-ref-vs-value',
            title: '12. Reference vs Value',
            description: 'How data is stored.',
            promptContext: 'Crucial concept: Primitives are by value (copy), Objects are by reference (address).',
            practiceCode: `const a = { val: 1 };
const b = a;
b.val = 2;
console.log(a.val); // 2!`
          }
        ]
      }
    ]
  },
  {
    id: 'module-5-modern-data',
    title: 'Module 5: Modern JS & Data',
    subModules: [
      {
        title: 'Built-in Objects',
        topics: [
          {
            id: 'm5-string-methods',
            title: '1. Advanced Strings',
            description: 'Template literals and methods.',
            promptContext: '`split`, `join`, `slice`, `trim`. Template literals `${}`.',
            practiceCode: `const str = "a,b,c";
console.log(str.split(","));`
          },
          {
            id: 'm5-math',
            title: '2. Math Object',
            description: 'Number crunching.',
            promptContext: '`Math.random()`, `Math.floor/ceil/round`, `Math.max/min`.',
            practiceCode: `console.log(Math.floor(3.9));
console.log(Math.max(1, 5, 2));`
          },
          {
            id: 'm5-date',
            title: '3. Date Object',
            description: 'Time is hard.',
            promptContext: '`new Date()`. Getting year, month, day. Timestamps (Date.now()).',
            practiceCode: `console.log(new Date().toISOString());`
          }
        ]
      },
      {
        title: 'Structures & Syntax',
        topics: [
          {
            id: 'm5-json',
            title: '4. JSON',
            description: 'JavaScript Object Notation.',
            promptContext: '`JSON.stringify()` and `JSON.parse()`. The standard for API data.',
            practiceCode: `const obj = { a: 1 };
const str = JSON.stringify(obj);
console.log(JSON.parse(str));`
          },
          {
            id: 'm5-map',
            title: '5. Map (Data Structure)',
            description: 'Better Key-Value pairs.',
            promptContext: '`Map` vs `Object`. Keys can be any type in Map. `.set`, `.get`, `.has`.',
            practiceCode: `const m = new Map();
m.set('key', 'val');
console.log(m.get('key'));`
          },
          {
            id: 'm5-set',
            title: '6. Set (Data Structure)',
            description: 'Unique values only.',
            promptContext: '`Set`. Removes duplicates automatically. `.add`, `.has`, `.delete`.',
            practiceCode: `const s = new Set([1, 1, 2]);
console.log(s.size); // 2`
          },
          {
            id: 'm5-spread',
            title: '7. Spread Operator',
            description: '...Expanding iterables.',
            promptContext: 'Using `...` to copy arrays/objects and merge them.',
            practiceCode: `const a = [1, 2];
const b = [...a, 3];`
          },
          {
            id: 'm5-rest',
            title: '8. Rest Parameter',
            description: '...Gathering arguments.',
            promptContext: 'Using `...args` in function definitions to accept infinite arguments.',
            practiceCode: `function sum(...nums) {
  return nums.reduce((a, b) => a + b, 0);
}`
          }
        ]
      },
      {
        title: 'Logic & Iteration',
        topics: [
          {
            id: 'm5-optional-chain',
            title: '9. Optional Chaining',
            description: 'Safe property access `?.`.',
            promptContext: 'Explain `user?.address?.street`. Prevents errors if intermediate property is null/undefined.',
            practiceCode: `const user = {};
console.log(user?.profile?.name); // undefined`
          },
          {
            id: 'm5-nullish',
            title: '10. Nullish Coalescing',
            description: 'The `??` operator.',
            promptContext: 'Difference between `||` (checks falsy) and `??` (checks only null/undefined).',
            practiceCode: `console.log(0 || 5); // 5
console.log(0 ?? 5); // 0`
          },
          {
            id: 'm5-for-of',
            title: '11. For...Of vs For...In',
            description: 'Modern iteration.',
            promptContext: '`for...of` (iterables: arrays, strings) vs `for...in` (object keys).',
            practiceCode: `const arr = ['a', 'b'];
for(const x of arr) console.log(x);`
          },
          {
            id: 'm5-generators',
            title: '12. Generators',
            description: 'Functions that pause.',
            promptContext: 'Brief intro to `function*` and `yield`.',
            practiceCode: `function* gen() { yield 1; yield 2; }
const g = gen();
console.log(g.next().value);`
          }
        ]
      }
    ]
  },
  {
    id: 'module-6-dom',
    title: 'Module 6: The DOM',
    subModules: [
      {
        title: 'Access & Manipulation',
        topics: [
          {
            id: 'm6-tree',
            title: '1. DOM Tree Structure',
            description: 'Document Object Model.',
            promptContext: 'Explain DOM as a tree of nodes. Window -> Document -> HTML -> Body.',
            practiceCode: `console.log(document.body);`
          },
          {
            id: 'm6-selectors',
            title: '2. Selecting Elements',
            description: 'querySelector & getElement.',
            promptContext: '`getElementById`, `querySelector` (single), `querySelectorAll` (NodeList).',
            practiceCode: `// const el = document.querySelector("#app");`
          },
          {
            id: 'm6-content',
            title: '3. Text vs HTML',
            description: 'textContent vs innerHTML.',
            promptContext: 'Difference between `textContent` (safe, text only) and `innerHTML` (parses HTML, XSS risk).',
            practiceCode: `// el.textContent = "Hello";`
          },
          {
            id: 'm6-style',
            title: '4. Manipulating Styles',
            description: 'Changing CSS via JS.',
            promptContext: '`element.style.property`. CamelCase usage (backgroundColor).',
            practiceCode: `// el.style.color = "red";`
          },
          {
            id: 'm6-classes',
            title: '5. ClassList API',
            description: 'Adding/Removing classes.',
            promptContext: '`classList.add`, `.remove`, `.toggle`, `.contains`. Cleaner than string manipulation.',
            practiceCode: `// el.classList.add("active");`
          },
          {
            id: 'm6-create',
            title: '6. Creating Elements',
            description: 'createElement & append.',
            promptContext: '`document.createElement`, `appendChild`, `prepend`.',
            practiceCode: `const div = document.createElement("div");
// document.body.append(div);`
          }
        ]
      },
      {
        title: 'Events & Traversal',
        topics: [
          {
            id: 'm6-events',
            title: '7. Event Listeners',
            description: 'Reacting to user input.',
            promptContext: '`addEventListener("click", fn)`. Importance of not using `onclick` property.',
            practiceCode: `// btn.addEventListener("click", () => {});`
          },
          {
            id: 'm6-event-obj',
            title: '8. The Event Object',
            description: 'e.target, e.preventDefault.',
            promptContext: 'The `event` argument. `target` (what was clicked), `type`. `preventDefault()` for forms.',
            practiceCode: `// btn.onclick = (e) => console.log(e.target);`
          },
          {
            id: 'm6-bubble',
            title: '9. Bubbling vs Capturing',
            description: 'Event propagation flow.',
            promptContext: 'Explain that events bubble up from child to parent. `stopPropagation()`.',
            practiceCode: `// e.stopPropagation();`
          },
          {
            id: 'm6-delegation',
            title: '10. Event Delegation',
            description: 'Efficient event handling.',
            promptContext: 'Adding one listener to a parent (`ul`) to handle clicks on children (`li`) using `e.target`.',
            practiceCode: `// ul.onclick = (e) => if(e.target.matches("li")) ...`
          },
          {
            id: 'm6-traversal',
            title: '11. DOM Traversal',
            description: 'Moving around the tree.',
            promptContext: '`parentElement`, `children`, `nextElementSibling`, `closest()`.',
            practiceCode: `// const parent = el.parentElement;`
          },
          {
            id: 'm6-forms',
            title: '12. Form Handling',
            description: 'Inputs and values.',
            promptContext: 'Accessing input values (`input.value`). The `submit` event vs `click` event.',
            practiceCode: `// input.value`
          }
        ]
      }
    ]
  },
  {
    id: 'module-7-oop',
    title: 'Module 7: Object Oriented JS',
    subModules: [
      {
        title: 'Prototypes & Classes',
        topics: [
          {
            id: 'm7-prototypes',
            title: '1. Prototypes',
            description: 'The chain of inheritance.',
            promptContext: 'JS is prototype-based. `__proto__`, `Object.getPrototypeOf`.',
            practiceCode: `const proto = { hello: true };
const obj = Object.create(proto);
console.log(obj.hello);`
          },
          {
            id: 'm7-constructor',
            title: '2. Constructor Functions',
            description: 'The old way of classes.',
            promptContext: 'Using `function User() {}` and `new` keyword. Adding methods to `.prototype`.',
            practiceCode: `function User(name) { this.name = name; }
const u = new User("Sam");`
          },
          {
            id: 'm7-classes',
            title: '3. ES6 Classes',
            description: 'Syntactic sugar for prototypes.',
            promptContext: '`class`, `constructor`. Cleaner syntax.',
            practiceCode: `class Box {
  constructor(w) { this.w = w; }
}`
          },
          {
            id: 'm7-inheritance',
            title: '4. Inheritance',
            description: 'Extending classes.',
            promptContext: '`class Dog extends Animal`. Inheriting methods.',
            practiceCode: `class A {}; class B extends A {};`
          },
          {
            id: 'm7-super',
            title: '5. The Super Keyword',
            description: 'Calling parent methods.',
            promptContext: 'Using `super()` in constructor and `super.method()`.',
            practiceCode: `class B extends A {
  constructor() { super(); }
}`
          }
        ]
      },
      {
        title: 'Class Features',
        topics: [
          {
            id: 'm7-static',
            title: '6. Static Methods',
            description: 'Methods on the class itself.',
            promptContext: '`static` keyword. Helper functions that don\'t need an instance.',
            practiceCode: `class MathUtils {
  static add(a, b) { return a + b; }
}`
          },
          {
            id: 'm7-get-set',
            title: '7. Getters & Setters',
            description: 'Computed properties.',
            promptContext: '`get prop()`, `set prop(val)`. Controlling access.',
            practiceCode: `class User {
  get name() { return "User"; }
}`
          },
          {
            id: 'm7-private',
            title: '8. Private Fields',
            description: 'True privacy with #.',
            promptContext: 'ES2022 Private fields `#var`. Cannot be accessed outside class.',
            practiceCode: `class Safe {
  #code = 1234;
}`
          }
        ]
      },
      {
        title: 'Context & This',
        topics: [
          {
            id: 'm7-this-global',
            title: '9. This: Global & Function',
            description: 'The confusing "this".',
            promptContext: '`this` in global scope (window) vs regular function (window/undefined in strict).',
            practiceCode: `console.log(this);`
          },
          {
            id: 'm7-this-obj',
            title: '10. This: Object Method',
            description: 'Context is the object.',
            promptContext: 'When called as `obj.method()`, `this` is `obj`.',
            practiceCode: `const obj = { fn() { console.log(this); } };`
          },
          {
            id: 'm7-call-apply-bind',
            title: '11. Call, Apply, Bind',
            description: 'Manual context binding.',
            promptContext: '`call(obj, arg)`, `apply(obj, [args])`, `bind(obj)` returns new function.',
            practiceCode: `function fn() { console.log(this.val); }
const obj = { val: 1 };
fn.call(obj);`
          },
          {
            id: 'm7-polymorphism',
            title: '12. Polymorphism',
            description: 'Overriding behavior.',
            promptContext: 'Same method name, different behavior in children classes.',
            practiceCode: `class Shape { draw() {} }
class Circle extends Shape { draw() {} }`
          }
        ]
      }
    ]
  },
  {
    id: 'module-8-async',
    title: 'Module 8: Asynchronous JS',
    subModules: [
      {
        title: 'Foundations of Async',
        topics: [
          {
            id: 'm8-sync-vs-async',
            title: '1. Sync vs Async',
            description: 'Blocking vs Non-blocking.',
            promptContext: 'Explain how JS is single-threaded. Sync code blocks. Async code (timers, network) waits in queue.',
            practiceCode: `setTimeout(() => console.log("Async"), 0);
console.log("Sync");`
          },
          {
            id: 'm8-callbacks-hell',
            title: '2. Callback Hell',
            description: 'The pyramid of doom.',
            promptContext: 'Why we needed Promises. Nested callbacks make code unreadable.',
            practiceCode: `// doA(() => doB(() => doC()));`
          },
          {
            id: 'm8-event-loop',
            title: '3. The Event Loop',
            description: 'Call Stack & Callback Queue.',
            promptContext: 'Deep concept: Call Stack, Web APIs, Task Queue (Callbacks), Microtask Queue (Promises).',
            practiceCode: `console.log(1);
Promise.resolve().then(() => console.log(2));
setTimeout(() => console.log(3));`
          }
        ]
      },
      {
        title: 'Promises & Async/Await',
        topics: [
          {
            id: 'm8-promises',
            title: '4. Promises Basics',
            description: 'Resolve and Reject.',
            promptContext: '`new Promise((resolve, reject) => ...)`. States: Pending, Fulfilled, Rejected.',
            practiceCode: `new Promise(r => r("Done")).then(console.log);`
          },
          {
            id: 'm8-chaining',
            title: '5. Promise Chaining',
            description: '.then() chains.',
            promptContext: 'Returning a value/promise in `.then` passes it to the next `.then`.',
            practiceCode: `p.then(() => 1).then(n => n * 2);`
          },
          {
            id: 'm8-async-await',
            title: '6. Async / Await',
            description: 'Synchronous-looking Async.',
            promptContext: '`async` function returns promise. `await` pauses execution until resolved.',
            practiceCode: `async function run() {
  const val = await Promise.resolve(1);
}`
          },
          {
            id: 'm8-async-error',
            title: '7. Async Error Handling',
            description: 'Try / Catch in Async.',
            promptContext: 'Using standard try/catch blocks for await calls.',
            practiceCode: `try { await fail(); } catch(e) {}`
          }
        ]
      },
      {
        title: 'Advanced Patterns',
        topics: [
          {
            id: 'm8-promise-all',
            title: '8. Promise.all',
            description: 'Parallel execution.',
            promptContext: 'Running multiple promises at once. Fails if ONE fails.',
            practiceCode: `Promise.all([p1, p2]).then(console.log);`
          },
          {
            id: 'm8-promise-methods',
            title: '9. AllSettled, Race, Any',
            description: 'Advanced combinators.',
            promptContext: '`allSettled` (wait for all regardless of result), `race` (first one wins), `any` (first success).',
            practiceCode: `Promise.race([slow, fast]);`
          },
          {
            id: 'm8-fetch',
            title: '10. Fetch API',
            description: 'Network Requests.',
            promptContext: 'Modern AJAX. `fetch(url)`. Returns a promise. Handling JSON response.',
            practiceCode: `fetch('api').then(r => r.json());`
          },
          {
            id: 'm8-modules',
            title: '11. ES Modules',
            description: 'Import / Export.',
            promptContext: 'Splitting code into files. `export const`, `export default`, `import ... from`.',
            practiceCode: `import { x } from './file.js';`
          },
          {
            id: 'm8-storage',
            title: '12. LocalStorage',
            description: 'Persisting data.',
            promptContext: '`localStorage.setItem`, `getItem`. Stores strings only.',
            practiceCode: `localStorage.setItem("user", "me");`
          }
        ]
      }
    ]
  },
  {
    id: 'module-9-error-handling',
    title: 'Module 9: Error Handling',
    subModules: [
      {
        title: 'Errors & Debugging',
        topics: [
          {
            id: 'm9-types',
            title: '1. Error Types',
            description: 'Syntax, Reference, Type Errors.',
            promptContext: 'Explain the difference between SyntaxError, ReferenceError, TypeError, and RangeError.',
            practiceCode: `// console.log(undeclaredVar); // ReferenceError`
          },
          {
            id: 'm9-throw',
            title: '2. Throwing Errors',
            description: 'Custom exceptions.',
            promptContext: 'Using the `throw` keyword to stop execution manually.',
            practiceCode: `function check(age) {
  if (age < 0) throw new Error("Invalid age");
}`
          },
          {
            id: 'm9-custom-errors',
            title: '3. Custom Error Classes',
            description: 'Extending Error.',
            promptContext: 'Creating custom error types by extending the built-in Error class.',
            practiceCode: `class DatabaseError extends Error {
  constructor(msg) { super(msg); this.name = "DatabaseError"; }
}`
          },
          {
            id: 'm9-stack-trace',
            title: '4. The Stack Trace',
            description: 'Debugging crash paths.',
            promptContext: 'Understanding the call stack information in an error log.',
            practiceCode: `try {
  throw new Error("Boom");
} catch(e) {
  console.log(e.stack);
}`
          },
          {
            id: 'm9-debugging',
            title: '5. Console Debugging',
            description: 'Beyond console.log.',
            promptContext: 'console.table, console.dir, console.time, console.group.',
            practiceCode: `console.table([{id:1}, {id:2}]);
console.time("loop");
// ...
console.timeEnd("loop");`
          },
          {
            id: 'm9-debugger',
            title: '6. The Debugger Keyword',
            description: 'Pausing execution.',
            promptContext: 'Using the `debugger;` statement to trigger browser developer tools breakpoints.',
            practiceCode: `function calc() {
  debugger; // Pauses here if DevTools is open
  return 1 + 1;
}`
          }
        ]
      }
    ]
  },
  {
    id: 'module-10-regex',
    title: 'Module 10: Regular Expressions',
    subModules: [
      {
        title: 'Basic Patterns',
        topics: [
          {
            id: 'm10-basics',
            title: '1. Regex Basics',
            description: 'Patterns in slashes.',
            promptContext: 'Introduction to regex syntax `/pattern/` and simple matching.',
            practiceCode: `const regex = /hello/;
console.log(regex.test("hello world"));`
          },
          {
            id: 'm10-flags',
            title: '2. Flags (g, i, m)',
            description: 'Global, Case-insensitive.',
            promptContext: 'Explain modifiers: g (global), i (ignore case), m (multiline).',
            practiceCode: `const regex = /hello/i; // Case insensitive
console.log(regex.test("HELLO"));`
          },
          {
            id: 'm10-classes',
            title: '3. Character Classes',
            description: 'Digits, Words, Whitespace.',
            promptContext: '\\d, \\w, \\s, and their negations \\D, \\W, \\S. The dot operator.',
            practiceCode: `console.log(/\\d/.test("Year 2023")); // true`
          },
          {
            id: 'm10-quantifiers',
            title: '4. Quantifiers',
            description: '+, *, ?, {n}.',
            promptContext: 'Matching counts: + (1 or more), * (0 or more), ? (0 or 1).',
            practiceCode: `console.log(/go+d/.test("good")); // true`
          }
        ]
      },
      {
        title: 'Advanced Regex',
        topics: [
          {
            id: 'm10-anchors',
            title: '5. Anchors',
            description: 'Start ^ and End $.',
            promptContext: 'Matching the start or end of a string explicitly.',
            practiceCode: `console.log(/^Start/.test("Start me up"));`
          },
          {
            id: 'm10-groups',
            title: '6. Capture Groups',
            description: 'Extracting parts ( ).',
            promptContext: 'Using parentheses to group and extract matches.',
            practiceCode: `const match = "ID: 123".match(/ID: (\\d+)/);
console.log(match[1]); // 123`
          },
          {
            id: 'm10-methods',
            title: '7. String Regex Methods',
            description: 'match, replace, split.',
            promptContext: 'Using regex with string methods like .replace().',
            practiceCode: `console.log("a-b-c".replace(/-/g, ":"));`
          },
          {
            id: 'm10-validation',
            title: '8. Common Patterns',
            description: 'Email validation logic.',
            promptContext: 'Walk through a basic email or phone number validation regex.',
            practiceCode: `const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;`
          }
        ]
      }
    ]
  },
  {
    id: 'module-11-bom',
    title: 'Module 11: The BOM',
    subModules: [
      {
        title: 'Browser APIs',
        topics: [
          {
            id: 'm11-window',
            title: '1. The Window Object',
            description: 'The global browser scope.',
            promptContext: 'Explain the Window interface. It represents the browser tab.',
            practiceCode: `console.log(window.innerWidth);`
          },
          {
            id: 'm11-location',
            title: '2. Location API',
            description: 'URL manipulation.',
            promptContext: 'window.location. href, search params, reloading.',
            practiceCode: `console.log(location.href);
// location.reload();`
          },
          {
            id: 'm11-navigator',
            title: '3. Navigator & User Agent',
            description: 'Device information.',
            promptContext: 'Detecting browser, OS, and hardware info.',
            practiceCode: `console.log(navigator.userAgent);`
          },
          {
            id: 'm11-history',
            title: '4. History API',
            description: 'Back, Forward, PushState.',
            promptContext: 'Manipulating session history without reloading.',
            practiceCode: `// history.back();
history.pushState({page: 1}, "", "?page=1");`
          },
          {
            id: 'm11-screen',
            title: '5. Screen Object',
            description: 'Display properties.',
            promptContext: 'Screen width, height, color depth.',
            practiceCode: `console.log(screen.width, screen.height);`
          },
          {
            id: 'm11-popups',
            title: '6. Alerts & Prompts',
            description: 'User interaction dialogs.',
            promptContext: 'alert(), confirm(), prompt(). Blocking nature.',
            practiceCode: `if(confirm("Proceed?")) console.log("Yes");`
          },
          {
            id: 'm11-timers',
            title: '7. Advanced Timers',
            description: 'Intervals vs Timeouts.',
            promptContext: 'Recap setTimeout/setInterval and clearing them.',
            practiceCode: `const id = setInterval(() => console.log("Tick"), 1000);
clearInterval(id);`
          }
        ]
      }
    ]
  },
  {
    id: 'module-12-storage',
    title: 'Module 12: Browser Storage',
    subModules: [
      {
        title: 'Client Data',
        topics: [
          {
            id: 'm12-cookies',
            title: '1. Cookies Basics',
            description: 'Old school storage.',
            promptContext: 'document.cookie syntax. Expiry, Path.',
            practiceCode: `document.cookie = "username=John; max-age=3600";`
          },
          {
            id: 'm12-session',
            title: '2. Session Storage',
            description: 'Tab-specific data.',
            promptContext: 'Difference between LocalStorage (Persistent) and SessionStorage (Tab life).',
            practiceCode: `sessionStorage.setItem("temp", "123");`
          },
          {
            id: 'm12-indexeddb',
            title: '3. IndexedDB Intro',
            description: 'Client-side Database.',
            promptContext: 'High-level concept of IndexedDB for large structured data. Async API.',
            practiceCode: `// indexedDB.open("MyDatabase", 1);`
          },
          {
            id: 'm12-storage-events',
            title: '4. Storage Events',
            description: 'Syncing across tabs.',
            promptContext: 'Listening to `storage` events when other tabs update localStorage.',
            practiceCode: `window.addEventListener("storage", e => console.log(e.key));`
          },
          {
            id: 'm12-quotas',
            title: '5. Storage Quotas',
            description: 'Limits of the browser.',
            promptContext: 'How much data can you store? Handling QuotaExceededError.',
            practiceCode: `// Usually ~5MB for LocalStorage`
          }
        ]
      }
    ]
  },
  {
    id: 'module-13-modules-tooling',
    title: 'Module 13: Modules & Tooling',
    subModules: [
      {
        title: 'Ecosystem',
        topics: [
          {
            id: 'm13-commonjs',
            title: '1. CommonJS (Node)',
            description: 'require() and module.exports.',
            promptContext: 'The legacy Node.js module system vs ES Modules.',
            practiceCode: `// const fs = require('fs'); // Node only`
          },
          {
            id: 'm13-esm-advanced',
            title: '2. Advanced ES Modules',
            description: 'Dynamic imports.',
            promptContext: 'Using `import()` function for code splitting / lazy loading.',
            practiceCode: `import('./module.js').then(m => m.run());`
          },
          {
            id: 'm13-npm',
            title: '3. NPM & Package.json',
            description: 'Node Package Manager.',
            promptContext: 'Concept of dependencies, scripts, and package.json.',
            practiceCode: `// "scripts": { "start": "node index.js" }`
          },
          {
            id: 'm13-bundling',
            title: '4. Bundling Concepts',
            description: 'Webpack / Vite.',
            promptContext: 'Why we bundle? Minification, tree-shaking, transpiling.',
            practiceCode: `// Concept only: Merging 100 files into 1`
          }
        ]
      }
    ]
  },
  {
    id: 'module-14-functional',
    title: 'Module 14: Functional JS',
    subModules: [
      {
        title: 'Functional Concepts',
        topics: [
          {
            id: 'm14-pure',
            title: '1. Pure Functions',
            description: 'No side effects.',
            promptContext: 'Deterministic inputs -> outputs. No global state mutation.',
            practiceCode: `const add = (a, b) => a + b; // Pure`
          },
          {
            id: 'm14-immutability',
            title: '2. Immutability',
            description: 'Never change state.',
            promptContext: 'Using Spread / Map instead of Push / Splice.',
            practiceCode: `const nums = [1, 2];
const newNums = [...nums, 3]; // Immutable add`
          },
          {
            id: 'm14-currying',
            title: '3. Currying',
            description: 'f(a)(b)(c).',
            promptContext: 'Transforming a function with multiple args into nested functions.',
            practiceCode: `const sum = a => b => a + b;
console.log(sum(2)(3));`
          },
          {
            id: 'm14-composition',
            title: '4. Composition',
            description: 'Combining functions.',
            promptContext: 'Piping data through multiple functions f(g(x)).',
            practiceCode: `const double = x => x * 2;
const exclaim = x => x + "!";
console.log(exclaim(double(5)));`
          }
        ]
      }
    ]
  },
  {
    id: 'module-15-web-apis',
    title: 'Module 15: Web Observers',
    subModules: [
      {
        title: 'Observers & Device',
        topics: [
          {
            id: 'm15-intersection',
            title: '1. Intersection Observer',
            description: 'Scroll detection.',
            promptContext: 'Detecting when an element enters the viewport (Lazy loading).',
            practiceCode: `const observer = new IntersectionObserver(entries => {});`
          },
          {
            id: 'm15-resize',
            title: '2. Resize Observer',
            description: 'Element size changes.',
            promptContext: 'Reacting to element dimensions changing.',
            practiceCode: `const ro = new ResizeObserver(entries => {});`
          },
          {
            id: 'm15-mutation',
            title: '3. Mutation Observer',
            description: 'DOM changes.',
            promptContext: 'Watching for DOM tree modifications (attributes, children).',
            practiceCode: `const mo = new MutationObserver(mutations => {});`
          },
          {
            id: 'm15-geo',
            title: '4. Geolocation API',
            description: 'User Position.',
            promptContext: 'navigator.geolocation.getCurrentPosition.',
            practiceCode: `navigator.geolocation.getCurrentPosition(pos => console.log(pos));`
          }
        ]
      }
    ]
  },
  {
    id: 'module-16-networking',
    title: 'Module 16: Advanced Network',
    subModules: [
      {
        title: 'Network Protocols',
        topics: [
          {
            id: 'm16-rest',
            title: '1. HTTP Methods',
            description: 'GET, POST, PUT, DELETE.',
            promptContext: 'RESTful API concepts. Sending data with Fetch.',
            practiceCode: `fetch('/api', { method: 'POST', body: '{}' });`
          },
          {
            id: 'm16-cors',
            title: '2. CORS',
            description: 'Cross-Origin Resource Sharing.',
            promptContext: 'Why browsers block requests to different domains. Server headers.',
            practiceCode: `// Access-Control-Allow-Origin`
          },
          {
            id: 'm16-headers',
            title: '3. Request Headers',
            description: 'Auth and Content-Type.',
            promptContext: 'Setting headers like Authorization Bearer tokens.',
            practiceCode: `headers: { 'Content-Type': 'application/json' }`
          },
          {
            id: 'm16-sockets',
            title: '4. WebSockets',
            description: 'Real-time communication.',
            promptContext: 'ws:// protocol. Persistent connections.',
            practiceCode: `const ws = new WebSocket("ws://example.com");`
          }
        ]
      }
    ]
  },
  {
    id: 'module-17-patterns',
    title: 'Module 17: Design Patterns',
    subModules: [
      {
        title: 'Common Patterns',
        topics: [
          {
            id: 'm17-singleton',
            title: '1. Singleton',
            description: 'One instance only.',
            promptContext: 'Ensuring a class has only one instance.',
            practiceCode: `const singleton = { name: "only one" };`
          },
          {
            id: 'm17-factory',
            title: '2. Factory',
            description: 'Creating objects.',
            promptContext: 'A function that returns new objects.',
            practiceCode: `const createDog = () => ({ bark: true });`
          },
          {
            id: 'm17-observer',
            title: '3. Observer',
            description: 'Pub/Sub systems.',
            promptContext: 'Subscribing to events and notifying listeners.',
            practiceCode: `// element.addEventListener is an observer`
          },
          {
            id: 'm17-module',
            title: '4. Module Pattern',
            description: 'Encapsulation.',
            promptContext: 'Using closures to create private scope.',
            practiceCode: `const mod = (() => { let priv = 1; return { get: () => priv }; })();`
          }
        ]
      }
    ]
  },
  {
    id: 'module-18-security',
    title: 'Module 18: Security',
    subModules: [
      {
        title: 'Web Security',
        topics: [
          {
            id: 'm18-xss',
            title: '1. XSS',
            description: 'Cross Site Scripting.',
            promptContext: 'Injecting malicious scripts into web pages. Prevention: Escaping.',
            practiceCode: `// Never use innerHTML with user input!`
          },
          {
            id: 'm18-csrf',
            title: '2. CSRF',
            description: 'Cross Site Request Forgery.',
            promptContext: 'Tricking users into executing actions. Prevention: Tokens.',
            practiceCode: `// Use SameSite cookie attributes`
          },
          {
            id: 'm18-sanitization',
            title: '3. Input Sanitization',
            description: 'Cleaning user input.',
            promptContext: 'Validating and stripping dangerous characters.',
            practiceCode: `const safe = input.replace(/</g, "&lt;");`
          },
          {
            id: 'm18-eval',
            title: '4. Eval is Evil',
            description: 'Dangers of eval().',
            promptContext: 'Why executing strings as code is a massive security hole.',
            practiceCode: `// eval("alert('Hack')"); // DON'T`
          }
        ]
      }
    ]
  },
  {
    id: 'module-19-performance',
    title: 'Module 19: Performance',
    subModules: [
      {
        title: 'Optimization',
        topics: [
          {
            id: 'm19-debounce',
            title: '1. Debounce',
            description: 'Delaying execution.',
            promptContext: 'Wait for pause in events (typing) before firing.',
            practiceCode: `// Search only after user stops typing for 300ms`
          },
          {
            id: 'm19-throttle',
            title: '2. Throttle',
            description: 'Rate limiting.',
            promptContext: 'Ensure function runs at most once every X ms (scroll events).',
            practiceCode: `// Run scroll handler max once every 100ms`
          },
          {
            id: 'm19-memory',
            title: '3. Memory Leaks',
            description: 'Garbage Collection.',
            promptContext: 'Unremoved event listeners, global variables.',
            practiceCode: `// removeEventListener when done!`
          },
          {
            id: 'm19-fragments',
            title: '4. Document Fragments',
            description: 'Batch DOM updates.',
            promptContext: 'Appending to an off-screen fragment to minimize Reflows.',
            practiceCode: `const frag = document.createDocumentFragment();`
          }
        ]
      }
    ]
  },
  {
    id: 'module-20-future',
    title: 'Module 20: Future & Meta',
    subModules: [
      {
        title: 'The Future',
        topics: [
          {
            id: 'm20-ts',
            title: '1. TypeScript Intro',
            description: 'Static Typing.',
            promptContext: 'Why TS took over. Types, Interfaces, Compilation.',
            practiceCode: `// let x: number = 5;`
          },
          {
            id: 'm20-frameworks',
            title: '2. Frameworks Overview',
            description: 'React, Vue, Svelte.',
            promptContext: 'The shift from Vanilla JS to Component-based architecture.',
            practiceCode: `// Components, State, Props`
          },
          {
            id: 'm20-workers',
            title: '3. Web Workers',
            description: 'Multi-threading.',
            promptContext: 'Running heavy code on a background thread.',
            practiceCode: `const worker = new Worker("worker.js");`
          },
          {
            id: 'm20-wasm',
            title: '4. WebAssembly',
            description: 'Beyond JavaScript.',
            promptContext: 'Running C++/Rust in the browser alongside JS.',
            practiceCode: `// High performance logic`
          }
        ]
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