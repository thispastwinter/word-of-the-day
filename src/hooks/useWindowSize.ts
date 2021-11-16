import { useEffect, useState } from "react"

interface WindowSize {
  width?: number
  height?: number
}

function useWindowSize() {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: undefined,
    height: undefined,
  })

  function handleResize() {
    // Set window width/height to state
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    })
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize)
      handleResize()
      return () => window.removeEventListener("resize", handleResize)
    } else {
      return
    }
  }, [])

  return { height: windowSize.height, width: windowSize.width }
}

export default useWindowSize
