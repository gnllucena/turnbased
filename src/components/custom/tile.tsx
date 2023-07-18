"use client"

// import { useState } from "react"
import { FC, forwardRef } from "react"
import Konva from "konva"
import { Group, Rect } from "react-konva"

// import { Rect } from "react-konva"

// interface TileProps {
//   x: number
//   y: number
//   size: number
// }

// export function Tile({ x, y, size }: TileProps) {
//   const [color, setColor] = useState(Konva.Util.getRandomColor())

//   const handleClick = () => {
//     setColor(Konva.Util.getRandomColor())
//   }

//   return (
//     <Rect
//       x={x}
//       y={y}
//       width={size}
//       height={size}
//       fill={color}
//       //   shadowBlur={5}
//       onClick={handleClick}
//     />
//   )
// }

interface TileProps {
  x: number
  y: number
  size: number
}

export const Tile: FC<TileProps> = forwardRef(({ x, y, size }, ref) => {
  return (
    <Rect
      x={x}
      y={y}
      width={size}
      height={size}
      fill={Konva.Util.getRandomColor()}
      stroke="black"
      strokeWidth={2}
      //@ts-ignore
      ref={ref}
    />
  )
})

Tile.displayName = "Tile"
