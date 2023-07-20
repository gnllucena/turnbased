"use client"

import { MutableRefObject, useRef } from "react"
import * as Konva from "konva"
import { Layer, Stage } from "react-konva"

import { MappingProps } from "@/app/page"

import { Tile } from "./tile"

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

  const PADDING = 500
  const WIDTH = 3000
  const HEIGHT = 3000

  return (
    <div
      id="scroll-container"
      ref={containerRef}
      style={{
        width: "calc(100%)",
        height: "calc(100vh)",
        overflow: "auto",
        border: "1px solid grey",
      }}
    >
      <div
        id="large-container"
        style={{
          width: `${WIDTH}px`,
          height: `${HEIGHT}px`,
          overflow: "hidden",
        }}
      >
        <Stage
          ref={stageRef}
          width={window.innerWidth + PADDING * 2}
          height={window.innerHeight + PADDING * 2}
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

            // change camera on turn start
            // const position = tile?.ref?.getPosition()

            // get id to get props on map
            // console.log(tile?.ref?.attrs["id"])

            tile?.ref?.fill(Konva.default.Util.getRandomColor())
          }}
        >
          <Layer>
            {Array.from(tiles.current.entries()).map(([key, value], index) => (
              <Tile
                key={key}
                id={value.props.id}
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
    </div>
  )
}
