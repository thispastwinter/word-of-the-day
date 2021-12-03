import { InputProps, Input as MuiInput } from "@mui/material"

export default function Input(props: InputProps) {
  return (
    <MuiInput
      disableUnderline
      style={{ borderRadius: 8 }}
      sx={{
        padding: 2,
        marginBottom: 1,
        border: "1px solid #E3E5E5",
      }}
      {...props}
    />
  )
}
