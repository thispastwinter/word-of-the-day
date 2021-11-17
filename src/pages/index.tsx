import { CircularProgress } from "@mui/material"
import { Center, WordOfTheDay } from "../components"
import { useGetWordOfTheWeek } from "../hooks"

function Home() {
  const { wordOfTheWeek, loading } = useGetWordOfTheWeek()

  return (
    <div className="App">
      <Center fill>
        {loading ? <CircularProgress /> : <WordOfTheDay word={wordOfTheWeek} />}
      </Center>
    </div>
  )
}

export default Home
