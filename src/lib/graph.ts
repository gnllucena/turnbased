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

  //   type NodeWithCost = {
  //     node: string,
  //     cost: number,
  //   }

  //   dijkstra(start: string, end: string): string[] {
  //     const distances: Map<string, number> = new Map()
  //     const previous: Map<string, string | null> = new Map()
  //     const queue: NodeWithCost[] = []

  //     // Initialize distances and previous nodes
  //     this.adjList.forEach((neighbors, node) => {
  //       distances.set(node, Infinity)
  //       previous.set(node, null)
  //     })
  //     distances.set(start, 0)

  //     // Enqueue the start node
  //     queue.push({ node: start, cost: 0 })

  //     while (queue.length > 0) {
  //       // Dequeue the node with the lowest cost
  //       const { node: current, cost: currentCost } = queue.shift()!

  //       // Stop if we've reached the end node
  //       if (current === end) {
  //         break
  //       }

  //       // Visit each neighbor of the current node
  //       this.adjList.get(current)?.forEach(({ node: neighbor, cost: neighborCost }) => {
  //         const newCost = currentCost + neighborCost

  //         // Update the distance and previous node if the new cost is lower
  //         if (newCost < distances.get(neighbor)!) {
  //           distances.set(neighbor, newCost)
  //           previous.set(neighbor, current)

  //           // Enqueue the neighbor with its new cost
  //           queue.push({ node: neighbor, cost: newCost })

  //           // Sort the queue by cost so that the lowest-cost node is dequeued first
  //           queue.sort((a, b) => a.cost - b.cost)
  //         }
  //       })
  //     }

  //     // Build the path from start to end by following the previous nodes
  //     const path: string[] = []
  //     let current = end
  //     while (current !== null) {
  //       path.unshift(current)
  //       current = previous.get(current)!
  //     }

  //     return path
  //   }
}

// dijkstra(start: string, end: string, maxCost: number): { path: string[], cost: number } | null {
//     const distances: Map<string, number> = new Map()
//     const previous: Map<string, string | null> = new Map()
//     const queue: NodeWithCost[] = []

//     // Initialize distances and previous nodes
//     this.adjList.forEach((neighbors, node) => {
//       distances.set(node, Infinity)
//       previous.set(node, null)
//     })
//     distances.set(start, 0)

//     // Enqueue the start node
//     queue.push({ node: start, cost: 0 })

//     while (queue.length > 0) {
//       // Dequeue the node with the lowest cost
//       const { node: current, cost: currentCost } = queue.shift()!

//       // Stop if we've reached the end node
//       if (current === end) {
//         const path: string[] = []
//         let node = end
//         while (node !== null) {
//           path.unshift(node)
//           node = previous.get(node)!
//         }
//         return { path, cost: distances.get(end)! }
//       }

//       // Visit each neighbor of the current node
//       this.adjList.get(current)?.forEach(({ node: neighbor, cost: neighborCost }) => {
//         const newCost = currentCost + neighborCost

//         // Update the distance and previous node if the new cost is lower
//         if (newCost < distances.get(neighbor)!) {
//           distances.set(neighbor, newCost)
//           previous.set(neighbor, current)

//           // Enqueue the neighbor with its new cost
//           queue.push({ node: neighbor, cost: newCost })

//           // Sort the queue by cost so that the lowest-cost node is dequeued first
//           queue.sort((a, b) => a.cost - b.cost)
//         }
//       })

//       // Stop if we've exceeded the maximum cost
//       if (currentCost >= maxCost) {
//         return null
//       }
//     }

//     // No path found
//     return null
//   }
