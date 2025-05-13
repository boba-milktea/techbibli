import { onSnapshot } from "firebase/firestore";

// Real-time updates for collection
const useSubscription = (reviewQuery) => {
  const subscribe = (callback) => {
    return onSnapshot(reviewQuery, (snapshot) => {
      const documents = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      callback(documents);
    });
  };

  return { subscribe };
};

export default useSubscription;
