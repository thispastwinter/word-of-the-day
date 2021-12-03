import axios from "axios"
import * as cors from "cors"
import * as admin from "firebase-admin"
import * as functions from "firebase-functions"
import { Collections, IDs, Urls } from "../../global/constants"
import { UserPartial, Word, WordResponse } from "../../global/types"
import { getPartOfSpeech, getRandomNumber } from "../../global/utils"

admin.initializeApp()
admin.firestore().settings({ ignoreUndefinedProperties: true })

const db = admin.firestore()

const config = functions.config()

const headers = {
  "x-rapidapi-host": "wordsapiv1.p.rapidapi.com",
  "x-rapidapi-key": config.words.key,
}

const instance = axios.create({
  baseURL: Urls.WORDS_BASE_URL,
  headers,
})

const generateWordOfTheWeek = (args: Partial<Word>) => args

const letterCount = getRandomNumber(8, 12)

const partOfSpeech = getPartOfSpeech(getRandomNumber(0, 1))

const url = `/?random=true&partOfSpeech=${partOfSpeech}&diversity=0.5&lettersMin=${letterCount}`

async function getWordOfTheWeek(groupId?: string) {
  if (!groupId) {
    throw new Error("groupId not found")
  }
  instance
    .get<WordResponse>(url)
    .then(async (res) => {
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
        groupId,
      })

      db.collection(Collections.WORDS)
        .add(wordOfTheWeek)
        .then((doc) => {
          admin
            .firestore()
            .collection(Collections.WORDS)
            .doc(doc.id)
            .update({ id: doc.id })
        })
        .catch((err) => {
          console.error(`Document update failed: ${err}`)
        })
    })
    .catch((err) => {
      console.error(`Word retrieval failed: ${err}`)
    })
}

const userCollection = admin.firestore().collection(Collections.USERS)

exports.getRandomWord = functions.pubsub
  .schedule("0 0 * * *")
  .onRun(async () => {
    const groups = await admin.firestore().collection(Collections.GROUPS).get()
    groups.forEach((doc) => {
      const groupId = doc.data().id as string
      getWordOfTheWeek(groupId)
    })
  })

exports.shuffleWord = functions.https.onRequest((req, res) =>
  cors({ origin: true })(req, res, () => {
    getWordOfTheWeek(req.body.groupId)
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
  const newId = db.collection("_").doc().id
  const partialUser: UserPartial = {
    displayName: user.displayName || "",
    userId: user.uid,
    groups: {
      [IDs.PUBLIC_GROUP_ID]: "Public",
    },
    isAdmin: false,
    id: newId,
  }

  userCollection.doc(newId).set(partialUser)
})
