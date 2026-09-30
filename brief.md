# Task Brief: cartTotal Implementation with Harness

## 1. Objective
Implement the shopping cart calculation function `cartTotal(items, options)` in plain JavaScript without using any external dependencies, accompanied by a comprehensive unit test suite.

---

## 2. Allowed Scope & Files
You may ONLY create or modify the following files:
- `src/cart.js`: Primary implementation of the `cartTotal` function.
- `test/cart.test.js`: Unit tests verifying all rules, edge cases, and error conditions.

Do not modify existing dependency configurations or add any external packages (`dependencies` in `package.json` must remain empty).

---

## 3. Function Contract & Specification

### Signature
```javascript
export function cartTotal(items, options)
```

### Parameters
1. `items`: Array of item objects, where each object has:
   - `name` (string): Item display name.
   - `price` (number): Unit price in VND (đồng).
   - `qty` (number): Quantity of items purchased.

2. `options`: Configuration object containing:
   - `vatRate` (number): VAT rate expressed as a decimal (e.g., `0.08` for 8%).
   - `freeShipFrom` (number): Subtotal threshold in VND to qualify for free shipping.
   - `shipFee` (number): Standard shipping fee in VND applied when subtotal is strictly below `freeShipFrom`.

### Return Value
- **Type**: `number` (primitive number; NEVER return a string).
- **Format**: Rounded to the nearest whole đồng (`Math.round(...)`).

---

## 4. Business Logic & Calculation Rules

1. **Empty Cart Rule**:
   - If `items` is empty (`items.length === 0`), return `0`.
   - No VAT and no shipping fee are applied to an empty cart.

2. **Subtotal Calculation**:
   - `subtotal = Σ (item.price × item.qty)` for all items in `items`.

3. **Shipping Fee Rule**:
   - If `subtotal >= options.freeShipFrom`, shipping is `0`.
   - If `subtotal < options.freeShipFrom`, shipping is `options.shipFee`.

4. **VAT Calculation**:
   - `VAT = subtotal × options.vatRate`.

5. **Total Calculation**:
   - `Total = subtotal + VAT + shipping`.
   - The result must be rounded to whole integer đồng: `Math.round(total)`.

6. **Worked Reference Example**:
   - Items:
     - 2 × "Áo thun" at 180,000 VND = 360,000 VND
     - 1 × "Sổ tay" at 45,000 VND = 45,000 VND
     - Subtotal = 405,000 VND.
   - Options: `{ vatRate: 0.08, freeShipFrom: 500000, shipFee: 30000 }`.
   - Subtotal (405,000) < Free shipping threshold (500,000) → Shipping fee = 30,000 VND.
   - VAT (8%) = 405,000 × 0.08 = 32,400 VND.
   - Total = 405,000 + 32,400 + 30,000 = **467,400 VND** (`number`).

---

## 5. Validation & Error Handling (Strict RangeError)
The function must validate each item in `items` before computing totals:
1. **Negative Price**:
   - If any `item.price < 0`, throw a `RangeError` (e.g., `"Item price cannot be negative"`).
2. **Invalid Quantity**:
   - If any `item.qty` is not a positive integer (i.e. `item.qty <= 0` or `!Number.isInteger(item.qty)` such as decimal values like `1.5`), throw a `RangeError` (e.g., `"Quantity must be a positive integer"`).

---

## 6. Constraints & Prohibitions ("NEVER")
- **Strictly No Dependencies**: Zero third-party runtime npm packages. Use only standard ECMAScript / Node.js standard libraries.
- **Never Return Strings**: Do not use `Number.prototype.toFixed()` directly without converting back to `Number`. The return value must satisfy `typeof result === 'number'`.
- **Atomic Tests**: In `test/cart.test.js`, write focused tests using Node's native `node:test` and `node:assert/strict`. Each test case must be designed to fail for exactly one specific reason.
