const { parseInput, sortCarts, headedTo, move } = require('./utils');

module.exports = function (lines) {
  const parsedInput = parseInput(lines);
  const { map } = parsedInput;
  let { carts } = parsedInput;

  for (let i = 0; i < 100000; i++) {
    carts = sortCarts(carts);

    for (const [index, cart] of carts.entries()) {
      const destination = headedTo(cart);

      // check if there will be a crash
      if (carts.find(cart => cart.x === destination.x && cart.y === destination.y)) return destination;

      // otherwise move the cart and continue
      carts[index] = move(cart, map[destination.y][destination.x]);
    }
  }
}