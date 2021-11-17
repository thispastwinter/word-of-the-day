import { AppBar, Button, CircularProgress } from "@mui/material"
import { Box } from "@mui/system"
import { Center, WordOfTheDay } from "../components"
import { auth } from "../firebase"
import { useGetWordOfTheWeek } from "../hooks"

function Home() {
  const { wordOfTheWeek, loading } = useGetWordOfTheWeek()

  return (
    <>
      <AppBar color="transparent" sx={{ boxShadow: "none" }}>
        <Box sx={{ marginLeft: "auto", paddingRight: 2 }}>
          <Button onClick={() => auth.signOut()}>Sign Out</Button>
        </Box>
      </AppBar>
      <Center fill>
        {loading ? <CircularProgress /> : <WordOfTheDay word={wordOfTheWeek} />}
      </Center>
    </>
  )
}

export default Home
