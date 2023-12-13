"use client"

import dynamic, { DynamicOptions } from "next/dynamic"

import { Board } from "../components/custom/board"

const Component = dynamic<React.ReactNode>(
  () => import("../components/custom/board").then(({ Board }) => Board as any),
  {
    ssr: false,
  }
) as typeof Board

export default function Page() {
  return <Component />
}
