// firebase
import { db } from "../../firebase";
import { collection, getDocs, getDoc, doc } from "firebase/firestore";

/**
 * Custom React hook for interacting with a Firestore collection.
 *
 * @param {string} collect - The name of the Firestore collection to interact with.
 * @returns {{
 *   getDocuments: () => Promise<Array<Object>>,
 *   getDocument: (id: string) => Promise<Object|null>
 * }} An object containing two async functions: `getDocuments` to fetch all documents, and `getDocument` to fetch a single document by ID.
 */

const useCollection = (collect) => {
  const collectionRef = collection(db, collect);

  /**
   * Fetches all documents from the specified Firestore collection.
   *
   * @returns {Promise<Array<Object>>} A promise that resolves to an array of documents. Each document includes its data and a unique `id`.
   */

  const getDocuments = async () => {
    const snapshot = await getDocs(collectionRef);

    const documents = snapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    return documents;
  };

  /**
   * Fetches a single document from the collection by ID.
   *
   * @param {string} id - The ID of the document to retrieve.
   * @returns {Promise<Object|null>} A promise that resolves to the document data with an `id`, or `null` if not found.
   */

  const getDocument = async (id) => {
    const docRef = doc(db, collect, id);
    const snapshot = await getDoc(docRef);
    const document = { ...snapshot.data(), id: snapshot.id };
    return document;
  };

  return { getDocuments, getDocument };
};

export default useCollection;
