import { ArrowForward } from "@mui/icons-material"
import { Grid, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { Comment as CommentType } from "../../global/types"
import { convertTimeStampToDate } from "../utils/convertTimestampToDate"
import Button from "./Button"

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
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box mr="auto" ml="auto">
            <Button
              sx={{ lineHeight: 0, textTransform: "capitalize" }}
              onClick={onAddComment}
              endIcon={<ArrowForward />}
            >
              Leave a comment
            </Button>
          </Box>
        </Box>
        {comments?.map((comment) => (
          <Box
            key={comment.id}
            sx={{
              display: "flex",
              flexDirection: "column",
              pt: 2,
            }}
          >
            <Typography variant="body2">{comment.body}</Typography>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography sx={{ fontWeight: 600, pr: 1 }} variant="caption">
                {comment.displayName}
              </Typography>
              <Typography variant="caption" color="gray">
                {convertTimeStampToDate(
                  comment.createdAt.seconds,
                  comment.createdAt.nanoseconds,
                )}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Grid>
  )
}
