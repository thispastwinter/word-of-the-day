import { ChevronLeft, Close } from "@mui/icons-material"
import { IconButton, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { ReactNode } from "react"

interface Props {
  title: string | ReactNode
  subTitle: string | ReactNode
  handleGoBack?: () => void
  handleClose: () => void
}

export default function Header({
  title,
  subTitle,
  handleGoBack,
  handleClose,
}: Props) {
  return (
    <Box
      sx={{
        pb: 2,
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
      }}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        pb={0.5}
      >
        <IconButton
          sx={{ visibility: handleGoBack ? "visible" : "hidden" }}
          onClick={handleGoBack}
        >
          <ChevronLeft fontSize="medium" />
        </IconButton>
        <Typography variant="h6">{title}</Typography>
        <IconButton onClick={handleClose} sx={{ marginBottom: "auto" }}>
          <Close fontSize="medium" />
        </IconButton>
      </Box>
      <Typography color="GrayText">{subTitle}</Typography>
    </Box>
  )
}
