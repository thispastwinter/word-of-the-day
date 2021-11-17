import { collection, getDocs, query, where } from "firebase/firestore"
import { Collections } from "../../global/constants"
import { Group } from "../../global/types"
import { db } from "../firebase"

const getWordOfTheWeek = async (groupId: string) => {
  const groupRef = collection(db, Collections.GROUPS)
  const groupQuery = query(groupRef, where("id", "==", `${groupId}`))
  const data = await getDocs(groupQuery)
  const group = data?.docs?.[0]?.data() as Group | undefined
  return group
}

export default getWordOfTheWeek
