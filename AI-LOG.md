# AI-LOG.md — CSC13008

## 2026-09-30 — Development harness setup & initial gate
Tool: Antigravity IDE (Gemini 3.8 Flash).  
Asked for: Set up the project harness with a rules file (`CLAUDE.md`), gate script in `package.json`, and GitHub Actions CI.  
Kept: The rules file layout in `CLAUDE.md`, matrix testing on Node.js 20.x & 22.x in `.github/workflows/ci.yml`.  
Changed: Configured the lint command to use Node's native syntax checker `node --check src/cart.js test/cart.test.js` instead of an external linter, ensuring strictly zero third-party dependencies.  
Rejected: Any proposals to install npm devDependencies like `eslint` or `prettier` to adhere to the strict no-dependency requirement.  
By hand: Ran `npm test` and `npm run gate` locally to observe and verify the failing (RED) state, set up the remote repository, and pushed the initial commit to GitHub.

## 2026-09-30 — Specification brief (`brief.md`)
Tool: Antigravity IDE (Gemini 3.8 Flash).  
Asked for: Create a complete and rigorous `brief.md` defining files to touch, function contract, error conditions, and constraints.  
Kept: Parameter signatures (`items`, `options`), calculation rules (subtotal, shipping threshold, VAT rate), and worked example values.  
Changed: Explicitly highlighted the constraint that `cartTotal` must return a primitive `number` (never a string formatted via `toFixed`), and specified whole integer rounding using `Math.round`.  
Rejected: Generic specification descriptions that did not name exact filenames or error types.  
By hand: Cross-checked the brief against slides 24-25 of session 2 and the assignment rubric to ensure 100% compliance.

## 2026-09-30 — Implement `cartTotal` and atomic test suite
Tool: Antigravity IDE (Gemini 3.8 Flash).  
Asked for: Implement `cartTotal(items, options)` in `src/cart.js` and a full suite of atomic unit tests in `test/cart.test.js`.  
Kept: Validation checks for `price < 0` and `!Number.isInteger(qty) || qty <= 0`, logic for free shipping threshold (`subtotal >= freeShipFrom`).  
Changed: Structured each test in `test/cart.test.js` into focused, independent cases so each test fails for exactly one reason, satisfying the atomic test requirement in the rubric.  
Rejected: Suggested use of a single chained `.reduce()` with ternary error throwing; replaced with an explicit `for...of` loop for clearer step-by-step validation.  
By hand: Added dedicated assertion tests checking `typeof total === 'number'`, exact threshold boundary testing, and fractional currency rounding test.
