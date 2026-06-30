import { useNavigate } from "react-router-dom";
function Hero() {
  const navigate = useNavigate();
  return (
    <section className="hero">
      <div className="hero-left">
        <span className="badge">🚀 AI Powered Platform</span>

        <h1>Smarter Cities Start Here</h1>

        <h2>CivicAI Sentinel</h2>

        <p>
          Report civic issues in seconds using AI. Upload an image and let AI
          identify the problem, categorize it, and send it to the municipality.
        </p>

        <div className="hero-buttons">
          <button
            className="primary-btn"
            onClick={() => navigate("/report")}
          >
            🚨 Report Issue
          </button>
          <button className="secondary-btn">
            ▶ Learn More
          </button>
        </div>
      </div>

      <div className="hero-right">
        <div className="hero-card">
          🤖 AI
          <br />
          Detects potholes, garbage,
          <br />
          streetlights and more.
        </div>
      </div>
    </section>
  );
}

export default Hero;