// const graph = new Graph();
// graph.addVertex("A");
// graph.addVertex("B");
// graph.addVertex("C");
// graph.addEdge("A", "B");
// graph.addEdge("B", "C");
// console.log(graph.shortestPath("A", "C")); // Output: ["A", "B", "C"]

// for (let i = 0; i < coordinatesList.length; i++) {
//     for (let j = i + 1; j < coordinatesList.length; j++) {
//         if (adjacent(coordinatesList[i], coordinatesList[j])) {
//             graph.addEdge(coordinatesList[i], coordinatesList[j]);
//         }
//     }
// }

class Graph {
  private adjList: Map<string, string[]>

  constructor() {
    this.adjList = new Map()
  }

  addVertex(vertex: string) {
    if (!this.adjList.has(vertex)) {
      this.adjList.set(vertex, [])
    }
  }

  addEdge(vertex1: string, vertex2: string) {
    if (this.adjList.has(vertex1) && this.adjList.has(vertex2)) {
      this.adjList.get(vertex1)?.push(vertex2)
      this.adjList.get(vertex2)?.push(vertex1)
    }
  }

  removeEdge(vertex1: string, vertex2: string) {
    if (this.adjList.has(vertex1) && this.adjList.has(vertex2)) {
      const index1 = this.adjList.get(vertex1)?.indexOf(vertex2)
      const index2 = this.adjList.get(vertex2)?.indexOf(vertex1)
      if (index1 !== undefined && index2 !== undefined) {
        this.adjList.get(vertex1)?.splice(index1, 1)
        this.adjList.get(vertex2)?.splice(index2, 1)
      }
    }
  }

  removeVertex(vertex: string) {
    if (this.adjList.has(vertex)) {
      const neighbors = this.adjList.get(vertex)
      for (const neighbor of neighbors!) {
        this.removeEdge(vertex, neighbor)
      }
      this.adjList.delete(vertex)
    }
  }

  shortestPath(start: string, end: string): string[] {
    const queue: [string, string[]][] = [[start, [start]]]
    const visited = new Set<string>()
    while (queue.length > 0) {
      const [current, path] = queue.shift()!
      if (current === end) {
        return path
      }
      visited.add(current)
      for (const neighbor of this.adjList.get(current)!) {
        if (!visited.has(neighbor)) {
          queue.push([neighbor, [...path, neighbor]])
        }
      }
    }
    return []
  }
}
