import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore"
import { Collections } from "../../global/constants"
import { Word } from "../../global/types"
import { db } from "../firebase"

const getWordOfTheWeek = async (groupId: string) => {
  const wordRef = collection(db, Collections.WORDS)
  const wordQuery = query(
    wordRef,
    where("groupId", "==", `${groupId}`),
    orderBy("week_of", "desc"),
    limit(1),
  )
  const data = await getDocs(wordQuery)
  const wordOfTheWeek = (data?.docs?.[0]?.data() || undefined) as
    | Word
    | undefined
  return wordOfTheWeek
}

export default getWordOfTheWeek
