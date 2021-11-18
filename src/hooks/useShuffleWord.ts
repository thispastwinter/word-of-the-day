import axios from "axios"
import { Urls } from "../../global/constants"

async function shuffleWord(groupId: string) {
  await axios.get(Urls.SHUFFLE_URL, { data: { groupId } })
}

export default function useShuffleWord() {
  return { shuffleWord }
}
