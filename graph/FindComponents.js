/*
Find Components in a graph
*/

// Global or class scoped variables
let id = 0;

function findComponents(edges) {
  const adjList = buildGraph(edges);
  const visited = new Map();
  for (const [v] of adjList) visited.set(v, false);

  // Map of vertices to id
  const componentIds = new Map();

  for (const [v] of adjList) {
    if (!visited.get(v)) {
      id += 1;
      dfs(adjList, v, visited, componentIds);
    }
  }

  const components = Array.from(new Array(id), () => []);
  for (const [v, cid] of components) {
    components[cid-1].push(v);
  }
  return components;
}

function dfs(adjList, at, visited, componentIds) {
  if (visited.get(at)) return;

  visited.set(at, true);
  componentIds.set(at, id);

  for (const n of adjList.get(at)) {
    dfs(adjList, n, visited, componentIds);
  }
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

module.exports = findComponents;