// react
import React from "react";
// hooks
import useCollection from "./useCollection";

/**
 * Custom React hook to fetch data from a Firebase collection
 *
 * if an `id` is provided, it fetches a single document from the collection.
 * Otherwise, it fetches all documents in the collection.
 *
 * @param {string} collectionName - The name of the Firestore collection to fetch from.
 * @param {string} [id = ""] - The document id to fetch a single document
 * @returns {{
 * data: Object | Array<Object>, loading:boolean, error: Error|null}} An object containing:
 * - `data` a single document object or an array of documents object depanding on if an `id` is provided
 * - `loading` a boolean indicating if the request is still in progress.
 * - `error` an error object if the request failed or `null`
 */

const useCollectionData = (collectionName, id = "") => {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const { getDocuments, getDocument } = useCollection(collectionName);

  React.useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const collectionData = id
          ? await getDocument(id)
          : await getDocuments();
        setData(collectionData);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [id]);

  return { data, error, loading };
};

export default useCollectionData;
