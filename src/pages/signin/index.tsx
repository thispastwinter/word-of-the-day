import { Box } from "@mui/system"
import Image from "next/image"
import googleSignIn from "../../assets/googleSignIn.svg"
import { Center } from "../../components"
import useSignIn from "../../hooks/useSignIn"

export default function SignIn() {
  const { signInWithGoogle } = useSignIn()

  return (
    <Center fill>
      <Box sx={{ cursor: "pointer" }} onClick={signInWithGoogle}>
        <Image src={googleSignIn} height="68" width="347" />
      </Box>
    </Center>
  )
}
