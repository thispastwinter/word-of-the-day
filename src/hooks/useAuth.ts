import { User } from "@firebase/auth"
import { Query, collection, query, where } from "@firebase/firestore"
import { useEffect, useState } from "react"
import { useCollectionData } from "react-firebase-hooks/firestore"
import { Collections } from "../../global/constants"
import { UserPartial } from "../../global/types"
import { auth, db } from "../firebase"

export default function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [authLoading, setAuthLoading] = useState(true)

  const usersRef = collection(db, Collections.USERS)
  const userQuery = query(
    usersRef,
    where("userId", "==", `${user?.uid}`),
  ) as Query<UserPartial>

  const [userPartial, userLoading] = useCollectionData(userQuery, {
    idField: "id",
  })

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser)
        setAuthLoading(false)
      } else {
        setUser(null)
        setAuthLoading(false)
      }
    })
    return unsubscribe
  }, [])

  const loading = authLoading || userLoading

  return { user: user ? { ...user, ...userPartial?.[0] } : null, loading }
}
