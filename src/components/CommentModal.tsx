import { Close } from "@mui/icons-material"
import { Button, IconButton } from "@mui/material"
import { Box } from "@mui/system"
import Input from "./Input"
import Modal from "./Modal"

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
      cardSx={{ maxWidth: 400, width: "100%" }}
      open={open}
      onBackdropClick={handleClose}
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
      />
      <Button sx={{ marginLeft: "auto" }} onClick={onSubmit}>
        Submit
      </Button>
    </Modal>
  )
}
