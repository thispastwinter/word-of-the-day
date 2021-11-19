import { ButtonProps, Button as MuiButton } from "@mui/material"

export default function Button(props: ButtonProps) {
  return (
    <MuiButton
      disableElevation
      variant="contained"
      sx={{ borderRadius: 48 }}
      {...props}
    />
  )
}
