import axios from "axios"
import * as admin from "firebase-admin"
import * as functions from "firebase-functions"
import { UserPartial, Word, WordResponse } from "../../global/types"
import Collections from "../constants/collections"

admin.initializeApp()
admin.firestore().settings({ ignoreUndefinedProperties: true })

const config = functions.config()

const headers = {
  "x-rapidapi-host": "wordsapiv1.p.rapidapi.com",
  "x-rapidapi-key": config.words.key,
}

const instance = axios.create({
  baseURL: "https://wordsapiv1.p.rapidapi.com/words",
  headers,
})

const getRandomNumber = (min: number, max: number) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const getPartOfSpeech = (index: number) => {
  const partsOfSpeech = ["verb", "adjective"]
  return partsOfSpeech[index]
}

const generateWordOfTheWeek = (args: Word) => args

const letterCount = getRandomNumber(8, 12)

const partOfSpeech = getPartOfSpeech(getRandomNumber(0, 1))

const url = `/?random=true&partOfSpeech=${partOfSpeech}&diversity=0.5&lettersMin=${letterCount}`

function getWordOfTheWeek() {
  instance
    .get<WordResponse>(url)
    .then((res) => {
      if (res.data) {
        const { word, pronunciation } = res.data
        const syllables = res.data.syllables
        const { definition, partOfSpeech } = res.data.results[0]
        const week_of =
          admin.firestore.FieldValue.serverTimestamp() as admin.firestore.Timestamp

        const wordOfTheWeek = generateWordOfTheWeek({
          definition,
          partOfSpeech,
          week_of,
          syllables,
          word,
          phoneticSpelling: pronunciation?.all,
        })

        admin.firestore().collection(Collections.WORDS).add(wordOfTheWeek)
      } else {
        throw new Error("No data!")
      }
    })
    .catch((err) => {
      throw new Error(`Word retrieval failed: ${err}`)
    })
}

exports.getRandomWord = functions.pubsub
  .schedule("0 0 * * *")
  .onRun(getWordOfTheWeek)

exports.onSignIn = functions.auth.user().onCreate((user) => {
  const partialUser: UserPartial = {
    displayName: user.displayName,
    group: "",
    id: user.uid,
  }

  admin.firestore().collection(Collections.USERS).add(partialUser)
})
