import { useNavigate } from "react-router-dom";

function Hero() {
  const navigate = useNavigate();

  const handleExplore = () => {
    navigate("/marketplace");
  };

  return (
    <section className="hero">
      <div className="hero-overlay">

        <span className="hero-badge">
          🇮🇳 Supporting Local Micro-Entrepreneurs
        </span>

        <h1>Discover Authentic Handmade Products</h1>

        <p>
          Shop directly from skilled artisans across India. Every purchase
          supports local craftsmanship and traditional skills.
        </p>

        <div className="hero-search">

          <input
            type="text"
            placeholder="Search products, artisans or cities..."
          />

          <button onClick={handleExplore}>
            Explore
          </button>

        </div>

      </div>
    </section>
  );
}

export default Hero;