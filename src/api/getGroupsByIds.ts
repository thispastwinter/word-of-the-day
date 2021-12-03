import { collection, getDocs, query, where } from "firebase/firestore"
import { Collections } from "../../global/constants"
import { Group } from "../../global/types"
import { db } from "../firebase"

const getGroupsByIds = async (groupIds: string[]) => {
  const groups: Group[] = []

  const groupRef = collection(db, Collections.GROUPS)
  const groupQuery = query(groupRef, where("id", "in", groupIds))
  const data = await getDocs(groupQuery)
  data?.docs?.forEach((doc) => {
    groups.push(doc.data() as Group)
  })

  return groups
}

export default getGroupsByIds
