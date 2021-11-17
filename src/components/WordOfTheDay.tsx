import { User } from "@firebase/auth"
import { Button, Grid, Typography } from "@mui/material"
import { useCallback, useMemo } from "react"
import { UserPartial, Word } from "../../global/types"
import { useShuffleWord } from "../hooks"

interface Props {
  word?: Word
  user: User & UserPartial
  onShuffle: () => void
}

export default function WordOfTheDay({ word, user, onShuffle }: Props) {
  if (!word) {
    throw new Error("Error fetching word!")
  }

  const { shuffleWord } = useShuffleWord()

  const { definition, word: value, phoneticSpelling, partOfSpeech } = word

  const syllables = useMemo(() => {
    if (word.syllables?.list?.length) {
      return `[${word.syllables.list?.join("-")}]`
    } else {
      return undefined
    }
  }, [word])

  const handleShuffle = useCallback(() => {
    shuffleWord()
    onShuffle()
  }, [onShuffle, shuffleWord])

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      direction="column"
    >
      {user.isAdmin && <Button onClick={handleShuffle}>Shuffle</Button>}
      <Typography sx={{ textAlign: "center" }} variant="h3">
        {value}
      </Typography>
      {syllables && <Typography variant="h6">{syllables}</Typography>}
      {phoneticSpelling && (
        <Typography variant="body1">{phoneticSpelling}</Typography>
      )}
      {partOfSpeech && <Typography variant="body1">{partOfSpeech}</Typography>}
      {definition && (
        <Typography
          sx={{ textAlign: "center" }}
          variant="body2"
          style={{ color: "gray" }}
        >
          {definition}
        </Typography>
      )}
    </Grid>
  )
}
