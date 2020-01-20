/*
  Strongly Connected Components in a directed graph.
  Strongly Connected Components (SCCs) can be thought of as self-contained cycles within a directed graph where every vertex in a given cycle can reach every other vertex in the same cycle.
*/

/**
 * StronglyConnectedComponents
 *
 * Finds Strongly Connected Components using Tarjan's Algorithm:
 *
 * 1. Mark the id of each node as unvisited.
 * 2. Start DFS. Upon visiting a node assign it an id and a low—link value. Also mark current nodes as visited and add them to a seen stack.
 * 3. On DFS callback, if the previous node is on the stack then min the current node's low—link value with the last node's low—link value (This allows low—link values to propagate throughout cycles).
 * 4. After visiting all neighbours, if the current node started a connected component (As we will see, a node started a connected component if its id equals its low link value) then pop nodes off stack until current node is reached.
 *
 */
class StronglyConnectedComponents {

  constructor(edges) {
    this.id = 0; // for label each vertex with a unique id number.
    this.adjList = this.buildGraph(edges);

    this.visited = new Set();
    this.onStack = new Set();
    this.stack = [];

    this.ids = new Map();
    this.low = new Map();
    for (const [v] of this.adjList) {
      this.ids.set(v, 0);
      this.low.set(v, 0);
    }
  }

  /**
   * findSCCs
   * Finds strongly connected components in a graph.
   *
   * @returns {Array} sscs
   */
  findSCCs() {
    for (const [v] of this.adjList) {
      if (!this.visited.has(v)) {
        this.dfs(v);
      }
    }
    return this.low;
  }

  /**
   * dfs
   * Performs Depth-first-search.
   *
   * @param {Number} at starting node of the DFS
   */
  dfs(at) {
    this.visited.add(at);
    this.stack.push(at);
    this.onStack.add(at);
    this.id += 1;
    this.ids.set(at, this.id);
    this.low.set(at, this.id);

    for (const [to] of this.adjList) {
      if (!this.visited.has(to)) {
        this.dfs(to);
      }
      if (this.onStack.has(to)) {
        this.low.set(at, Math.min(this.low.get(at), this.low.get(to)));
      }
    }

    // When a completed SCC is found (current node has visited all its neighbours and its lowlink value equals its id)
    // pop off all associated nodes off the stack.
    if (this.ids.get(at) === this.low.get(at)) {
      while (this.stack.length) {
        const v = this.stack.pop();
        this.onStack.delete(v);
        this.low.set(v, this.ids.get(at));
        if (v === at) break;
      }
    }
  }

  /**
   * buildGraph
   * Builds directed graph
   *
   * @param {Array} edges
   * @returns {Map} adjList Adjacency list of the directed graph
   */
  buildGraph(edges) {
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
}


module.exports = StronglyConnectedComponents;