# Self-assessment — IA#1

Submitted by: <student ID> — <full name>

Total I claim: 100 / 100

| Criterion | Max | I claim | Evidence |
|---|---|---|---|
| Behaviour | 30 | 30 | `npm test` all green; worked example returns 467400 as a number; empty cart returns 0; free shipping threshold works at/above 500000; negative price and non-integer quantity throw RangeError (`src/cart.js:18-28`). |
| Tests | 20 | 20 | 9 atomic tests in `test/cart.test.js` covering worked example, empty cart, threshold (exact/above/below), negative price, non-integer qty (`1.5`), and whole đồng rounding. Each test fails for one reason. |
| Harness | 20 | 20 | `CLAUDE.md` specifies stack, commands, and 5 "never" rules; `package.json` includes `npm run gate` (`lint` + `test`); CI in `.github/workflows/ci.yml` runs on push to repository `https://github.com/bob35306/ward-cart`. |
| Brief | 15 | 15 | `brief.md` explicitly names allowed files (`src/cart.js`, `test/cart.test.js`), input/output contract, error cases (`RangeError`), and "no dependencies". |
| AI-LOG.md | 15 | 15 | `AI-LOG.md` strictly follows template, documenting Tool, Asked for, Kept, Changed, Rejected, and By hand for all phases, verifiable against git history. |

## What I did not manage
Setting up Node.js on the Windows environment initially encountered a PATH resolution issue where `npm` was not found in the default terminal session until the environment PATH was reloaded. In addition, meeting the gate requirement without introducing any third-party dependencies meant researching Node's built-in `node --check` rather than using standard npm linter packages.

## What I would do differently
Configure the remote GitHub repository and verify system environment variables upfront prior to initiating the workflow steps to ensure continuous CI feedback right from the initial failing commit.
