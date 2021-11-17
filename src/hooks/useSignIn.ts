/* eslint-disable @typescript-eslint/no-explicit-any */
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { auth } from "../firebase"

export default function useSignIn() {
  const googleProvider = new GoogleAuthProvider()

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider)
    } catch (err: any) {
      console.error(err)
      alert(err.message)
    }
  }

  return { signInWithGoogle }
}
