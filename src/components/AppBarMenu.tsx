import { Button, Popover } from "@mui/material"
import { Box } from "@mui/system"

interface Props {
  isOpen: boolean
  isNotPublic: boolean
  anchorEl: HTMLButtonElement | null
  handleClose: () => void
  onSettingsClick: () => void
  onSignOutClick: () => void
}

export default function AppBarMenu({
  isOpen,
  isNotPublic,
  anchorEl,
  handleClose,
  onSettingsClick,
  onSignOutClick,
}: Props) {
  const id = isOpen ? "simple-popover" : undefined

  return (
    <Popover
      id={id}
      open={isOpen}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
    >
      <Box sx={{ flexDirection: "column", display: "flex", padding: 1 }}>
        {isNotPublic && (
          <Button
            sx={{ textTransform: "capitalize" }}
            color="inherit"
            onClick={onSettingsClick}
          >
            Settings
          </Button>
        )}
        <Button
          sx={{ textTransform: "capitalize" }}
          color="inherit"
          onClick={onSignOutClick}
        >
          Sign Out
        </Button>
      </Box>
    </Popover>
  )
}
