function getLastViewedShips() {
  const storageShipsStr = localStorage.getItem('last_ships');
  return storageShipsStr ? JSON.parse(storageShipsStr) : [];
}

function addLastViewedShip(ship) {
  const lastShips = getLastViewedShips();

  const date = new Date();
  const dateTime = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;

  lastShips.unshift({ dateTime, ...ship });
  if (lastShips.length > 5) {
    lastShips.pop();
  }
  localStorage.setItem('last_ships', JSON.stringify(lastShips));
}

export default {};

export { getLastViewedShips, addLastViewedShip };
