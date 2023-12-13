"use client"

import { MutableRefObject, useRef } from "react"
import * as Konva from "konva"
import { Layer, Stage } from "react-konva"

import { MappingProps } from "@/app/page"

import { Tile } from "./tile"

const PADDING = 500

interface BoardProps {
  numberOfTilesPerRow: number
  numberOfRows: number
  tileSize: number
  tiles: MutableRefObject<Map<string, MappingProps>>
}

export function Board({
  numberOfTilesPerRow,
  numberOfRows,
  tileSize,
  tiles,
}: BoardProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<Konva.default.Stage>(null)

  return (
    <div ref={containerRef} style={{ maxHeight: "10px" }}>
      <Stage
        ref={stageRef}
        width={numberOfRows * tileSize + PADDING}
        height={numberOfTilesPerRow * tileSize + PADDING}
        onWheel={() => {
          const container = containerRef.current
          const stage = stageRef.current

          if (container === null || stage === null) return

          const dx = container.scrollLeft - PADDING
          const dy = container.scrollTop - PADDING

          stage.container().style.transform = `translate(${dx}px, ${dy}px)`

          stage.x(-dx)
          stage.y(-dy)
        }}
        onClick={() => {
          const tile = tiles.current.get("0,0")

          tile?.ref?.fill(Konva.default.Util.getRandomColor())
        }}
      >
        <Layer>
          {Array.from(tiles.current.entries()).map(([key, value], index) => (
            <Tile
              key={key}
              x={value.props.x}
              y={value.props.y}
              size={value.props.size}
              ref={(el) => {
                tiles.current.set(key, { ...value, ref: el })
              }}
            />
          ))}
        </Layer>
      </Stage>
    </div>
  )
}
