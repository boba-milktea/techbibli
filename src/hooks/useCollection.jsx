import { db } from "../../api";
import { collection, getDocs, getDoc, doc } from "firebase/firestore";

const useCollection = (collect) => {
  const collectionRef = collection(db, collect);

  const getDocuments = async () => {
    const snapshot = await getDocs(collectionRef);

    const documents = snapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    return documents;
  };

  const getDocument = async (id) => {
    const docRef = doc(db, collect, id);
    const snapshot = await getDoc(docRef);
    const document = { ...snapshot.data(), id: snapshot.id };
    return document;
  };

  return { getDocuments, getDocument };
};

export default useCollection;
