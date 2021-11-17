import { useEffect, useState } from "react"
import { Group } from "../../global/types"
import { getGroupById } from "../api"

export default function useGetGroupById(groupId: string) {
  const [loading, setLoading] = useState(true)
  const [group, setGroup] = useState<Group | undefined>()

  useEffect(() => {
    getGroupById(groupId).then((group) => {
      setGroup(group)
      setLoading(false)
    })
  }, [groupId])

  return { group, loading }
}
