const test = require("ava");
const topologicalSort = require("./TopologicalSort-Kahn");

test("topologicalSort", t => {
  const edges = [[2,3],[3,1],[4,1],[4,0],[5,0],[5,2]];
  const ordering = topologicalSort(edges);
  t.deepEqual(ordering, [4,5,0,2,3,1]);
});
