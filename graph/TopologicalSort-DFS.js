/*
  Topological Sort

  A topological sort of a directed graph is a linear ordering of its vertices such that for every directed edge uv from vertex u to vertex v, u comes before v in the ordering.
  - A topological ordering is possible if and only if the graph has no directed cycles, that is, if it is a directed acyclic graph (DAG).
  - Any DAG has at least one topological ordering, and algorithms are known for constructing a topological ordering of any DAG in linear time.

  The usual algorithms for topological sorting have running time linear in the number of nodes plus the number of edges, asymptotically.
*/

const VISITED = 1;
const VISITING = 2;

// Depth-first search algorithm for graph topological sort.
// Time complexity: O(E+V)
function topologicalSort(edges) {
  const adjList = buildGraph(edges);
  const state = new Map();
  const ordering = [];

  for (const v of adjList.keys()) {
    if (dfs(adjList, state, ordering, v)) {
      // "Graph contains a cylce, topological sort is not possible."
      return [];
    }
  }

  ordering.reverse();
  return ordering;
}

function dfs(adjList, state, ordering, v) {
  if (state.get(v) === VISITED) return false;
  if (state.get(v) === VISITING) return true;

  state.set(v, VISITING);

  for (const n of adjList.get(v)) {
    if (dfs(adjList, state, ordering, n)) return true;
  }

  state.set(v, VISITED);
  ordering.push(v);

  return false;
}

// Build the graph adjacency list from the edges array
// [[u,v], [u,w]] => { u: [v,w], v: [], w: [] }
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

module.exports = topologicalSort;