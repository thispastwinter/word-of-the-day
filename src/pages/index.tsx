import { CircularProgress, Grid } from "@mui/material"
import { WordOfTheDay } from "../components"
import { useGetWordOfTheWeek, useWindowSize } from "../hooks"

function Home() {
  const { wordOfTheWeek, loading } = useGetWordOfTheWeek()
  const { height } = useWindowSize()

  console.log(wordOfTheWeek)

  return (
    <div className="App">
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{ height, overflow: "hidden" }}
        direction="column"
      >
        {loading ? <CircularProgress /> : <WordOfTheDay word={wordOfTheWeek} />}
      </Grid>
    </div>
  )
}

export default Home