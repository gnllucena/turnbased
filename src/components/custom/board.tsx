"use client"

import { MutableRefObject, useRef } from "react"
import Konva from "konva"
import { Layer, Stage } from "react-konva"

import { MappingProps } from "@/app/page"

import { Char, Tile } from "./tile"

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
  const containerRef = useRef<HTMLDivElement>(null!)
  const stageRef = useRef<Konva.Stage>(null!)
  const padding = 500

  return (
    <div
      ref={containerRef}
      style={{
        width: "calc(100%)",
        height: "calc(100vh)",
        overflow: "auto",
      }}
    >
      <div
        style={{
          width: `${numberOfTilesPerRow * tileSize}px`,
          height: `${numberOfRows * tileSize}px`,
          overflow: "hidden",
        }}
      >
        <Stage
          ref={stageRef}
          width={window.innerWidth + padding * 2}
          height={window.innerHeight + padding * 2}
          onWheel={() => {
            const container = containerRef.current
            const stage = stageRef.current

            const dx = container.scrollLeft - padding
            const dy = container.scrollTop - padding

            stage.container().style.transform = `translate(${dx}px, ${dy}px)`

            stage.x(-dx)
            stage.y(-dy)
          }}
          onClick={() => {
            const tile = tiles.current.get("0,0")

            // const position = tile?.ref?.getPosition()
            // const id = tile?.ref?.attrs["id"]
            // tile?.ref?.setAttrs({})

            tile?.ref?.fill(Konva.Util.getRandomColor())
          }}
        >
          <Layer>
            {Array.from(tiles.current.entries()).map(([key, value]) => (
              <>
                <Tile
                  key={key}
                  id={value.tiles.id}
                  x={value.tiles.x}
                  y={value.tiles.y}
                  size={value.tiles.size}
                  fill={value.tiles.fill}
                  borders={value.tiles.borders}
                  ref={(el) => {
                    tiles.current.set(key, { ...value, ref: el })
                  }}
                />
                <Char
                  id={value.chars.id}
                  x={value.chars.x}
                  y={value.chars.y}
                  color={value.chars.color}
                  fontSize={value.chars.fontSize}
                  text={value.chars.text}
                />
              </>
            ))}
          </Layer>
        </Stage>
      </div>
    </div>
  )
}
