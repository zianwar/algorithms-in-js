/*
 * Find Components in a graph
 */

function findComponents(edges) {
  const adjList = buildGraph(edges);
  const visited = new Map();
  for (const [v] of adjList) visited.set(v, false);

  // Map of vertices to id
  const componentIds = new Map();
  let id = 0;

  for (const [v] of adjList) {
    if (!visited.get(v)) {
      dfs(adjList, v, visited, componentIds, ++id);
    }
  }

  const components = [];
  for (const [v, cid] of componentIds) {
    if (!components[cid-1]) components[cid-1] = [];
    components[cid-1].push(v);
  }
  return components;
}

function dfs(adjList, at, visited, componentIds, id) {
  visited.set(at, true);
  componentIds.set(at, id);

  for (const to of adjList.get(at)) {
    if (!visited.get(to)) {
      dfs(adjList, to, visited, componentIds, id);
    }
  }
}

/**
 * buildGraph
 * Build the undirected graph adjacency list from the edges array
 *
 * @param {Array} edges
 * @returns {Map} adjList Adjacency list
 */
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

module.exports = findComponents;