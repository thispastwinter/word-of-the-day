import { ButtonProps, Button as MuiButton } from "@mui/material"

export default function Button(props: ButtonProps) {
  return (
    <MuiButton
      disableElevation
      variant="contained"
      style={{ borderRadius: 48 }}
      {...props}
    />
  )
}
