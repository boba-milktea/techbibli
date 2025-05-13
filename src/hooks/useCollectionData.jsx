import React from "react";
import useCollection from "./useCollection";

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
