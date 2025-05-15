// firebase
import { onSnapshot } from "firebase/firestore";

/**
 * Custom React hook to subscribe to real-time updates from a Firebase query
 *
 * @param {query} reviewQuery - A firestore query obejct (e.g.collection + where + orderBy)
 *
 * @return {{subscribe:(callback:(data: Array<Object>) => void ) => void }}
 * An object with a `subscribe` function:
 * - `subscribe(callback)`: starts listening to the firestore query and calls callback with an array of documents on each update.
 * - returns a function to unsubscribe from the listener.
 */

// firebase onSnapshot for real-time updates
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
