import { User } from "@firebase/auth"
import { CircularProgress, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { useCallback, useMemo, useState } from "react"
import { Group, UserPartial } from "../../../global/types"
import { AppBar, Center, Modal, Redirect, WordOfTheDay } from "../../components"
import { auth } from "../../firebase"
import { useGetWordOfTheWeek } from "../../hooks"

interface Props {
  user: User & UserPartial
}

function Home({ user }: Props) {
  const sortAlphabetically = useCallback((itemA?: string, itemB?: string) => {
    const valA = itemA?.toLowerCase() || ""
    const valB = itemB?.toLowerCase() || ""
    return valA > valB ? 1 : -1
  }, [])

  const groups = useMemo(() => {
    if (user?.groups) {
      return Object.entries(user?.groups)
        .map(([id, name]) => ({ id, name }))
        .sort((a, b) => sortAlphabetically(a.name, b.name))
    } else {
      return []
    }
  }, [user, sortAlphabetically])

  const [currentGroup, setCurrentGroup] = useState<Group | undefined>(groups[0])

  const { data: word, isLoading: wordLoading } = useGetWordOfTheWeek(
    currentGroup?.id,
  )

  const [settingsModalOpen, setSettingsModalOpen] = useState(false)

  const openSettings = () => {
    setSettingsModalOpen(true)
  }

  const closeSettings = () => {
    setSettingsModalOpen(false)
  }

  const loading = wordLoading

  if (!user) {
    return <Redirect to="signin" />
  }

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
            {currentGroup?.id}
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
      {groups && currentGroup && (
        <AppBar
          group={currentGroup}
          groups={groups}
          onGroupSelect={setCurrentGroup}
          user={user}
          onSettingsClick={openSettings}
          onSignOutClick={() => auth.signOut()}
        />
      )}
      <Center fill>
        <Box px={1}>
          {loading ? (
            <CircularProgress />
          ) : (
            <WordOfTheDay word={word} user={user} currentGroup={currentGroup} />
          )}
        </Box>
      </Center>
    </>
  )
}

export default Home
