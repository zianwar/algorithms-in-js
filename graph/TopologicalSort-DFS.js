/**
 * Topological Sort
 *
 * A topological sort of a directed graph is a linear ordering of its vertices such that
 * for every directed edge uv from vertex u to vertex v, u comes before v in the ordering.
 * - A topological ordering is possible if and only if the graph has no directed cycles,
 *   that is, if it is a directed acyclic graph (DAG).
 * - Any DAG has at least one topological ordering, and algorithms are known for
 *   constructing a topological ordering of any DAG in linear time.
 *
 * The usual algorithms for topological sorting have running time linear in
 * the number of nodes plus the number of edges, asymptotically.
 */


// Constants for managing possible states of vertices.
const VISITED = 1;
const VISITING = 2;

/**
 * topologicalSort
 * Depth-first search algorithm for finding a topological sort in a directed graph.
 *
 * @param {Array} edges
 * @returns {Array} ordering Topological ordering of the graph.
 */
function topologicalSort(edges) {
  const adjList = buildGraph(edges);
  const state = new Map();
  const ordering = [];

  for (const [v] of adjList) {
    if (dfs(adjList, state, ordering, v)) {
      // Graph contains a cylce, topological sort is not possible.
      return [];
    }
  }

  ordering.reverse();
  return ordering;
}

/**
 * dfs
 * Performs a Depth-first-search on the directed graph.
 *
 * @param {Map} adjList
 * @param {Map} state
 * @param {Array} ordering
 * @param {Any} v
 * @returns {Boolean} foundCycle
 */
function dfs(adjList, state, ordering, v) {
  if (state.get(v) === VISITED) return false;
  if (state.get(v) === VISITING) return true;

  state.set(v, VISITING);

  for (const n of adjList.get(v)) {
    if (dfs(adjList, state, ordering, n)) {
      // We found a cycle, return back to the caller.
      return true;
    }
  }

  state.set(v, VISITED);
  ordering.push(v);

  // We explored all neighbors of v successfully with no cycle found.
  return false;
}

/**
 * buildGraph
 * Build the directed graph adjacency list from the edges array
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
  }
  return adjList;
}


module.exports = topologicalSort;