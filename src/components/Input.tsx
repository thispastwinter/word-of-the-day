import { InputProps, Input as MuiInput } from "@mui/material"

export default function Input(props: InputProps) {
  return (
    <MuiInput
      disableUnderline
      sx={{
        borderRadius: 1,
        padding: 2,
        background: "#f2f2f2",
        marginBottom: 1,
      }}
      {...props}
    />
  )
}
