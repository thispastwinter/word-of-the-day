import { CircularProgress, ThemeProvider, createTheme } from "@mui/material"
import { AppProps } from "next/dist/shared/lib/router/router"
import { Center } from "../components"
import { useAuth } from "../hooks"
import { colors } from "../theme"

const theme = createTheme({
  shape: {
    borderRadius: "16px",
  },
  palette: {
    primary: {
      main: colors.darkBlueSky,
    },
    common: {
      black: colors.richBlack,
    },
  },
})

function App({ Component, pageProps }: AppProps) {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <Center fill>
        <CircularProgress />
      </Center>
    )
  } else {
    return (
      <ThemeProvider theme={theme}>
        <Component {...pageProps} user={user} />
      </ThemeProvider>
    )
  }
}

export default App
