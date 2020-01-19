const test = require("ava");
const findBridges = require("./FindBridges");

test("findBridges", t => {
  const edges = [
    [0, 1],
    [0, 2],
    [1, 0],
    [1, 2],
    [2, 0],
    [2, 1],
    [2, 3],
    [2, 5],
    [3, 2],
    [3, 4],
    [4, 3],
    [5, 2],
    [5, 6],
    [5, 8],
    [6, 5],
    [6, 7],
    [7, 6],
    [7, 8],
    [8, 5],
    [8, 7],
  ];
  const bridges = findBridges(edges);
  t.deepEqual(bridges, [[ 3, 4 ], [ 2, 3 ], [ 2, 5 ]]);
});
