"use client"

import { RefObject, useEffect, useRef } from "react"
import * as Konva from "konva"
import { Layer, Stage } from "react-konva"

import { Tile } from "./tile"
import useDimensions from "./use-dimension"

const NUMBER_OF_ROWS = 20
const NUMBER_OF_TILES_PER_ROW = 30
const SIZE = 80
const PADDING = 500
const WIDTH = 2500
const HEIGHT = 60000

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
  container: RefObject<HTMLDivElement>,
  stage: RefObject<Konva.default.Stage>
) {
  const scrollContainer = container.current
  const canvasStage = stage.current

  if (scrollContainer === null || canvasStage === null) return

  const dx = scrollContainer.scrollLeft - PADDING
  const dy = scrollContainer.scrollTop - PADDING
  console.log("move stage", dx, dy)

  canvasStage.container().style.transform = `translate(${dx}px, ${dy}px)`

  canvasStage.x(-dx)
  canvasStage.y(-dy)
  canvasStage.batchDraw()
}

export function Board() {
  const container = useRef<HTMLDivElement>(null)
  const stage = useRef<Konva.default.Stage>(null)

  container.current

  const size = useDimensions(PADDING)

  return (
    <div id="scroll-container" ref={container}>
      <div
        id="large-container"
        style={{ width: WIDTH, height: (HEIGHT + PADDING) * 2 }}
      >
        <div id="container">
          <Stage
            ref={stage}
            width={size.width}
            height={size.height}
            onWheel={() => onWheel(container, stage)}
          >
            <Layer>{getRows()}</Layer>
          </Stage>
        </div>
      </div>
    </div>
  )
}
