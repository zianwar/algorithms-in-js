const test = require("ava");
const findBridges = require("./FindBridges");

test("findBridges", t => {
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
  t.deepEqual(bridges, [[ 3, 4 ], [ 2, 3 ], [ 2, 5 ]]);
});
