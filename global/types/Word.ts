import * as firebase from "../../functions/node_modules/firebase-admin/lib"
import PartOfSpeech from "./PartOfSpeech"

interface Word {
  definition: string
  word: string
  week_of: firebase.firestore.Timestamp
  partOfSpeech: PartOfSpeech
  syllables: {
    count: number
    list: string[]
  }
  phoneticSpelling: string
}

export default Word
