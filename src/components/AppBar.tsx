import { User } from "@firebase/auth"
import { GroupOutlined } from "@mui/icons-material"
import {
  Avatar,
  Button,
  IconButton,
  MenuItem,
  AppBar as MuiAppBar,
  Select,
} from "@mui/material"
import { Box } from "@mui/system"
import { useMemo, useState } from "react"
import { Collections, IDs } from "../../global/constants"
import { Group, UserPartial } from "../../global/types"
import {
  useCreateGroup,
  useFirestoreMutation,
  useGetGroupById,
  useGetWordOfTheWeek,
} from "../hooks"
import { getInitials } from "../utils/getInitials"
import AppBarMenu from "./AppBarMenu"
import GroupModal from "./GroupModal"

interface Props {
  user: User & UserPartial
  onGroupSelect: (currentGroup: Group) => void
  onSignOutClick: () => void
  onSettingsClick: () => void
  group?: Group
  groups?: Group[]
}

export default function AppBar({
  user,
  onGroupSelect,
  onSettingsClick,
  onSignOutClick,
  group,
  groups,
}: Props) {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
  const [groupModalOpen, setGroupModalOpen] = useState(false)
  const [groupId, setGroupId] = useState("")
  const [groupName, setGroupName] = useState("")
  const [error, setError] = useState<string>("")
  const { data: word } = useGetWordOfTheWeek(groups?.[0].id)

  const { data: groupById } = useGetGroupById(groupId)

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
    resetForm()
    setGroupModalOpen(false)
  }

  const resetForm = () => {
    setGroupId("")
    setGroupName("")
  }

  const userArgs = {
    collection: Collections.USERS,
    docId: user.id || "",
    data: { groups: { ...user.groups, [groupId]: groupById?.name || "" } },
    options: {
      onCompleted: closeGroupModal,
    },
  }

  const [updateUser] = useFirestoreMutation<Partial<UserPartial>>()

  const { createGroup } = useCreateGroup({
    groupName,
    onCompleted: closeGroupModal,
    user,
    word,
  })

  const avatarInitials = useMemo(
    () => user.displayName && getInitials(user.displayName),
    [user],
  )

  const isNotPublic = group?.id !== IDs.PUBLIC_GROUP_ID

  const alreadyBelongsToGroup =
    groupById?.id && Object.keys(user.groups).includes(groupById?.id)

  return (
    <>
      <GroupModal
        error={error}
        onGoBack={resetForm}
        onGroupNameChange={setGroupName}
        onGroupIdChange={setGroupId}
        groupId={groupId}
        groupName={groupName}
        onBackdropClick={closeGroupModal}
        handleClose={closeGroupModal}
        open={groupModalOpen}
        onCreate={() => createGroup()}
        onJoin={() => {
          if (groupById?.id && !alreadyBelongsToGroup) {
            updateUser(userArgs)
          } else if (alreadyBelongsToGroup) {
            setError("You already belong to this group")
          } else {
            setError("It looks like you've entered an invalid group code")
          }
        }}
      />
      <MuiAppBar
        color="transparent"
        sx={{
          boxShadow: "none",
          flexDirection: "row",
          padding: ({ spacing }) => spacing(1, 2),
          alignItems: "center",
          borderBottom: ({ palette }) => `2px solid ${palette.common.black}`,
        }}
      >
        <Box sx={{ flexDirection: "row", display: "flex" }}>
          <GroupOutlined color="inherit" />
          <Box pr={2} />
          <Select
            sx={{ height: 28 }}
            value={group?.id}
            onChange={(event) => {
              const groupId = event.target.value as Group["id"]
              const group = groups?.find((group) => group.id === groupId)
              group && onGroupSelect(group)
            }}
          >
            {groups?.map((group) => (
              <MenuItem key={group.id} value={group?.id}>
                {group?.name}
              </MenuItem>
            ))}
            <MenuItem>
              <Button
                onClick={openGroupModal}
                sx={{ textTransform: "capitalize", p: 0 }}
              >
                Join or Create a group
              </Button>
            </MenuItem>
          </Select>
        </Box>
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
