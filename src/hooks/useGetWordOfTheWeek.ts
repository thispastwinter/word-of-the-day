import {
  Query,
  collection,
  limit,
  orderBy,
  query,
  where,
} from "@firebase/firestore"
import { useCollectionData } from "react-firebase-hooks/firestore"
import { Collections } from "../../global/constants"
import { Word } from "../../global/types"
import { db } from "../firebase"

export default function useGetWordOfTheWeek(groupId: string) {
  const wordRef = collection(db, Collections.WORDS)
  const wordQuery = query(
    wordRef,
    where("groupId", "==", `${groupId}`),
    orderBy("week_of", "desc"),
    limit(1),
  ) as Query<Word>

  const [data, loading, error] = useCollectionData(wordQuery, {
    idField: "id",
  })

  return { data: data?.[0], loading, error }
}
