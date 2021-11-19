import { User } from "@firebase/auth"
import { CircularProgress, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { useState } from "react"
import { UserPartial } from "../../global/types"
import { AppBar, Center, Modal, WordOfTheDay } from "../components"
import { auth } from "../firebase"
import { useGetWordOfTheWeek } from "../hooks"
import useGetGroupById from "../hooks/useGetGroupById"

interface Props {
  user: User & UserPartial
}

function Home({ user }: Props) {
  const { data: word, loading: wordLoading } = useGetWordOfTheWeek(user.groupId)
  const { group, loading: groupLoading } = useGetGroupById(user.groupId)
  const [settingsModalOpen, setSettingsModalOpen] = useState(false)

  const openSettings = () => {
    setSettingsModalOpen(true)
  }

  const closeSettings = () => {
    setSettingsModalOpen(false)
  }

  const loading = wordLoading || groupLoading

  return (
    <>
      <Modal open={settingsModalOpen} onBackdropClick={closeSettings}>
        <Box>
          <Typography
            variant="body2"
            pr={1}
            sx={{ textAlign: "center", fontWeight: "600" }}
          >
            Your Group ID:
          </Typography>
          <Typography sx={{ textAlign: "center" }} variant="body2">
            {user.groupId}
          </Typography>
        </Box>
        <Typography
          sx={{ color: ({ palette }) => palette.error.dark }}
          pt={1}
          variant="caption"
        >
          only share your group id with people you trust
        </Typography>
      </Modal>
      <AppBar
        group={group}
        user={user}
        onSettingsClick={openSettings}
        onSignOutClick={() => auth.signOut()}
      />
      <Center
        sx={{
          marginTop: 24,
        }}
      >
        {loading ? (
          <CircularProgress />
        ) : (
          <WordOfTheDay word={word} user={user} />
        )}
      </Center>
    </>
  )
}

export default Home
