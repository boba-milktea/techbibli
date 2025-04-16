//resource - https://goalkicker.com/TypeScriptBook2/
import React from "react";
import { useParams } from "react-router-dom";
import { getCodexDetail } from "../../../api";
import "./CodexDetail.css";

/*
use react-pdf https://medium.com/@9haroon_dev/best-4-methods-to-build-a-pdf-viewer-in-react-js-pdf-js-react-pdf-and-more-2024-guide-6f5f658d30cf
 */

const CodexDetail = () => {
  const [note, setNote] = React.useState();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const { id } = useParams();

  React.useEffect(() => {
    async function loadNote() {
      setLoading(true);
      try {
        const codexData = await getCodexDetail(id);
        setNote(codexData);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    loadNote();
  }, [id]);

  console.log(note);

  if (error) return <h1>There was an error: ${error}</h1>;
  if (loading) return <h1>Loading...</h1>;

  return (
    <div className="book-container">
      {note && (
        <>
          <div className="book-detail">
            <h2>{note.title}</h2>
            <p>{note.description}</p>
          </div>
          <iframe src={note.pdfUrl} width="100%" height="650px"></iframe>
        </>
      )}
    </div>
  );
};

export default CodexDetail;
