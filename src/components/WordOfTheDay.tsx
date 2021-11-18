import { User } from "@firebase/auth"
import { Timestamp } from "@firebase/firestore"
import { Button, Grid, Typography } from "@mui/material"
import { useCallback, useMemo, useState } from "react"
import { UserPartial, Word } from "../../global/types"
import createComment from "../api/createComment"
import { useGetComments, useShuffleWord } from "../hooks"
import CommentModal from "./CommentModal"
import Comments from "./Comments"

interface Props {
  word?: Word
  user: User & UserPartial
  onShuffle: () => void
}

export default function WordOfTheDay({ word, user, onShuffle }: Props) {
  const [open, setOpen] = useState(false)
  const [body, setBody] = useState("")

  if (!word) {
    throw new Error("Error fetching word!")
  }

  const { shuffleWord } = useShuffleWord()

  const { comments } = useGetComments(word.id, user.groupId)

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

  const openModal = () => {
    setOpen(true)
  }

  const closeModal = () => {
    setOpen(false)
  }

  const onSubmit = () => {
    createComment({
      body,
      groupId: user.groupId,
      userId: user.uid,
      wordId: word.id,
      displayName: user.displayName || "",
      createdAt: Timestamp.now(),
    })
    setOpen(false)
  }

  return (
    <>
      <CommentModal
        handleClose={closeModal}
        onSubmit={onSubmit}
        onChange={setBody}
        value={body}
        open={open}
      />
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
        {partOfSpeech && (
          <Typography variant="body1">{partOfSpeech}</Typography>
        )}
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
      <Comments comments={comments || []} onAddComment={openModal} />
    </>
  )
}
