import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
  where,
} from "@firebase/firestore"
import { useEffect, useState } from "react"
import { Collections } from "../../global/constants"
import { Word } from "../../global/types"
import { db } from "../firebase"

export default function useGetWordOfTheWeek(groupId: string) {
  const [loading, setLoading] = useState(false)
  const [wordOfTheWeek, setWordOfTheWeek] = useState<Word | undefined>()

  useEffect(() => {
    setLoading(true)
    const wordRef = collection(db, Collections.WORDS)
    const wordQuery = query(
      wordRef,
      where("groupId", "==", `${groupId}`),
      orderBy("week_of", "desc"),
      limit(1),
    )
    const unsubscribe = onSnapshot(wordQuery, (querySnapshot) => {
      setWordOfTheWeek(querySnapshot?.docs?.[0].data() as Word | undefined)
      setLoading(false)
    })
    return () => unsubscribe()
  }, [groupId])

  return { wordOfTheWeek, loading, setLoading }
}
