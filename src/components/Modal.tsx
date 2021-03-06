import { Close } from "@mui/icons-material"
import { Box, Card, IconButton, Modal as MuiModal } from "@mui/material"
import { SxProps } from "@mui/system"
import { ReactNode } from "react"

interface Props {
  children: ReactNode
  open: boolean
  onBackdropClick?: () => void
  handleClose?: () => void
  onClose?: () => void
  sx?: SxProps
  cardSx?: SxProps
}

export default function Modal({
  children,
  open,
  onBackdropClick,
  handleClose,
  onClose,
  sx,
  cardSx,
}: Props) {
  return (
    <MuiModal
      sx={{
        display: "flex",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
        ...sx,
      }}
      style={{ outline: "none" }}
      open={open}
      onBackdropClick={onBackdropClick}
      onClose={onClose}
    >
      <Card
        sx={{
          width: "auto",
          padding: 2,
          margin: 2,
          height: "auto",
          display: "flex",
          flexDirection: "column",
          outline: 0,

          ...cardSx,
        }}
      >
        {handleClose && (
          <Box sx={{ marginLeft: "auto" }}>
            <IconButton onClick={handleClose} sx={{ padding: 0 }}>
              <Close fontSize="medium" />
            </IconButton>
          </Box>
        )}
        {children}
      </Card>
    </MuiModal>
  )
}
