import { Close } from "@mui/icons-material"
import { Button, Card, IconButton, Input, Modal } from "@mui/material"
import { Box } from "@mui/system"

interface Props {
  onChange: (text: string) => void
  value: string
  onSubmit: () => void
  open: boolean
  handleClose: () => void
}

export default function CommentModal({
  onChange,
  value,
  onSubmit,
  handleClose,
  open,
}: Props) {
  return (
    <Modal
      open={open}
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Card
        sx={{
          padding: 2,
          width: "25rem",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box pb={1} sx={{ marginLeft: "auto" }}>
          <IconButton onClick={handleClose} sx={{ padding: 0 }}>
            <Close />
          </IconButton>
        </Box>
        <Input
          multiline
          placeholder="Add a comment..."
          fullWidth
          minRows={10}
          maxRows={10}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          disableUnderline
          sx={{
            borderRadius: 1,
            padding: 2,
            background: "#f2f2f2",
            marginBottom: 1,
          }}
        />
        <Button sx={{ marginLeft: "auto" }} onClick={onSubmit}>
          Submit
        </Button>
      </Card>
    </Modal>
  )
}
