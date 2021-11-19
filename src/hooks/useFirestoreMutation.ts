import {
  DocumentData,
  DocumentReference,
  addDoc,
  doc,
  collection as firestoreCollection,
  updateDoc,
} from "@firebase/firestore"
import { db } from "../firebase"

interface Options {
  onCompleted?: (document?: DocumentReference<DocumentData>) => void
  automaticallySetId?: boolean
}

interface Args<T> {
  collection: string
  data: T
  docId?: string
  options?: Options
}

export default function useFirestoreMutation<T>(
  initialArgs: Args<T> = {} as Args<T>,
) {
  const { collection, data, docId, options } = initialArgs
  const firestoreMutation = async (args?: Args<T>) => {
    if (args) {
      initialArgs.collection = args.collection
      initialArgs.data = args.data
      initialArgs.docId = args.docId
      initialArgs.options = args.options
    }
    if (docId) {
      const ref = doc(db, collection, docId)
      await updateDoc(ref, data)
        .then(() => options?.onCompleted?.(undefined))
        .catch((error) => console.error(error))
    } else {
      await addDoc(firestoreCollection(db, collection), data)
        .then(async (document) => {
          const docId = document.id
          const ref = doc(db, collection, docId)

          if (options?.automaticallySetId) {
            await updateDoc(ref, { id: docId })
            options?.onCompleted?.(document)
          }

          options?.onCompleted?.(document)
        })
        .catch((error) => console.error(error))
    }
  }

  return [firestoreMutation]
}
