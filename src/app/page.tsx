"use client"

import dynamic from "next/dynamic"

import { Board as BoardType } from "../components/custom/board"

const Board = dynamic(
  () => import("../components/custom/board").then(({ Board }) => Board),
  {
    ssr: false,
  }
) as typeof BoardType

export default function Page() {
  return <Board numberOfRows={80} numberOfTilesPerRow={80} tileSize={80} />
}
