const test = require("ava");
const StronglyConnectedComponents = require("./StronglyConnectedComponents");

test("findSCCs", t => {
  const edges = [
    [1, 2],
    [2, 3],
    [3, 1],
    [4, 2],
    [4, 3],
    [4, 5],
    [5, 4],
    [5, 6],
    [6, 3],
    [6, 7],
    [7, 6],
    [8, 5],
    [8, 8],
  ];
  const SSCs = new StronglyConnectedComponents(edges);
  const result = SSCs.findSCCs();
  console.log("result", result);
  t.deepEqual(result, [[1, 2, 3], [4, 5], [6, 7], [8]]);
});
