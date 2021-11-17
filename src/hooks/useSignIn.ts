/* eslint-disable @typescript-eslint/no-explicit-any */
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { auth } from "../firebase"

export default function useSignIn() {
  const googleProvider = new GoogleAuthProvider()

  const signInWithGoogle = async () => {
    try {
      const res = await signInWithPopup(auth, googleProvider)
      return res
      // const query = await db
      //   .collection("users")
      //   .where("uid", "==", user.uid)
      //   .get()
      // if (query.docs.length === 0) {
      //   await db.collection("users").add({
      //     uid: user.uid,
      //     name: user.displayName,
      //     authProvider: "google",
      //     email: user.email,
      //   })
      // }
    } catch (err: any) {
      console.error(err)
      alert(err.message)
    }
  }
  return { signInWithGoogle }
}
