import {
  Query,
  collection,
  limit,
  orderBy,
  query,
  where,
} from "@firebase/firestore"
import { useFirestoreQueryData } from "@react-query-firebase/firestore"
import { Collections } from "../../global/constants"
import { Word } from "../../global/types"
import { db } from "../firebase"

export default function useGetWordOfTheWeek(groupId?: string) {
  const wordRef = collection(db, Collections.WORDS)
  const wordQuery = query(
    wordRef,
    where("groupId", "==", `${groupId}`),
    orderBy("week_of", "desc"),
    limit(1),
  ) as Query<Word>

  const { data, isLoading, error } = useFirestoreQueryData(
    ["wordByGroupId", groupId],
    wordQuery,
    { subscribe: true },
    { enabled: !!groupId },
  )

  return { data: data?.[0], isLoading, error }
}
