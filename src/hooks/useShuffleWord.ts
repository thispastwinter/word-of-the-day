import axios from "axios"
import { Urls } from "../../global/constants"

async function shuffleWord(groupId: string) {
  await axios.post(Urls.SHUFFLE_URL, { groupId })
}

export default function useShuffleWord() {
  return { shuffleWord }
}
