/*
 * Bridges and articulation points are important in graph theory because they
 * often hint at weak points, bottlenecks or vulnerabilities in a graph.
 * Therefore, it's important to be able to quickly find/detect
 * when and where these occur.
 */

/**
 * findArticulationPoints
 * Finds all the articulation points on an undirected graph
 *
 * @param {Array} edges
 * @returns {Array} bridges
 */
function findArticulationPoints(edges) {
  const graph = buildGraph(edges);

  // Data structure that holds different states of vertices.
  const state = {
    ids: new Map(), // Maps a vertex to an id number.
    low: new Map(), // Maps a vertex to its low-link value.
    visited: new Map(), // Maps wether a vertex is visited or not.
    arts: new Map(), // Maps wether a vertex is an articulation point.
    outdegree: new Map(), // Maps the count of the outgoing edges of a vertex.
  }

  // Set initial state values.
  for (const [v] of graph) {
    state.visited.set(v, false);
    state.low.set(v, 0);
    state.ids.set(v, 0);
    state.outdegree.set(v, 0);
  }

  const id = 0; // Unique id number generator.
  for (const [v] of graph) {
    if (!state.visited.get(v)) {
      dfs(v, v, graph, state, null, id + 1);
      // Re-mark the vertex as an articulation point based on if
      // it has more than 1 outgoing edges.
      state.arts.set(v, state.outdegree.get(v) > 1);
    }
  }

  // Collect the articulation points.
  const articulationPoints = [];
  for (const [v, isArt] of state.arts) {
    if (isArt) articulationPoints.push(v);
  }
  return articulationPoints;
}

/**
 * dfs
 * Performs a Depth-first-search on the directed graph.
 *
 * @param {Any} src
 * @param {Any} at
 * @param {Map} graph
 * @param {Map} state
 * @param {Any} prev
 * @param {Number} id
 */
function dfs(src, at, graph, state, prev, id) {
  if (prev === src) {
    state.outdegree.set(at, state.outdegree.get(at) + 1);
  }

  state.visited.set(at, true);
  state.ids.set(at, id);
  state.low.set(at, id); // make the default low-link value of v its id.

  for (const to of graph.get(at)) {
    // Avoid going back to the same vertex (since this an undirected graph).
    if (to === prev) continue;

    if (!state.visited.get(to)) {
      dfs(src, to, graph, state, at, id + 1);
      // Update low-link value to lowest when backtracking.
      state.low.set(at, Math.min(state.low.get(at), state.low.get(to)));
      // Check for articulation points found via a bridge (< comparison)
      // and via cycles (= comparison). We have yet to verify them when
      // the DFS traversal ends based on the their outdegree.
      if (state.ids.get(at) <= state.low.get(to)) {
        state.arts.set(at, true);
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

module.exports = findArticulationPoints;