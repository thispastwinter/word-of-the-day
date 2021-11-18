import { collection, getDocs, orderBy, query, where } from "firebase/firestore"
import { Collections } from "../../global/constants"
import { Comment } from "../../global/types"
import { db } from "../firebase"

const getComments = async (wordId: string, groupId: string) => {
  const comments: Comment[] = []
  const commentsRef = collection(db, Collections.COMMENTS)
  const commentsQuery = query(
    commentsRef,
    where("wordId", "==", `${wordId}`),
    where("groupId", "==", `${groupId}`),
    orderBy("createdAt", "desc"),
  )
  const data = await getDocs(commentsQuery)
  data?.docs?.forEach((doc) => {
    comments.push(doc.data() as Comment)
  })
  return comments
}

export default getComments
