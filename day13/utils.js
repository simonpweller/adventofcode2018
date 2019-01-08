function parseInput(lines) {
  const map = [];
  const carts = [];
  lines.forEach((row, y) => {
    let newRow = '';
    row.split('').forEach((cell, x) => {
      switch (cell) {
        case '>':
          newRow += '-';
          carts.push({ x, y, facing: 'right', nextTurn: 'left' });
          break;
        case '<':
          newRow += '-';
          carts.push({ x, y, facing: 'left', nextTurn: 'left' });
          break;
        case '^':
          carts.push({ x, y, facing: 'up', nextTurn: 'left' });
          newRow += '|';
          break;
        case 'v':
          carts.push({ x, y, facing: 'down', nextTurn: 'left' });
          newRow += '|';
          break;
        default:
          newRow += cell;
      }
    });
    map.push(newRow);
  });

  return {
    carts,
    map,
  }
}

function sortCarts(carts) {
  return carts.sort((cartA, cartB) => {
    if (cartA.x < cartB.x) return -1;
    if (cartA.x > cartB.x) return 1;
    if (cartA.y < cartB.y) return -1;
    if (cartA.y > cartB.y) return 1;
    return 0;
  });
}

function headedTo(cart) {
  let { x, y, facing } = cart;
  switch (facing) {
    case 'left':
      x--;
      break;
    case 'right':
      x++;
      break;
    case 'up':
      y--;
      break;
    case 'down':
      y++;
      break;
  }
  return {
    x,
    y,
  }
}

function move(cart, target) {
  const newCart = { ...cart };
  switch (cart.facing) {
    case 'left':
      newCart.x--;
      if (target === '/') newCart.facing = 'down';
      if (target === '\\') newCart.facing = 'up';
      break;
    case 'right':
      newCart.x++;
      if (target === '/') newCart.facing = 'up';
      if (target === '\\') newCart.facing = 'down';
      break;
    case 'up':
      newCart.y--;
      if (target === '/') newCart.facing = 'right';
      if (target === '\\') newCart.facing = 'left';
      break;
    case 'down':
      newCart.y++;
      if (target === '/') newCart.facing = 'left';
      if (target === '\\') newCart.facing = 'right';
      break;
  }
  if (target === '+') {
    newCart.facing = cross(cart.facing, cart.nextTurn);
    switch (cart.nextTurn) {
      case 'left':
        newCart.nextTurn = 'straight';
        break;
      case 'straight':
        newCart.nextTurn = 'right';
        break;
      case 'right':
        newCart.nextTurn = 'left';
        break;
    }
  }
  return newCart;
}

function cross(facing, turn) {
  if (turn === 'straight') return facing;
  switch (facing) {
    case 'up':
      if (turn === 'left') return 'left';
      if (turn === 'right') return 'right';
    case 'down':
      if (turn === 'left') return 'right';
      if (turn === 'right') return 'left';
    case 'left':
      if (turn === 'left') return 'down';
      if (turn === 'right') return 'up';
    case 'right':
      if (turn === 'left') return 'up';
      if (turn === 'right') return 'down';
  }
}

module.exports = {
  parseInput,
  sortCarts,
  headedTo,
  move,
  cross,
}