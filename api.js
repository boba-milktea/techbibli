import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  doc,
} from "firebase/firestore/lite";
import { getDownloadURL, getStorage, ref } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDqpFshlEpZFtKQO3JFYvlc2CrSwsgFTyM",
  authDomain: "techbibli.firebaseapp.com",
  projectId: "techbibli",
  storageBucket: "techbibli.firebasestorage.app",
  messagingSenderId: "199217273055",
  appId: "1:199217273055:web:8f5b0d99435db6512c316a",
  measurementId: "G-SMB52DJZVE",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

const bookCollectionRef = collection(db, "books");
const codexCollectionRef = collection(db, "codex");

// get books and each book
export async function getBooks() {
  const snapshot = await getDocs(bookCollectionRef); // will get the books from the location. But the format is different

  const books = snapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  return books;
}

export async function getBook(id) {
  const docRef = doc(db, "books", id);
  const snapshot = await getDoc(docRef);
  const book = { ...snapshot.data(), id: snapshot.id };
  return book;
}

// get codex and each codex pdf
export async function getCodex() {
  const snapshot = await getDocs(codexCollectionRef);

  const codex = snapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  return codex;
}

export async function getCodexDetail(id) {
  const docRef = doc(db, "codex", id);
  const snapshot = await getDoc(docRef);
  const book = { ...snapshot.data(), id: snapshot.id };
  return book;
}

// firebase auth

export { auth };

//get books download url

//   const handleGetBooks = () => {
//     const storage = getStorage();
//     const imageRef = ref(storage, "books/design-patterns.jpg");

//     getDownloadURL(imageRef)
//       .then((url) => {
//         console.log(url);
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   };
// export const handleGetCodex = () => {
//   const storage = getStorage();
//   const pdfRef = ref(storage, "codex-pdfs/mysql.pdf");

//   getDownloadURL(pdfRef)
//     .then((url) => {
//       console.log(url);
//     })
//     .catch((err) => console.error(err));
// };

// handleGetCodex();
