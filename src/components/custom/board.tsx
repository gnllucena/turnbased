"use client"

import { Layer, Stage } from "react-konva"

import { Tile } from "./tile"

function getTileRow(rowNumber: number) {
  const tiles = []
  const numberOfTiles = 10
  const size = 50

  for (let i = 0; i < numberOfTiles; i++) {
    tiles.push(<Tile x={i * size} y={rowNumber * 50} size={size} />)
  }

  return tiles
}

export function Board() {
  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>{getTileRow(1)}</Layer>
    </Stage>
  )
}
