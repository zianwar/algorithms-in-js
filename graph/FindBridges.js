/*
  Finds all the bridges on an undirected graph.
*/

function findBridges(edges) {
  let id = 0; // To label each vertex with a unique id number.
  const adjList = buildGraph(edges);

  const ids = new Map(); // Maps a vertex to an id number.
  const lowLinks = new Map(); // Maps a vertex to it low-link value.
  const visited = new Map(); // Maps wether a vertex is visited.

  for (const v of adjList.keys()) {
    lowLinks.set(v, 0);
    ids.set(v, 0);
    visited.set(v, false);
  }

  const bridges = [];

  function dfs(at, prev) {
    visited.set(at, true);
    id += 1;
    ids.set(at, id);
    lowLinks.set(at, id); // make the default low-link value of v its id.

    if (adjList.has(at)) {
      for (const to of adjList.get(at)) {
        if (to === prev) continue;

        if (!visited.get(to)) {
          dfs(to, at);
          lowLinks.set(at, Math.min(lowLinks.get(at), lowLinks.get(to)));
          if (ids.get(at) < lowLinks.get(to)) {
            bridges.push([at, to]);
          }
        } else {
          lowLinks.set(at, Math.min(lowLinks.get(at), ids.get(to)));
        }
      }
    }
  }

  for (const v of adjList.keys()) {
    if (!visited.get(v)) {
      dfs(v, -1);
    }
  }

  return bridges;
}

function buildGraph(edges) {
  let adjList = new Map();
  for (let i = 0; i < edges.length; i++) {
    const from = edges[i][0];
    const to = edges[i][1];
    if (!adjList.has(to)) adjList.set(to, []);
    if (!adjList.has(from)) adjList.set(from, []);
    adjList.get(from).push(to);
  }
  return adjList;
}

module.exports = findBridges;