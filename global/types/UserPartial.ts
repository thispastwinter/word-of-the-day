import * as firebase from "../../functions/node_modules/firebase-admin/lib"

interface UserPartial {
  id: firebase.auth.UserRecord["uid"]
  group: string
  displayName: firebase.auth.UserRecord["displayName"]
}

export default UserPartial
