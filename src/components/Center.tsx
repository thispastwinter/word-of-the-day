import { Grid, Theme } from "@mui/material"
import { SxProps } from "@mui/system"
import { ReactNode } from "react"
import { useWindowSize } from "../hooks"

interface Props {
  children: ReactNode
  sx?: SxProps<Theme>
  fill?: boolean
}

export default function Center({ children, sx, fill }: Props) {
  const { height } = useWindowSize()
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{ ...sx, height: fill ? height : undefined }}
      direction="column"
    >
      {children}
    </Grid>
  )
}
