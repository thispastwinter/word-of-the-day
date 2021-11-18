import { User } from "@firebase/auth"
import { Group } from "@mui/icons-material"
import { AppBar, Button, CircularProgress, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { UserPartial } from "../../global/types"
import { Center, WordOfTheDay } from "../components"
import { auth } from "../firebase"
import { useGetWordOfTheWeek } from "../hooks"
import useGetGroupById from "../hooks/useGetGroupById"

interface Props {
  user: User & UserPartial
}

function Home({ user }: Props) {
  const {
    wordOfTheWeek,
    loading: wordLoading,
    setLoading,
  } = useGetWordOfTheWeek(user.groupId)
  const { group, loading: groupLoading } = useGetGroupById(user.groupId)

  const loading = wordLoading || groupLoading

  return (
    <>
      <AppBar
        color="transparent"
        sx={{
          boxShadow: "none",
          flexDirection: "row",
          padding: 2,
          alignItems: "center",
        }}
      >
        <Box sx={{ flexDirection: "row", display: "flex" }}>
          <Group color="inherit" />
          <Box pr={2} />
          <Typography>{group?.name}</Typography>
        </Box>
        <Box sx={{ marginLeft: "auto" }}>
          <Button onClick={() => auth.signOut()}>Sign Out</Button>
        </Box>
      </AppBar>
      <Center fill>
        {loading ? (
          <CircularProgress />
        ) : (
          <WordOfTheDay
            word={wordOfTheWeek}
            user={user}
            onShuffle={() => setLoading(true)}
          />
        )}
      </Center>
    </>
  )
}

export default Home
