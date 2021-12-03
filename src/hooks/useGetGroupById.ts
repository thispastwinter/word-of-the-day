import { DocumentReference, doc } from "@firebase/firestore"
import { useFirestoreDocument } from "@react-query-firebase/firestore"
import { Collections } from "../../global/constants"
import { Group } from "../../global/types"
import { db } from "../firebase"

export default function useGetGroupById(groupId: string) {
  let ref: DocumentReference<Group>

  if (groupId) {
    ref = doc(db, Collections.GROUPS, groupId) as DocumentReference<Group>
  } else {
    ref = doc(db, Collections.GROUPS, "empty") as DocumentReference<Group>
  }

  const { data, isLoading, error } = useFirestoreDocument<Group>(
    ["groupById", groupId],
    ref,
    undefined,
    {
      enabled: !!groupId,
    },
  )

  return { data: data?.data(), isLoading, error }
}
