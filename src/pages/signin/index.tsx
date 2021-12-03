import { User } from "@firebase/auth"
import { Box } from "@mui/system"
import Image from "next/image"
import { UserPartial } from "../../../global/types"
import googleSignIn from "../../assets/googleSignIn.svg"
import { Center, Redirect } from "../../components"
import { useSignIn } from "../../hooks"

interface Props {
  user: User & UserPartial
}

export default function SignIn({ user }: Props) {
  const { signInWithGoogle } = useSignIn()

  if (user) {
    return <Redirect to="/" />
  }

  return (
    <Center fill>
      <Box sx={{ cursor: "pointer" }} onClick={signInWithGoogle}>
        <Image src={googleSignIn} height="68" width="347" />
      </Box>
    </Center>
  )
}
