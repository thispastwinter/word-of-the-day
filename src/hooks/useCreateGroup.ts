import { User } from "@firebase/auth"
import { Collections } from "../../global/constants"
import { Group, UserPartial, Word } from "../../global/types"
import { useFirestoreMutation } from "."

interface Args {
  user: User & UserPartial
  groupName: string
  word?: Word
  onCompleted: () => void
}

export default function useCreateGroup({
  user,
  groupName,
  word,
  onCompleted,
}: Args) {
  const [updateUser] = useFirestoreMutation<Partial<UserPartial>>()

  const [createWordForGroup] = useFirestoreMutation<Partial<Word>>()

  const [createGroup] = useFirestoreMutation<Partial<Group>>({
    collection: Collections.GROUPS,
    data: { name: groupName },
    options: {
      automaticallySetId: true,
      onCompleted: (doc) => {
        if (doc?.id && user.id) {
          console.log(user.id)
          updateUser({
            collection: Collections.USERS,
            docId: user.id,
            data: {
              groups: { ...user.groups, [doc.id]: groupName },
              isAdmin: true,
            },
          })
          createWordForGroup({
            collection: Collections.WORDS,
            data: { ...word, groupId: doc.id },
            options: {
              automaticallySetId: true,
              onCompleted,
            },
          })
        }
      },
    },
  })
  return { createGroup }
}
