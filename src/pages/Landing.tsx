import { Link } from "react-router-dom";
import "../styles/Landing.css";
import Logo from "../assets/logo.png";

function Landing() {
  return (
    <div className="landing-page">
      <div className="login-signup-bar">
        <div>
          <img src={Logo} alt="Logo" />
        </div>
        <div className="login-signup-btn">
          <span className="login">LOG IN</span>
          <span className="sign-up">SIGN UP</span>
        </div>
      </div>

      <div className="hero-image-container"></div>

      <div className="content">
        <h1>ORGANIZE. TRACK. GET HIRED.</h1>
        <h2>
          Stay on top of your job search with Job Hunt Tracker. Your free tool
          to manage applications, monitor progress, and land your next
          opportunity with confidence
        </h2>
        <Link to="/home" className="try-btn">
          TRY IT NOW
        </Link>
      </div>
    </div>
  );
}

export default Landing;
