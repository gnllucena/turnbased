"use client"

import { useRef } from "react"
import dynamic from "next/dynamic"
import { Rect } from "konva/lib/shapes/Rect"

import { TileProps } from "@/components/custom/tile"

import { Board as BoardType } from "../components/custom/board"

const Board = dynamic(
  () => import("../components/custom/board").then(({ Board }) => Board),
  {
    ssr: false,
  }
) as typeof BoardType

export interface MappingProps {
  props: TileProps
  edges: Set<string>
  ref: Rect | null
}

export default function Page() {
  const numberOfTilesPerRow = 80
  const numberOfRows = 80
  const tileSize = 80
  const tiles = useRef(new Map<string, MappingProps>())

  for (let x = 0; x < numberOfRows; x++) {
    for (let y = 0; y < numberOfTilesPerRow; y++) {
      const id = `${x},${y}`

      tiles.current.set(id, {
        props: {
          id: id,
          x: x * tileSize,
          y: y * tileSize,
          size: tileSize,
        },
        edges: new Set(),
        ref: null,
      })
    }
  }

  return (
    <Board
      numberOfRows={numberOfRows}
      numberOfTilesPerRow={numberOfTilesPerRow}
      tileSize={tileSize}
      tiles={tiles}
    />
  )
}
