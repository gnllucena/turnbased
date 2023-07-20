"use client"

import { forwardRef } from "react"
import * as Konva from "konva"
import { Rect, Text } from "react-konva"

export interface TileProps {
  id: string
  x: number
  y: number
  size: number
}

export const Tile = forwardRef<Konva.default.Rect, TileProps>(
  ({ id, x, y, size }, ref) => {
    return (
      <>
        <Rect
          id={id}
          x={x}
          y={y}
          width={size}
          height={size}
          fill={Konva.default.Util.getRandomColor()}
          stroke="black"
          strokeWidth={2}
          ref={ref}
        ></Rect>
        <Text text={id} fontSize={40} fill="#FFF" x={x} y={y} />
      </>
    )
  }
)

Tile.displayName = "Tile"
