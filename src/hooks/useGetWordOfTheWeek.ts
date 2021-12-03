import {
  Query,
  collection,
  limit,
  orderBy,
  query,
  where,
} from "@firebase/firestore"
import { useFirestoreQueryData } from "@react-query-firebase/firestore"
import { useEffect } from "react"
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

  const { data, isLoading, error, refetch } = useFirestoreQueryData(
    ["word"],
    wordQuery,
    undefined,
    { enabled: !!groupId },
  )

  useEffect(() => {
    if (groupId) refetch()
  }, [groupId, refetch])

  return { data: data?.[0], isLoading, error }
}
