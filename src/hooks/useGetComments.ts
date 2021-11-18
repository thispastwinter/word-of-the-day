import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "@firebase/firestore"
import { useEffect, useState } from "react"
import { Collections } from "../../global/constants"
import { Comment } from "../../global/types"
import { db } from "../firebase"

export default function useGetComments(wordId: string, groupId: string) {
  const [loading, setLoading] = useState(true)
  const [comments, setComments] = useState<Comment[] | undefined>()

  console.log(comments)

  useEffect(() => {
    const commentsRef = collection(db, Collections.COMMENTS)
    const commentsQuery = query(
      commentsRef,
      where("wordId", "==", `${wordId}`),
      where("groupId", "==", `${groupId}`),
      orderBy("createdAt", "desc"),
    )

    const unsubscribe = onSnapshot(commentsQuery, (querySnapshot) => {
      const comments: Comment[] = []
      querySnapshot?.docs?.forEach((doc) => {
        comments.push(doc.data() as Comment)
      })
      setComments(comments)
      setLoading(false)
    })
    return () => unsubscribe()
  }, [wordId, groupId])

  return { comments, loading }
}
