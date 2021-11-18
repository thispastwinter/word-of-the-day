import axios from "axios"
import * as cors from "cors"
import * as admin from "firebase-admin"
import * as functions from "firebase-functions"
import { Collections, Urls } from "../../global/constants"
import { UserPartial, Word, WordResponse } from "../../global/types"
import { getPartOfSpeech, getRandomNumber } from "../../global/utils"

admin.initializeApp()
admin.firestore().settings({ ignoreUndefinedProperties: true })

const config = functions.config()

const headers = {
  "x-rapidapi-host": "wordsapiv1.p.rapidapi.com",
  "x-rapidapi-key": config.words.key,
}

const instance = axios.create({
  baseURL: Urls.WORDS_BASE_URL,
  headers,
})

const generateWordOfTheWeek = (args: Word) => args

const letterCount = getRandomNumber(8, 12)

const partOfSpeech = getPartOfSpeech(getRandomNumber(0, 1))

const url = `/?random=true&partOfSpeech=${partOfSpeech}&diversity=0.5&lettersMin=${letterCount}`

async function getWordOfTheWeek() {
  instance
    .get<WordResponse>(url)
    .then(async (res) => {
      const groups = await admin
        .firestore()
        .collection(Collections.GROUPS)
        .get()

      const { word, pronunciation } = res.data
      const syllables = res.data.syllables
      const { definition, partOfSpeech } = res.data.results[0]
      const week_of =
        admin.firestore.FieldValue.serverTimestamp() as admin.firestore.Timestamp

      groups.forEach((doc) => {
        const groupId = doc.data().id as string

        const wordOfTheWeek = generateWordOfTheWeek({
          id: doc.id,
          definition,
          partOfSpeech,
          week_of,
          syllables,
          word,
          phoneticSpelling: pronunciation?.all,
          groupId,
        })

        admin.firestore().collection(Collections.WORDS).add(wordOfTheWeek)
      })
    })
    .catch((err) => {
      throw new Error(`Word retrieval failed: ${err}`)
    })
}

exports.getRandomWord = functions.pubsub
  .schedule("0 0 * * *")
  .onRun(getWordOfTheWeek)

exports.shuffleWord = functions.https.onRequest((req, res) =>
  cors({ origin: true })(req, res, () => {
    getWordOfTheWeek()
      .then(() => {
        res.status(200)
        res.end()
      })
      .catch(() => {
        res.status(500)
        res.end()
      })
  }),
)

exports.onSignIn = functions.auth.user().onCreate((user) => {
  const partialUser: UserPartial = {
    groupId: "",
    isAdmin: false,
    id: user.uid,
  }

  admin.firestore().collection(Collections.USERS).add(partialUser)
})
