import { CircularProgress, Grid } from "@mui/material"
import { WordOfTheDay } from "./components"
import useGetWordOfTheWeek from "./hooks/useGetWordOfTheWeek"

function App() {
  const { wordOfTheWeek, loading } = useGetWordOfTheWeek()
  const height = window.innerHeight

  return (
    <div className="App">
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ height }}
        direction="column"
      >
        {loading ? <CircularProgress /> : <WordOfTheDay word={wordOfTheWeek} />}
      </Grid>
    </div>
  )
}

export default App
