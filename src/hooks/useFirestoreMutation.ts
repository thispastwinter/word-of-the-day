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

export default function useFirestoreMutation<T>(args: Args<T> = {} as Args<T>) {
  const firestoreMutation = async (innerArgs?: Args<T>) => {
    if (innerArgs) {
      args.collection = innerArgs.collection
      args.data = innerArgs.data
      args.docId = innerArgs.docId
      args.options = innerArgs.options
    }
    const { docId, collection, data, options } = args
    if (docId) {
      const ref = doc(db, collection, docId)
      updateDoc(ref, data)
        .then(() => options?.onCompleted?.(undefined))
        .catch((error) => console.error(error))
    } else {
      const ref = firestoreCollection(db, collection)
      addDoc(ref, data)
        .then((document) => {
          const docId = document.id
          const ref = doc(db, collection, docId)

          if (options?.automaticallySetId) {
            updateDoc(ref, { id: docId })
            options?.onCompleted?.(document)
          }

          options?.onCompleted?.(document)
        })
        .catch((error) => console.error(error))
    }
  }

  return [firestoreMutation]
}
