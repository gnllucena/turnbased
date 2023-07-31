"use client"

import { MutableRefObject, useRef } from "react"
import dynamic from "next/dynamic"
import Konva from "konva"
import { Rect } from "konva/lib/shapes/Rect"

import { Board as BoardType } from "../components/custom/board"

const Board = dynamic(
  () => import("../components/custom/board").then(({ Board }) => Board),
  {
    ssr: false,
  }
) as typeof BoardType

export interface CharProps {
  id: string
  x: number
  y: number
  text: string
  color: string
  fontSize: number
}

export interface TileProps {
  id: string
  x: number
  y: number
  fill: string
  borders: string
  size: number
} // extends TileExtensionProps

// interface TileExtensionProps {
//   win: string
// }

export interface MappingProps {
  tiles: TileProps
  chars: CharProps
  edges: Set<string>
  ref: Rect | null
}

export type tiles = MutableRefObject<Map<string, MappingProps>>

export default function Page() {
  const numberOfTilesPerRow = 40
  const numberOfRows = 70
  const tileSize = 80
  const padding = 500
  const tiles = useRef(new Map<string, MappingProps>())

  const fill = Konva.Util.getRandomColor()
  const stroke = Konva.Util.getRandomColor()
  const char = Konva.Util.getRandomColor()

  for (let x = 0; x < numberOfTilesPerRow; x++) {
    for (let y = 0; y < numberOfRows; y++) {
      const id = `${x},${y}`

      tiles.current.set(id, {
        tiles: {
          id: id,
          x: x * tileSize,
          y: y * tileSize,
          size: tileSize,
          fill: fill,
          borders: stroke,
        },
        chars: {
          id: id,
          x: x * tileSize,
          y: y * tileSize,
          color: char,
          fontSize: 25,
          text: "O-|=<",
        },
        edges: new Set(),
        ref: null,
      })
    }
  }

  return (
    <>
      {/* Create feature flags to enable progres */}
      {/* <LayerPlayerActions /> */}
      {/* <LayerDungeonMasterActions /> */}
      {/* <LayerCTB /> */}
      {/* <LayerParty /> -> for party-only effects */}
      {/* <LayerEnemies /> -> for only-enemy efects */}
      {/* <LayerCommandCenter /> */}
      {/* <LayerDelimeters /> */}
      {/* <LayerImage /> */}

      <Board
        numberOfRows={numberOfRows}
        numberOfTilesPerRow={numberOfTilesPerRow}
        tileSize={tileSize}
        tiles={tiles}
        padding={padding}
      />
    </>
  )
}
