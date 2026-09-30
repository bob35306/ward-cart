# CLAUDE.md — Project Rules & Guidelines

## 1. Project Overview & Stack
- **Project**: WAD Session 2 — `cartTotal` Implementation (`CSC13008`).
- **Runtime & Language**: Node.js (>= 18 / 20 / 22), ECMAScript Modules (`"type": "module"`).
- **Testing Framework**: Node.js built-in test runner (`node:test`) and assertion library (`node:assert/strict`).
- **Dependencies**: Plain JavaScript only. **Zero external dependencies** (no npm packages allowed in `dependencies`).

## 2. Allowed Files
- `src/cart.js` — Core implementation of `cartTotal(items, options)`.
- `test/cart.test.js` — Unit test suite covering all specifications and edge cases.
- `package.json` — Scripts configuration (`test`, `lint`, `gate`).
- `brief.md` — Specification brief provided to the assistant.
- `AI-LOG.md` — Structured AI interaction log.
- `SELF_ASSESSMENT_REPORT.md` — Rubric self-assessment report.
- `.github/workflows/ci.yml` — Automated GitHub Actions CI workflow.

## 3. Essential Commands & The Gate
- **Run Tests**:
  ```bash
  npm test
  ```
- **Run Lint / Syntax Check**:
  ```bash
  npm run lint
  ```
- **The Gate (MUST pass before any commit)**:
  ```bash
  npm run gate
  ```
  *(Executes `npm run lint` followed by `npm test`).*

## 4. Non-Negotiable Rules ("NEVER" Rules)
1. **NEVER** install, import, or introduce any third-party npm runtime dependencies. All logic must use native JavaScript.
2. **NEVER** return a string value from `cartTotal`. Avoid using `Number.prototype.toFixed()` directly without casting back to `Number`; the return value must be a whole `Number` rounded to integer đồng using `Math.round()`.
3. **NEVER** commit, merge, or push code if `npm run gate` is failing (RED).
4. **NEVER** allow negative item prices (`price < 0`) or non-integer / non-positive quantities (`qty <= 0` or non-integer). These must strictly throw `RangeError`.
5. **NEVER** charge shipping or VAT on an empty cart (`items.length === 0`); it must return `0`.
