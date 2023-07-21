"use client"

import { forwardRef } from "react"
import Konva from "konva"
import { Rect, Text } from "react-konva"

export interface TileProps {
  id: string
  x: number
  y: number
  fill: string
  stroke: string
  size: number
  text: string
}

export const Tile = forwardRef<Konva.Rect, TileProps>(
  ({ id, x, y, fill, stroke, size, text }, ref) => {
    return (
      <>
        <Rect
          id={id}
          x={x}
          y={y}
          width={size}
          height={size}
          fill={fill}
          stroke={stroke}
          strokeWidth={2}
          onMouseEnter={(e) => {
            //todo: fix. not working
            const target = e.target
            const stage = target.getStage()

            if (stage === null) return

            const color = Konva.Util.getRandomColor()

            stage.container().style.backgroundColor = color
          }}
          ref={ref}
        />
        <Text text={id} fontSize={25} fill={text} x={x} y={y} />
      </>
    )
  }
)

Tile.displayName = "Tile"
