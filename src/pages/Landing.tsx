
import '../styles/Landing.css'
import Logo from "../assets/logo.png"
function Landing() {
  return (
    <div className="landing-page">
      <div className="login-signup-bar">
        <span className='login'>LOG IN</span>
        <span className='sign-up'>SIGN UP</span>
      </div>
      <div className='hero-image-container'>
      </div>
      <div className="content">
        <img src={Logo} alt="" />
        <h1>ORGANIZE. TRACK. GET HIRED.</h1>
        <h3>Stay on top of your job search with Job Hunt Tracker  your free tool to manage applications, monitor progress, and land your next opportunity with confidenc</h3>
      </div>
    </div>
  )
}
export default Landing;