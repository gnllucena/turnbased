"use client"

import { useRef } from "react"
import dynamic from "next/dynamic"
import Konva from "konva"

import { Board as BoardType, Tiles } from "../components/custom/board"

const Board = dynamic(
  () => import("../components/custom/board").then(({ Board }) => Board),
  {
    ssr: false,
  }
) as typeof BoardType

export default function Page() {
  const numberOfTilesPerRow = 30
  const numberOfRows = 20
  const tileSize = 80
  const padding = 500
  const mapping = useRef<Tiles>(null!)

  const fill = Konva.Util.getRandomColor()
  const stroke = Konva.Util.getRandomColor()
  const char = Konva.Util.getRandomColor()

  for (let x = 0; x < numberOfTilesPerRow; x++) {
    for (let y = 0; y < numberOfRows; y++) {
      const id = `${x},${y}`

      mapping.current.set(id, {
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
        tiles={mapping}
        padding={padding}
      />
    </>
  )
}
