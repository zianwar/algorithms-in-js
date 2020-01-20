/*
  Bridges and articulation points are important in graph theory because they often hint at weak points, bottlenecks or vulnerabilities in a graph.
  Therefore, it's important to be able to quickly find/detect when and where these occur.
*/

// Global or class scoped variables
let id = 0; // To label each vertex with a unique id number.

/**
 * findBridges
 * Finds all the bridges on an undirected graph
 *
 * - Start at any node and do a Depth First Search (DFS) traversal labeling nodes with an increasing id value as you go.
 * - Keep track the id of each node and the smallest low-link value.
 * - During the DFS, bridges will be found where the id of the node your edge is coming from is less than the low link value
 *   of  the node your edge is going to.
 *
 * NOTE: The low-link value of a node is defined as the smallest (lowest) id reachable from that node when doing a DFS (including itself).
 *
 * @param {Array} edges
 */
function findBridges(edges) {
  const adjList = buildGraph(edges);

  const ids = new Map(); // Maps a vertex to an id number.
  const low = new Map(); // Maps a vertex to it low-link value.
  const visited = new Map(); // Maps wether a vertex is visited.

  // Set initial values of visited to false, low and ids to 0.
  for (const [v] of adjList) {
    visited.set(v, false);
    low.set(v, 0);
    ids.set(v, 0);
  }

  const bridges = [];

  for (const [v] of adjList) {
    if (!visited.get(v)) {
      dfs(adjList, visited, ids, low, v, null, bridges);
    }
  }

  return bridges;
}

function dfs(adjList, visited, ids, low, at, prev, bridges) {
  visited.set(at, true);
  id += 1;
  ids.set(at, id);
  low.set(at, id); // make the default low-link value of v its id.

  for (const to of adjList.get(at)) {
    if (to === prev) continue;

    if (!visited.get(to)) {
      dfs(adjList, visited, ids, low, to, at, bridges);
      low.set(at, Math.min(low.get(at), low.get(to)));
      if (ids.get(at) < low.get(to)) {
        bridges.push([at, to]);
      }
    } else {
      // When try to visit an already-visited node, update
      // its low-link value to be min(current low-link value, id of the node its going to)
      low.set(at, Math.min(low.get(at), ids.get(to)));
    }
  }
}

// Builds an undirected graph
function buildGraph(edges) {
  let adjList = new Map();
  for (let i = 0; i < edges.length; i++) {
    const from = edges[i][0];
    const to = edges[i][1];
    if (!adjList.has(to)) adjList.set(to, []);
    if (!adjList.has(from)) adjList.set(from, []);
    adjList.get(from).push(to);
    adjList.get(to).push(from);
  }
  return adjList;
}

module.exports = findBridges;