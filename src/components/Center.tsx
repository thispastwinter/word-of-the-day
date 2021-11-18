import { Grid, Theme } from "@mui/material"
import { SxProps } from "@mui/system"
import { ReactNode } from "react"

interface Props {
  children: ReactNode
  sx?: SxProps<Theme>
  fill?: boolean
}

export default function Center({ children, sx, fill }: Props) {
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{ ...sx, height: fill ? "100vh" : undefined }}
      direction="column"
    >
      {children}
    </Grid>
  )
}
