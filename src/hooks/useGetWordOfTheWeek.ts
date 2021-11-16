import { useEffect, useState } from "react"
import { Word } from "../../global/types"
import { getWordOfTheWeek } from "../api"

export default function useGetWordOfTheWeek() {
  const [loading, setLoading] = useState(true)
  const [wordOfTheWeek, setWordOfTheWeek] = useState<Word | undefined>()

  useEffect(() => {
    getWordOfTheWeek().then((wordOfTheWeek) => {
      setWordOfTheWeek(wordOfTheWeek)
      setLoading(false)
    })
  }, [])

  return { wordOfTheWeek, loading }
}
