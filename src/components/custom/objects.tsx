"use client"

import { forwardRef } from "react"
import Konva from "konva"
import { Rect, Text } from "react-konva"

export interface ObjectOnCanvas {
  id: string
  x: number
  y: number
}

export interface CharOnCanvas extends ObjectOnCanvas {
  text: string
  color: string
}

export interface TileOnCanvas extends ObjectOnCanvas {
  fill: string
  borders: string
  size: number
}

export const Char = forwardRef<Konva.Text, CharOnCanvas>((props, ref) => {
  const padding = 10

  return (
    <Text
      text={props.id}
      fontSize={25}
      fill={props.text}
      x={props.x + padding}
      y={props.y + padding}
      ref={ref}
    />
  )
})

Char.displayName = "Char"

export const Tile = forwardRef<Konva.Rect, TileOnCanvas>((props, ref) => {
  return (
    <Rect
      id={props.id}
      x={props.x}
      y={props.y}
      width={props.size}
      height={props.size}
      fill={props.fill}
      stroke={props.borders}
      strokeWidth={10}
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
  )
})

Tile.displayName = "Tile"
