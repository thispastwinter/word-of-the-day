import { Close } from "@mui/icons-material"
import { Button, IconButton, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { useEffect, useState } from "react"
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
  const [error, setError] = useState("")
  const maxCharacters = 500

  useEffect(() => {
    if (value.length <= maxCharacters) {
      setError("")
    } else {
      setError("Cannot exceed 500 characters")
    }
  }, [error, value])

  const handleSubmit = () => {
    if (value.length <= maxCharacters) {
      onSubmit()
    }
  }

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
        error={!!error}
      />
      <Typography variant="caption" color="darkRed">
        {error}
      </Typography>
      <Button sx={{ marginLeft: "auto" }} onClick={handleSubmit}>
        Submit
      </Button>
    </Modal>
  )
}
