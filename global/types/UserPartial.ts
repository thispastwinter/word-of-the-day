interface UserPartial {
  displayName: string
  id: string | null
  groups: Record<string, string>
  isAdmin: boolean
  userId: string
}

export default UserPartial
