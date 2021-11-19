import { User } from "@firebase/auth"
import { Timestamp } from "@firebase/firestore"
import { Card, Grid, Typography } from "@mui/material"
import { useMemo, useState } from "react"
import { IDs } from "../../global/constants"
import { UserPartial, Word } from "../../global/types"
import createComment from "../api/createComment"
import { useGetComments } from "../hooks"
import CommentModal from "./CommentModal"
import Comments from "./Comments"

interface Props {
  word?: Word
  user: User & UserPartial
}

export default function WordOfTheDay({ word, user }: Props) {
  const [open, setOpen] = useState(false)
  const [body, setBody] = useState("")

  if (!word) {
    throw new Error("Error fetching word!")
  }

  const { data } = useGetComments(word.id, user.groupId)

  const { definition, word: value, phoneticSpelling, partOfSpeech } = word

  const syllables = useMemo(() => {
    if (word.syllables?.list?.length) {
      return `[${word.syllables.list?.join("-")}]`
    } else {
      return undefined
    }
  }, [word])

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
      userId: user.id || "",
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
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Grid container direction="column" sx={{ maxWidth: 500 }}>
          <Card
            sx={{
              marginRight: 2,
              marginLeft: 2,
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              display: "flex",
              border: ({ palette }) => `2px solid ${palette.common.black}`,
              boxShadow: "none",
              padding: ({ spacing }) => spacing(6, 4),
            }}
          >
            <Typography variant="h3">{value}</Typography>
            {syllables && <Typography variant="h6">{syllables}</Typography>}
            {phoneticSpelling && (
              <Typography variant="body1">{phoneticSpelling}</Typography>
            )}
            {partOfSpeech && (
              <Typography variant="body1">{partOfSpeech}</Typography>
            )}
            {definition && (
              <Typography color="gray" variant="body2">
                {definition}
              </Typography>
            )}
          </Card>
        </Grid>
        {user.groupId !== IDs.PUBLIC_GROUP_ID && (
          <Comments comments={data || []} onAddComment={openModal} />
        )}
      </Grid>
    </>
  )
}
