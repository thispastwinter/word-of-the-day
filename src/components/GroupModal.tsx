import { Button, Typography } from "@mui/material"
import Input from "./Input"
import Modal from "./Modal"

interface Props {
  onGroupNameChange: (value: string) => void
  onGroupIdChange: (value: string) => void
  onJoin: () => void
  onCreate: () => void
  groupName: string
  groupId: string
  open: boolean
  onBackdropClick: () => void
  handleClose: () => void
}

export default function GroupModal({
  onGroupNameChange,
  onGroupIdChange,
  onJoin,
  onCreate,
  groupName,
  groupId,
  open,
  onBackdropClick,
  handleClose,
}: Props) {
  return (
    <Modal
      cardSx={{ minHeight: 200, minWidth: 300 }}
      open={open}
      onBackdropClick={onBackdropClick}
      handleClose={handleClose}
    >
      <Typography pb={1} variant="body2">
        Join an existing group
      </Typography>
      <Input
        multiline
        placeholder="Enter group id..."
        fullWidth
        value={groupId}
        onChange={(event) => onGroupIdChange(event.target.value)}
      />
      <Button sx={{ marginLeft: "auto" }} onClick={onJoin}>
        Join Group
      </Button>
      <Typography pb={1} variant="body2">
        Or create a new group
      </Typography>
      <Input
        multiline
        placeholder="Enter a group name..."
        fullWidth
        value={groupName}
        onChange={(event) => onGroupNameChange(event.target.value)}
      />
      <Button sx={{ marginLeft: "auto" }} onClick={onCreate}>
        Create Group
      </Button>
    </Modal>
  )
}
