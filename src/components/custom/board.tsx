"use client"

import { RefObject, useRef } from "react"
import * as Konva from "konva"
import { Layer, Stage } from "react-konva"

import { Tile } from "./tile"

const PADDING = 500

function getRows(
  numberOfRows: number,
  numberOfTilesPerRow: number,
  tileSize: number
) {
  const rows = []

  for (let i = 0; i < numberOfRows; i++) {
    rows.push(getTiles(i, numberOfTilesPerRow, tileSize))
  }

  return rows
}

function getTiles(
  rowNumber: number,
  numberOfTilesPerRow: number,
  tileSize: number
) {
  const tiles = []

  for (let i = 0; i < numberOfTilesPerRow; i++) {
    tiles.push(
      <Tile
        key={`${rowNumber}${i}`}
        x={i * tileSize}
        y={rowNumber * tileSize}
        size={tileSize}
      />
    )
  }

  return tiles
}

function onWheel(
  containerRef: RefObject<HTMLDivElement>,
  stageRef: RefObject<Konva.default.Stage>
) {
  const container = containerRef.current
  const stage = stageRef.current

  if (container === null || stage === null) return

  const dx = container.scrollLeft - PADDING
  const dy = container.scrollTop - PADDING

  stage.container().style.transform = `translate(${dx}px, ${dy}px)`

  stage.x(-dx)
  stage.y(-dy)
}

interface BoardProps {
  numberOfTilesPerRow: number
  numberOfRows: number
  tileSize: number
}

export function Board({
  numberOfTilesPerRow,
  numberOfRows,
  tileSize,
}: BoardProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<Konva.default.Stage>(null)

  return (
    <div ref={containerRef} style={{ maxHeight: "10px" }}>
      <Stage
        ref={stageRef}
        width={numberOfRows * tileSize + PADDING}
        height={numberOfTilesPerRow * tileSize + PADDING}
        onWheel={() => onWheel(containerRef, stageRef)}
      >
        <Layer>{getRows(numberOfRows, numberOfTilesPerRow, tileSize)}</Layer>
      </Stage>
    </div>
  )
}
