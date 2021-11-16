import { Grid, Typography } from "@mui/material"
import { useMemo } from "react"
import { Word } from "../../global/types"

interface Props {
  word?: Word
}

export default function WordOfTheDay({ word }: Props) {
  if (!word) {
    throw new Error("Error fetching word!")
  }

  const { definition, word: value, phoneticSpelling, partOfSpeech } = word

  const syllables = useMemo(() => {
    if (word.syllables?.list?.length) {
      return `[${word.syllables.list?.join("-")}]`
    } else {
      return undefined
    }
  }, [word])

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      direction="column"
    >
      <Typography variant="h3">{value}</Typography>
      {syllables && <Typography variant="h6">{syllables}</Typography>}
      {phoneticSpelling && (
        <Typography variant="body1">{phoneticSpelling}</Typography>
      )}
      {partOfSpeech && <Typography variant="body1">{partOfSpeech}</Typography>}
      {definition && (
        <Typography variant="body2" style={{ color: "gray" }}>
          {definition}
        </Typography>
      )}
    </Grid>
  )
}
