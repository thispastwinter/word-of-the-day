import { useEffect, useState } from "react"
import { Group } from "../../global/types"
import { getGroupsByIds } from "../api"

export default function useGetGroupsByIds(groupIds: string[]) {
  const [loading, setLoading] = useState(true)
  const [groups, setGroups] = useState<Group[] | undefined>()

  useEffect(() => {
    if (groupIds.length) {
      getGroupsByIds(groupIds).then((groups) => {
        setGroups(groups)
        setLoading(false)
      })
    }
  }, [groupIds])

  return { groups, loading }
}
