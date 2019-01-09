const { parseInput, sortCarts, headedTo, move } = require('./utils');

module.exports = function (lines) {
  const parsedInput = parseInput(lines);
  const { map } = parsedInput;
  let { carts } = parsedInput;

  for (let i = 0; i < 100000; i++) {
    // remove any crashed carts
    carts = carts.filter(cart => !cart.hasCrashed);

    // finish if there's only one cart left
    if (carts.length === 1) return {
      x: carts[0].x,
      y: carts[0].y,
    };

    // otherwise go through another turn
    carts = sortCarts(carts);

    for (const [index, cart] of carts.entries()) {
      // skip carts that have been crashed into during the turn
      if (cart.hasCrashed) continue;

      const destination = headedTo(cart);

      // check if there will be a crash
      const crashTarget = carts.findIndex(cart => cart.x === destination.x && cart.y === destination.y);
      if (crashTarget !== -1) {
        // mark carts participating in the crash for removal
        carts[index].hasCrashed = true;
        carts[crashTarget].hasCrashed = true;
      } else {
        // otherwise move the cart and continue
        carts[index] = move(cart, map[destination.y][destination.x]);
      }
    }
  }
}