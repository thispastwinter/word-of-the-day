import { collection, onSnapshot, query, where } from "@firebase/firestore"
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { Collections } from "../../global/constants"
import { auth, db } from "../firebase"

export default function useSignIn() {
  const googleProvider = new GoogleAuthProvider()

  const usersRef = collection(db, Collections.USERS)

  const signInWithGoogle = async () => {
    try {
      const userCredential = await signInWithPopup(auth, googleProvider)

      const userDocRef = query(
        usersRef,
        where("userId", "==", `${userCredential.user.uid}`),
      )

      await new Promise((resolve, reject) => {
        const unsubscribe = onSnapshot(userDocRef, {
          next: (snapshot) => {
            unsubscribe()
            resolve(snapshot.docs[0].data())
          },
          error: (error) => {
            unsubscribe()
            reject(error)
          },
        })
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(err)
      alert(err.message)
    }
  }

  return { signInWithGoogle }
}
