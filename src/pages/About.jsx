// react-router-dom
import { Link } from "react-router-dom";

// asset
import aboutHero from "/assets/about-hero.png";

// style
import "./About.css";

export default function About() {
  return (
    <div className="about-page-container">
      <img src={aboutHero} className="about-hero-image" />
      <div className="about-page-content">
        <h1>Unlock the Your Magic Power, One Page at a Time.</h1>
        <p>
          knowledge is the spark that fuels innovation. Books are more than just
          words—they are the blueprints of tomorrow, carrying wisdom across
          generations.
        </p>
        <p>
          Our carefully curated collection of tech books connects minds,
          inspires breakthroughs, and ensures that knowledge never fades but
          evolves. Whether you seek to master code, explore AI, or push the
          limits of technology, your journey begins here.
        </p>
      </div>
      <div className="about-page-cta">
        <h2>
          You owl is waiting.
          <br />
          Open a book and set it free.
        </h2>
        <Link className="link-button" to="/books">
          Explore our collection
        </Link>
      </div>
    </div>
  );
}
