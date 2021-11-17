import { collection, getDocs, limit, orderBy, query } from "firebase/firestore"
import { Word } from "../../global/types"
import { db } from "../firebase"

const getWordOfTheWeek = async () => {
  const wordRef = collection(db, "words")
  const q = query(wordRef, orderBy("week_of", "desc"), limit(1))
  const data = await getDocs(q)
  const wordOfTheWeek = (data?.docs?.[0]?.data() || undefined) as
    | Word
    | undefined
  return wordOfTheWeek
}

export default getWordOfTheWeek
