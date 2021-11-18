import { Timestamp } from "@firebase/firestore"
import dayjs from "dayjs"

export const convertTimeStampToDate = (
  seconds: number,
  nanoseconds: number,
) => {
  const toDate = new Timestamp(seconds, nanoseconds).toDate()
  return dayjs(toDate).format("h:mm a MM.DD")
}
