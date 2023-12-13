import React from "react"

function useDimensions(padding: number) {
  const [size, setSize] = React.useState({ width: 0, height: 0 })

  React.useEffect(
    function resizeCanvas() {
      function handleResize() {
        setSize({
          width: window.innerWidth + padding * 2,
          height: window.innerHeight + padding * 2,
        })
      }

      window.addEventListener("resize", handleResize)
      handleResize()

      return () => window.removeEventListener("resize", handleResize)
    },
    [padding]
  )

  return size
}

export default useDimensions
