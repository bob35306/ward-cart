import { test } from 'node:test'
import assert from 'node:assert/strict'
import { cartTotal } from '../src/cart.js'

// Standard options used across multiple tests
const defaultOptions = {
  vatRate: 0.08,
  freeShipFrom: 500000,
  shipFee: 30000,
}

test('the example from the slides returns 467400 as a number', () => {
  const items = [
    { name: 'Áo thun', price: 180000, qty: 2 },
    { name: 'Sổ tay', price: 45000, qty: 1 },
  ]
  const total = cartTotal(items, defaultOptions)
  assert.equal(total, 467400)
  assert.equal(typeof total, 'number')
})

test('empty cart returns 0 without VAT or shipping applied', () => {
  const total = cartTotal([], defaultOptions)
  assert.equal(total, 0)
})

test('free shipping applies when subtotal equals freeShipFrom exactly', () => {
  const items = [{ name: 'Sách', price: 500000, qty: 1 }]
  // Subtotal = 500000, VAT (8%) = 40000, shipping = 0
  const total = cartTotal(items, defaultOptions)
  assert.equal(total, 540000)
})

test('free shipping applies when subtotal exceeds freeShipFrom', () => {
  const items = [{ name: 'Bàn phím cơ', price: 600000, qty: 1 }]
  // Subtotal = 600000, VAT (8%) = 48000, shipping = 0
  const total = cartTotal(items, defaultOptions)
  assert.equal(total, 648000)
})

test('shipping fee applies when subtotal is below freeShipFrom', () => {
  const items = [{ name: 'Chuột', price: 200000, qty: 1 }]
  // Subtotal = 200000, VAT (8%) = 16000, shipping = 30000
  const total = cartTotal(items, defaultOptions)
  assert.equal(total, 246000)
})

test('throws RangeError when an item price is negative', () => {
  const items = [{ name: 'Lỗi giá', price: -50000, qty: 1 }]
  assert.throws(
    () => cartTotal(items, defaultOptions),
    (err) => err instanceof RangeError
  )
})

test('throws RangeError when an item quantity is zero or negative', () => {
  const items = [{ name: 'Lỗi số lượng âm', price: 100000, qty: 0 }]
  assert.throws(
    () => cartTotal(items, defaultOptions),
    (err) => err instanceof RangeError
  )
})

test('throws RangeError when an item quantity is not an integer (e.g., 1.5)', () => {
  const items = [{ name: 'Lỗi số lượng lẻ', price: 100000, qty: 1.5 }]
  assert.throws(
    () => cartTotal(items, defaultOptions),
    (err) => err instanceof RangeError
  )
})

test('rounds result to the nearest whole integer đồng as a number', () => {
  // Subtotal = 100000, VAT (8.25%) = 8250, shipping = 30000.33 -> 138250.33 -> rounds to 138250
  const items = [{ name: 'Mặt hàng', price: 100000, qty: 1 }]
  const fractionalOptions = {
    vatRate: 0.0825,
    freeShipFrom: 500000,
    shipFee: 30000.33,
  }
  const total = cartTotal(items, fractionalOptions)
  assert.equal(total, 138250)
  assert.equal(typeof total, 'number')
})
