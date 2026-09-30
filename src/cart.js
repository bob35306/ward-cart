/**
 * Calculates the total cost of a shopping cart including VAT and shipping.
 * Plain JavaScript implementation with zero external dependencies.
 *
 * @param {Array<{ name: string, price: number, qty: number }>} items - Cart item list.
 * @param {{ vatRate: number, freeShipFrom: number, shipFee: number }} options - Configuration.
 * @returns {number} The total amount rounded to the nearest whole đồng.
 * @throws {RangeError} When an item has a negative price or a non-positive-integer quantity.
 */
export function cartTotal(items, options) {
  if (!items || items.length === 0) {
    return 0
  }

  let subtotal = 0

  for (const item of items) {
    if (typeof item.price !== 'number' || item.price < 0) {
      throw new RangeError('Item price cannot be negative')
    }

    if (
      typeof item.qty !== 'number' ||
      !Number.isInteger(item.qty) ||
      item.qty <= 0
    ) {
      throw new RangeError('Item quantity must be a positive integer')
    }

    subtotal += item.price * item.qty
  }

  const vat = subtotal * options.vatRate
  const shipping = subtotal >= options.freeShipFrom ? 0 : options.shipFee

  return Math.round(subtotal + vat + shipping)
}
