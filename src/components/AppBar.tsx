import { User } from "@firebase/auth"
import { Group as GroupIcon } from "@mui/icons-material"
import {
  Avatar,
  Button,
  IconButton,
  AppBar as MuiAppBar,
  Typography,
} from "@mui/material"
import { Box } from "@mui/system"
import { useMemo, useState } from "react"
import { Collections, IDs } from "../../global/constants"
import { Group, UserPartial, Word } from "../../global/types"
import { useFirestoreMutation, useGetWordOfTheWeek } from "../hooks"
import { getInitials } from "../utils/getInitials"
import AppBarMenu from "./AppBarMenu"
import GroupModal from "./GroupModal"

interface Props {
  user: User & UserPartial
  onSignOutClick: () => void
  onSettingsClick: () => void
  group?: Group
}

export default function AppBar({
  user,
  onSettingsClick,
  onSignOutClick,
  group,
}: Props) {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
  const [groupModalOpen, setGroupModalOpen] = useState(false)
  const [groupId, setGroupId] = useState("")
  const [groupName, setGroupName] = useState("")
  const { data: word } = useGetWordOfTheWeek(user.groupId)

  const popOverOpen = Boolean(anchorEl)

  const handlePopoverClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handlePopoverClose = () => {
    setAnchorEl(null)
  }

  const openGroupModal = () => {
    setGroupModalOpen(true)
  }

  const closeGroupModal = () => {
    setGroupModalOpen(false)
  }

  const userArgs = {
    collection: Collections.USERS,
    docId: user.id || "",
    data: { groupId },
    options: {
      onCompleted: closeGroupModal,
    },
  }

  const [updateUser] = useFirestoreMutation<Partial<UserPartial>>(userArgs)

  const [createWordForGroup] = useFirestoreMutation<Partial<Word>>()

  const [createGroup] = useFirestoreMutation<Partial<Group>>({
    collection: Collections.GROUPS,
    data: { name: groupName },
    options: {
      automaticallySetId: true,
      onCompleted: (doc) => {
        if (doc?.id) {
          setGroupId(doc.id)
          updateUser({ ...userArgs, data: { groupId: doc.id, isAdmin: true } })
          createWordForGroup({
            collection: Collections.WORDS,
            data: { ...word, groupId: doc.id },
            options: {
              automaticallySetId: true,
            },
          })
        }
      },
    },
  })

  const avatarInitials = useMemo(
    () => user.displayName && getInitials(user.displayName),
    [user],
  )

  const isNotPublic = !!user.groupId && user.groupId !== IDs.PUBLIC_GROUP_ID

  return (
    <>
      <GroupModal
        onGroupNameChange={setGroupName}
        onGroupIdChange={setGroupId}
        groupId={groupId}
        groupName={groupName}
        onBackdropClick={closeGroupModal}
        handleClose={closeGroupModal}
        open={groupModalOpen}
        onCreate={() => createGroup()}
        onJoin={() => updateUser()}
      />
      <MuiAppBar
        color="transparent"
        sx={{
          boxShadow: "none",
          flexDirection: "row",
          padding: ({ spacing }) => spacing(1, 2),
          alignItems: "center",
        }}
      >
        {isNotPublic ? (
          <Box sx={{ flexDirection: "row", display: "flex" }}>
            <GroupIcon color="inherit" />
            <Box pr={2} />
            <Typography>{group?.name}</Typography>
          </Box>
        ) : (
          <Button onClick={openGroupModal}>Join A Group</Button>
        )}
        <Box sx={{ marginLeft: "auto" }}>
          <AppBarMenu
            anchorEl={anchorEl}
            isOpen={popOverOpen}
            isNotPublic={isNotPublic}
            onSettingsClick={() => {
              onSettingsClick()
              handlePopoverClose()
            }}
            onSignOutClick={onSignOutClick}
            handleClose={handlePopoverClose}
          />
          <IconButton onClick={handlePopoverClick}>
            <Avatar src={user.photoURL || ""}>{avatarInitials}</Avatar>
          </IconButton>
        </Box>
      </MuiAppBar>
    </>
  )
}
