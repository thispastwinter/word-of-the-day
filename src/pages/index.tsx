import { Button, CircularProgress } from "@mui/material"
import { Center, WordOfTheDay } from "../components"
import { auth } from "../firebase"
import { useGetWordOfTheWeek } from "../hooks"

function Home() {
  const { wordOfTheWeek, loading } = useGetWordOfTheWeek()

  return (
    <Center fill>
      <Button onClick={() => auth.signOut()}>Sign Out</Button>
      {loading ? <CircularProgress /> : <WordOfTheDay word={wordOfTheWeek} />}
    </Center>
  )
}

export default Home
