/**
 * Topological Sort
 *
 * A topological sort of a directed graph is a linear ordering of
 * its vertices such that: for every directed edge uv from vertex u to
 * vertex v, u comes before v in the ordering.
 * - A topological ordering is possible if and only if the graph
 *   has no directed cycles,
 *   that is, if it is a directed acyclic graph (DAG).
 * - Any DAG has at least one topological ordering, and algorithms are known for
 *   constructing a topological ordering of any DAG in linear time.
 *
 * The usual algorithms for topological sorting have running time linear in
 * the number of nodes plus the number of edges, asymptotically.
 */


/**
 * topologicalSort
 * Kahn's algorithm for graph topological sort.
 * Time complexity: O(E+V)
 *
 * @param {Array} edges
 * @returns {Array} ordering Topological ordering of the graph.
 */
function topologicalSort(edges) {
  const adjList = buildGraph(edges);
  const indegrees = buildIndegrees(adjList);

  const queue = [];
  const ordering = [];

  // Pick all the vertices with in-degree as 0 and add them to the queue.
  for (const [v, degree] of indegrees) {
    if (degree === 0) queue.push(v);
  }

  // Dequeue a vertex from the queue and then repeat the following
  // until queue is empty:
  // 1. Add vertex to the ordering array.
  // 2. Decrease in-degree by 1 for all its neighboring vertices.
  // 3. If in-degree of a neighboring vertices is reduced to zero,
  //    then add it to the queue.
  while (queue.length) {
    const v = queue.shift();

    if (adjList.has(v)) {
      for (const neighbor of adjList.get(v)) {
        indegrees.set(neighbor, indegrees.get(neighbor) - 1);
        if (indegrees.get(neighbor) === 0) queue.push(neighbor);
      }
    }

    ordering.push(v);
  }

  // If count of visited vertices in ordering array is not equal to
  // the number of vertices
  // in the graph then the topological sort is not possible for the given graph.
  if (ordering.length !== indegrees.size) {
    // Graph contains a cylce, topological sort is not possible.
    return [];
  }

  return ordering;
}

/**
 * buildIndegrees
 *
 * Intitialize in-degree of all vertices to 0 and traverse the list
 * for every vertex. Then increment the in-degree of all the vertices
 * connected to it by 1.
 *
 * Other way to do it is: to traverse the array of edges and simply increase
 * the counter of the destination vertex by 1. Both approaches take O(E+V).
 *
 * @param {Map} adjList
 * @return {Map} indegrees
 */
function buildIndegrees(adjList) {
  const indegrees = new Map();
  for (const v of adjList.keys()) {
    indegrees.set(v, 0);
  }

  for (const v of adjList.keys()) {
    for (const neighbor of adjList.get(v)) {
      indegrees.set(neighbor, indegrees.get(neighbor) + 1);
    }
  }
  return indegrees;
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