// react-router-dom
import { Link } from "react-router-dom";
// style
import "./Home.css";

export default function Home() {
  return (
    <div className="home-container">
      <h1>Codex of Tomorrow</h1>
      <p>
        Knowledge shapes our minds, and books are the spells that weave
        intelligence across time. Each page holds the power to spark innovation,
        guiding us to a future yet unwritten...
      </p>
      <Link to="./books">Find your magic wand</Link>
    </div>
  );
}
