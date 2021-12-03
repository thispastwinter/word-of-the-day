/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from "next/dist/client/router"
import { useEffect } from "react"
import { Pages } from "../types"

interface Props {
  to: Pages
}

export default function Redirect({ to }: Props) {
  const { push } = useRouter()

  useEffect(() => {
    push(to)
  }, [])

  return null
}
