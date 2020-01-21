const test = require("ava");
const findBridges = require("./FindBridges");
const sortAsc = (a, b) => a - b;

test("findBridges simple graph", t => {
  const edges = [
    [0, 1],
    [1, 2],
    [1, 3],
    [2, 3],
  ];
  const bridges = findBridges(edges);
  bridges.forEach(c => c.sort(sortAsc));
  t.deepEqual(bridges, [[0,1]]);
});

test("findBridges normal graph", t => {
  const edges = [
    [0, 1],
    [0, 2],
    [1, 2],
    [2, 3],
    [2, 5],
    [3, 4],
    [5, 6],
    [5, 8],
    [6, 7],
    [7, 8],
  ];
  const bridges = findBridges(edges);
  bridges.forEach(c => c.sort(sortAsc));
  t.deepEqual(bridges, [[ 3, 4 ], [ 2, 3 ], [ 2, 5 ]]);
});

test("findBridges graph of characters", t => {
  const edges = [
    ['a', 'b'],
    ['b', 'c'],
    ['b', 'd'],
    ['c', 'd']
  ];
  const bridges = findBridges(edges);
  bridges.forEach(c => c.sort());
  t.deepEqual(bridges, [['a', 'b']]);
});
