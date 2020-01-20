const test = require("ava");
const topologicalSort = require("./TopologicalSort-DFS");

test("topologicalSort", t => {
  const edges = [[2,3],[3,1],[4,1],[4,0],[5,0],[5,2]];
  const ordering = topologicalSort(edges);
  console.log('ordering', ordering)
  t.deepEqual(ordering, [5, 4, 0, 2, 3, 1]);
});
