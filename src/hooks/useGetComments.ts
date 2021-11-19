import { Query, collection, orderBy, query, where } from "@firebase/firestore"
import { useCollectionData } from "react-firebase-hooks/firestore"
import { Collections } from "../../global/constants"
import { Comment } from "../../global/types"
import { db } from "../firebase"

export default function useGetComments(wordId: string, groupId: string) {
  const commentsRef = collection(db, Collections.COMMENTS)
  const commentsQuery = query(
    commentsRef,
    where("wordId", "==", `${wordId}`),
    where("groupId", "==", `${groupId}`),
    orderBy("createdAt", "desc"),
  ) as Query<Comment>

  const [data, loading, error] = useCollectionData(commentsQuery, {
    idField: "id",
  })

  return { data, loading, error }
}
