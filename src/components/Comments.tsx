import { Comment } from "@mui/icons-material"
import { Button, Grid, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { Comment as CommentType } from "../../global/types"
import { convertTimeStampToDate } from "../utils/convertTimestampToDate"

interface Props {
  comments: CommentType[]
  onAddComment: () => void
}

export default function Comments({ comments, onAddComment }: Props) {
  return (
    <Grid>
      <Box
        py={3}
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", paddingBottom: 1 }}>
          <Box mr="auto" ml="auto">
            <Button
              variant="text"
              sx={{ lineHeight: 0 }}
              onClick={onAddComment}
            >
              Leave a comment{" "}
              <Box sx={{ paddingLeft: 2 }}>
                <Comment />
              </Box>
            </Button>
          </Box>
        </Box>
        {comments?.map((comment) => (
          <Box
            key={comment.id}
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{ paddingRight: 2, fontWeight: 600 }}
              variant="body2"
            >
              {comment.displayName}:
            </Typography>
            <Typography sx={{ paddingRight: 2 }} variant="body2">
              {comment.body}
            </Typography>
            <Typography variant="body2" color="gray">
              @
              {convertTimeStampToDate(
                comment.createdAt.seconds,
                comment.createdAt.nanoseconds,
              )}
            </Typography>
          </Box>
        ))}
      </Box>
    </Grid>
  )
}
