// react-router-dom
import { useParams } from "react-router-dom";
// components
import Review from "../../components/Review";
// hooks
import useAuthContext from "../../hooks/useAuthContext";
import useCollectionData from "../../hooks/useCollectionData";
// style
import "./CodexDetail.css";

const CodexDetail = () => {
  const { user } = useAuthContext();
  const { id } = useParams();
  const { data: note, error, loading } = useCollectionData("codex", id);
  const userName = user?.displayName;
  if (error) return <h1>There was an error: ${error}</h1>;
  if (loading) return <h1>Loading...</h1>;

  return (
    <div className="book-container">
      {note && (
        <>
          <div className="book-detail">
            <h2>{note.title}</h2>
            <img src={note.imageUrl} alt={note.title} />
            <p>{note.description}</p>
          </div>
          <div className="right-side">
            <iframe src={note.pdfUrl} width="100%" height="800px"></iframe>
            {userName && <Review userName={user.displayName} codexId={id} />}
          </div>
        </>
      )}
    </div>
  );
};

export default CodexDetail;
