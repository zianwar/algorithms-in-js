const test = require("ava");
const findComponents = require("./FindComponents");
const sortAsc = (a, b) => a - b;

test("findComponents", t => {
  const edges = [
    [1, 2],
    [1, 3],
    [2, 1],
    [2, 3],
    [3, 1],
    [3, 2],
    [4, 5],
    [5, 4]
  ];
  const components = findComponents(edges);
  components.forEach(c => c.sort(sortAsc));

  t.deepEqual(components, [[1,2,3], [4,5]]);
});
