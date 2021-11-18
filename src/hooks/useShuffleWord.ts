import axios from "axios"
import { Urls } from "../../global/constants"

async function shuffleWord(groupId: string) {
  await axios.get(Urls.SHUFFLE_URL, { params: { groupId } })
}

export default function useShuffleWord() {
  return { shuffleWord }
}
