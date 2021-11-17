import PartOfSpeech from "./PartOfSpeech"

interface Word {
  definition?: string
  word: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  week_of: any
  partOfSpeech?: PartOfSpeech
  syllables?: {
    count?: number
    list?: string[]
  }
  phoneticSpelling?: string
}

export default Word
