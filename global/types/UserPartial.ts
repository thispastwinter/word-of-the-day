interface UserPartial {
  id: string | null
  groups: Record<string, string>
  isAdmin: boolean
}

export default UserPartial
