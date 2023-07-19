"use client"

import { forwardRef } from "react"
import * as Konva from "konva"
import { Rect } from "react-konva"

export interface TileProps {
  x: number
  y: number
  size: number
}

export const Tile = forwardRef<Konva.default.Rect, TileProps>(
  ({ x, y, size }, ref) => {
    return (
      <Rect
        x={x}
        y={y}
        width={size}
        height={size}
        fill={Konva.default.Util.getRandomColor()}
        stroke="black"
        strokeWidth={2}
        ref={ref}
      />
    )
  }
)

Tile.displayName = "Tile"
