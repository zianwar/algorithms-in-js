/*
 * Bridges and articulation points are important in graph theory because they
 * often hint at weak points, bottlenecks or vulnerabilities in a graph.
 * Therefore, it's important to be able to quickly find/detect
 * when and where these occur.
 */

/**
 * findBridges
 * Finds all the bridges on an undirected graph
 *
 * - Start at any node and do a Depth First Search (DFS) traversal labeling
 *   nodes with an increasing id value as you go.
 * - Keep track the id of each node and the smallest low-link value.
 * - During the DFS, bridges will be found where the id of the node
 *   your edge is coming from is less than the low link value of
 *   the node your edge is going to.
 *
 * NOTE: The low-link value of a node is defined as the smallest (lowest)
 *   id reachable from that node when doing a DFS (including itself).
 *
 * @param {Array} edges
 * @returns {Array} bridges
 */
function findBridges(edges) {
  const graph = buildGraph(edges);

  // Data structure that holds different states of vertices.
  const state = {
    ids: new Map(), // Maps a vertex to an id number.
    low: new Map(), // Maps a vertex to its low-link value.
    visited: new Map(), // Maps wether a vertex is visited or not.
  }

  // Set initial state values.
  for (const [v] of graph) {
    state.visited.set(v, false);
    state.low.set(v, 0);
    state.ids.set(v, 0);
  }

  const id = 0; // Unique id number generator.
  const bridges = [];

  for (const [v] of graph) {
    if (!state.visited.get(v)) {
      dfs(graph, state, v, null, bridges, id + 1);
    }
  }

  return bridges;
}

/**
 * dfs
 * Performs a Depth-first-search on the directed graph.
 *
 * @param {Map} graph
 * @param {Map} visited
 * @param {Map} ids
 * @param {Map} low
 * @param {Any} at
 * @param {Any} prev
 * @param {Array} bridges
 * @param {Number} id
 */
function dfs(graph, state, at, prev, bridges, id) {
  state.visited.set(at, true);
  state.ids.set(at, id);
  state.low.set(at, id); // make the default low-link value of v its id.

  for (const to of graph.get(at)) {
    // Avoid going back to the same vertex (since this an undirected graph).
    if (to === prev) continue;

    if (!state.visited.get(to)) {
      dfs(graph, state, to, at, bridges, id + 1);
      // Update low-link value to lowest when backtracking.
      state.low.set(at, Math.min(state.low.get(at), state.low.get(to)));
      if (state.ids.get(at) < state.low.get(to)) {
        bridges.push([at, to]);
      }
    } else {
      // When try to visit an already-visited node, update
      // its low-link value to be min of current low-link value and
      // id of the node its going to.
      state.low.set(at, Math.min(state.low.get(at), state.ids.get(to)));
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

module.exports = findBridges;