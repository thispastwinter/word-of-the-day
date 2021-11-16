import { CircularProgress, Grid } from "@mui/material"
import { WordOfTheWeek } from "./components"
import useGetWordOfTheWeek from "./hooks/useGetWordOfTheWeek"

function App() {
  const { wordOfTheWeek, loading } = useGetWordOfTheWeek()

  return (
    <div className="App">
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ height: "100vh" }}
        direction="column"
      >
        {loading ? (
          <CircularProgress />
        ) : (
          <WordOfTheWeek word={wordOfTheWeek} />
        )}
      </Grid>
    </div>
  )
}

export default App
