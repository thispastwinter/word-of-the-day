import { addDoc, collection } from "firebase/firestore"
import { Collections } from "../../global/constants"
import { Comment } from "../../global/types"
import { db } from "../firebase"

const createComment = async (comment: Partial<Comment>) => {
  const docRef = await addDoc(collection(db, Collections.COMMENTS), comment)
  return docRef.id
}

export default createComment
