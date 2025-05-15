// react
import React from "react";
// firebase
import { collection, addDoc, doc, deleteDoc } from "firebase/firestore";
import { db, timestamp } from "../../firebase";

/**
 * Custom React hook to add a review or remove a reivew from the Firestore collection.
 *
 * @param {string} reviewCollection - the name of collection in Firestore
 *
 * @returns {{
 *   addReview:  (review : {username: string, codexId: string, rating: number, comment: string}) => Promise <void>
 *   removeReview: (id: string) => Promise<void>,
 *
 * }} An object containing:
 * - `addReview`: asynchronously add a review to the specified Firestore collection;
 *    expect an object with the properties:  `userName`, `codexId`, `rating`, `comment`.
 * - `removeReview`:asynchronously deletes a review from the collection by its document ID.
 *
 */

const commentReducer = (state, action) => {
  switch (action.type) {
    case "IS_PENDING":
      return { document: null, isPending: true, success: false, error: null };
    case "ADD_DOC":
      return {
        document: action.payLoad,
        isPending: false,
        success: true,
        error: null,
      };
    case "DELETE_DOC":
      return {
        document: action.payload,
        isPending: false,
        success: true,
        error: null,
      };

    default:
      return state;
  }
};

const useAddRemoveReview = (reviewCollection) => {
  const initialResponse = {
    isPending: false,
    error: null,
    document: null,
    sucess: false,
  };

  const [response, dispatch] = React.useReducer(
    commentReducer,
    initialResponse
  );
  const reviewRef = collection(db, reviewCollection);

  const addReview = async (review) => {
    dispatch({ type: "IS_PENDING" });
    try {
      const createdTime = timestamp.fromDate(new Date());
      const addedReview = await addDoc(reviewRef, { ...review, createdTime });
      dispatch({ type: "ADD_DOC", payLoad: addedReview });
    } catch (err) {
      dispatch({ type: "ERROR", payLoad: err.message });
    }
  };

  const deleteReview = async (id) => {
    dispatch({ type: "IS_PENDING" });
    const docRef = doc(db, reviewCollection, id);
    try {
      await deleteDoc(docRef);
    } catch (err) {
      dispatch({ type: "ERROR", payload: "could not delete" });
    }
  };

  return { addReview, deleteReview };
};

export default useAddRemoveReview;
