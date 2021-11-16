import PartOfSpeech from "./PartOfSpeech"

type Result = {
  definition?: string
  partOfSpeech?: PartOfSpeech
  synonyms?: string[]
  typeOf?: string[]
  derivation?: string[]
  examples?: string[]
}

interface WordResponse {
  word: string
  results: Result[]
  syllables?: {
    count?: number
    list?: string[]
  }
  pronunciation?: {
    all?: string
  }
  frequency?: number
}

export default WordResponse
