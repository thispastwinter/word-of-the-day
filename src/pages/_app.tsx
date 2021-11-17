import { CircularProgress } from "@mui/material"
import { AppProps } from "next/dist/shared/lib/router/router"
import { Center } from "../components"
import { useAuth } from "../hooks"

function App({ Component, pageProps }: AppProps) {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <Center fill>
        <CircularProgress />
      </Center>
    )
  } else {
    return <Component {...pageProps} user={user} />
  }
}

export default App
