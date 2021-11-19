export const getInitials = (name: string) =>
  name
    .split(" ")
    .map((str) => str.charAt(0))
    .join("")
