import { CircularProgress, ThemeProvider, createTheme } from "@mui/material"
import { AppProps } from "next/dist/shared/lib/router/router"
import { QueryClient, QueryClientProvider } from "react-query"
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

const client = new QueryClient()

function App({ Component, pageProps }: AppProps) {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <Center fill>
        <CircularProgress style={{ color: colors.darkBlueSky }} />
      </Center>
    )
  } else {
    return (
      <QueryClientProvider client={client}>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} user={user} />
        </ThemeProvider>
      </QueryClientProvider>
    )
  }
}

export default App
