import { ArrowForward } from "@mui/icons-material"
import { Typography } from "@mui/material"
import { Box } from "@mui/system"
import { useState } from "react"
import Button from "../Button"
import Input from "../Input"
import Modal from "../Modal"
import Header from "./Header"

interface Props {
  error: string
  onGroupNameChange: (value: string) => void
  onGroupIdChange: (value: string) => void
  onJoin: () => void
  onCreate: () => void
  onGoBack: () => void
  groupName: string
  groupId: string
  open: boolean
  onBackdropClick: () => void
  handleClose: () => void
}

type FormSections = "home" | "join" | "create"

export default function GroupModal({
  error,
  onGroupNameChange,
  onGroupIdChange,
  onJoin,
  onCreate,
  onGoBack,
  groupName,
  groupId,
  open,
  onBackdropClick,
  handleClose,
}: Props) {
  const [currentSection, setCurrentSection] = useState<FormSections>("home")

  const handleGoBack = () => {
    onGoBack()
    setCurrentSection("home")
  }

  const goToJoin = () => {
    setCurrentSection("join")
  }

  const goToCreate = () => {
    setCurrentSection("create")
  }

  const onClose = () => {
    handleClose()
    setCurrentSection("home")
  }

  return (
    <Modal
      cardSx={{
        maxHeight: 225,
        width: 300,
        justifyContent: "center",
      }}
      open={open}
      onBackdropClick={onBackdropClick}
    >
      {currentSection === "home" ? (
        <>
          <Header
            handleClose={onClose}
            title={
              <>
                Learning is <br /> better together
              </>
            }
            subTitle={
              <>
                Invite your firends to join you <br /> learning a new word each
                day!
              </>
            }
          />
          <Button
            sx={{ justifyContent: "space-between" }}
            onClick={goToJoin}
            startIcon={<Box width={20} />}
            endIcon={<ArrowForward />}
          >
            Join Group
          </Button>
          <Box mb={2} />
          <Button
            sx={{ justifyContent: "space-between" }}
            startIcon={<Box width={20} />}
            fullWidth
            onClick={goToCreate}
            endIcon={<ArrowForward />}
          >
            Create Group
          </Button>
        </>
      ) : currentSection === "join" ? (
        <>
          <Header
            handleClose={onClose}
            handleGoBack={handleGoBack}
            title="Join an exisiting group"
            subTitle="Make sure to only join groups with people you trust."
          />
          <Input
            multiline
            placeholder="Enter group code"
            fullWidth
            error={!!error}
            value={groupId}
            onChange={(event) => onGroupIdChange(event.target.value)}
          />
          <Typography
            sx={{ paddingBottom: 1 }}
            variant="caption"
            color="darkred"
          >
            {error}
          </Typography>
          <Button onClick={onJoin} sx={{ marginLeft: "auto" }}>
            Join
          </Button>
        </>
      ) : (
        <>
          <Header
            handleClose={onClose}
            handleGoBack={handleGoBack}
            title="Create a group"
            subTitle="Name your group, and we'll assign you a unique group code"
          />
          <Input
            multiline
            placeholder="Enter a group name"
            fullWidth
            value={groupName}
            onChange={(event) => onGroupNameChange(event.target.value)}
          />
          <Button onClick={onCreate} sx={{ marginLeft: "auto" }}>
            Create
          </Button>
        </>
      )}
    </Modal>
  )
}
