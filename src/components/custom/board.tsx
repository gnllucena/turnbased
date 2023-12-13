"use client"

import { RefObject, useRef } from "react"
import * as Konva from "konva"
import { Layer, Stage } from "react-konva"

import { Tile } from "./tile"

const NUMBER_OF_ROWS = 20
const NUMBER_OF_TILES_PER_ROW = 40
const SIZE = 80
const PADDING = 500
const PAGE_HEIGHT = NUMBER_OF_ROWS * SIZE + PADDING
const PAGE_WIDTH = NUMBER_OF_TILES_PER_ROW * SIZE + PADDING

function getRows() {
  const rows = []

  for (let i = 0; i < NUMBER_OF_ROWS; i++) {
    rows.push(getTiles(i))
  }

  return rows
}

function getTiles(rowNumber: number) {
  const tiles = []

  for (let i = 0; i < NUMBER_OF_TILES_PER_ROW; i++) {
    tiles.push(
      <Tile
        key={`${rowNumber}${i}`}
        x={i * SIZE}
        y={rowNumber * SIZE}
        size={SIZE}
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

export function Board() {
  const container = useRef<HTMLDivElement>(null)
  const stage = useRef<Konva.default.Stage>(null)

  return (
    <div ref={container} style={{ maxHeight: "10px" }}>
      <Stage
        ref={stage}
        width={PAGE_WIDTH}
        height={PAGE_HEIGHT}
        onWheel={() => onWheel(container, stage)}
      >
        <Layer>{getRows()}</Layer>
      </Stage>
    </div>
  )
}
