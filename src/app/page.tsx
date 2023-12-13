"use client"

import dynamic from "next/dynamic"

import { Board as BoardType } from "../components/custom/board"

const Board = dynamic<React.ReactNode>(
  () => import("../components/custom/board").then(({ Board }) => Board),
  {
    ssr: false,
  }
) as typeof BoardType

export default function Page() {
  return <Board />
}
