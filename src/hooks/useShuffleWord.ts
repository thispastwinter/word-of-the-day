import axios from "axios"
import { Urls } from "../../global/constants"

async function shuffleWord() {
  await axios.get(Urls.SHUFFLE_URL)
}

export default function useShuffleWord() {
  return { shuffleWord }
}
