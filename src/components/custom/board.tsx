"use client"

import { MutableRefObject, useRef } from "react"
import Konva from "konva"
import { Rect } from "konva/lib/shapes/Rect"
import { Layer, Stage } from "react-konva"

import { CharOnCanvas, Tile, TileOnCanvas } from "./objects"

type Tiles = Map<string, TilesProps>

export type tiles = MutableRefObject<Map<string, TilesProps>>

export interface TilesProps {
  tiles: TileOnCanvas
  chars: CharOnCanvas
  edges: Set<string>
  ref: Rect | null
}

interface BoardProps {
  numberOfTilesPerRow: number
  numberOfRows: number
  square: number
  padding: number
  tiles: MutableRefObject<Tiles>
}

export function Board({
  numberOfTilesPerRow,
  numberOfRows,
  square,
  padding,
  tiles,
}: BoardProps) {
  const containerRef = useRef<HTMLDivElement>(null!)
  const stageRef = useRef<Konva.Stage>(null!)

  function print(tiles: MutableRefObject<Tiles>) {
    const tile = tiles.current.get("0,0")

    // const position = tile?.ref?.getPosition()
    // const id = tile?.ref?.attrs["id"]
    // tile?.ref?.setAttrs({})

    tile?.ref?.fill(Konva.Util.getRandomColor())
  }

  function scrollCanvas(
    containerRef: MutableRefObject<HTMLDivElement>,
    stageRef: MutableRefObject<Konva.Stage>,
    padding: number
  ) {
    const container = containerRef.current
    const stage = stageRef.current

    const dx = container.scrollLeft - padding
    const dy = container.scrollTop - padding

    stage.container().style.transform = `translate(${dx}px, ${dy}px)`

    stage.x(-dx)
    stage.y(-dy)
  }

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
          width: `${numberOfTilesPerRow * square}px`,
          height: `${numberOfRows * square}px`,
          overflow: "hidden",
        }}
      >
        <Stage
          ref={stageRef}
          width={window.innerWidth + padding * 2}
          height={window.innerHeight + padding * 2}
          onWheel={() => scrollCanvas(containerRef, stageRef, padding)}
          onClick={() => print(tiles)}
        >
          <Layer>
            {/* <Char key={key} {...value.chars} /> */}
            {Array.from(tiles.current.entries()).map(([key, value]) => (
              <Tile
                key={key}
                {...value.tiles}
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
