import { InputProps, Input as MuiInput } from "@mui/material"

export default function Input(props: InputProps) {
  return (
    <MuiInput
      disableUnderline
      style={{ borderRadius: 8 }}
      sx={{
        padding: 2,
        background: "#f2f2f2",
        marginBottom: 1,
      }}
      {...props}
    />
  )
}
