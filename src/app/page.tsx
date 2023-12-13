"use client"

import {
  ForwardRefExoticComponent,
  MutableRefObject,
  RefAttributes,
  useRef,
} from "react"
import dynamic from "next/dynamic"
import * as Konva from "konva"
import { Rect } from "konva/lib/shapes/Rect"

import { Tile, TileProps } from "@/components/custom/tile"

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
      tiles.current.set(`${x},${y}`, {
        props: {
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
