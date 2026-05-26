import { useState } from 'react'
import './MainPage.css'
import eighth_sibu_logo from './assets/8th_sibu_logo.jpg'
import { FaFacebook, FaInstagram, FaWhatsapp, FaYoutube } from 'react-icons/fa'
import { FiMapPin } from 'react-icons/fi'

function MainPage({ onSignup }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (e) => {
    e.preventDefault()
    // TODO: connect to auth API
    console.log('Login', { email, password })
  }

  return (
    <>
      <section id="center">
        <div className="logo">
          <img src={eighth_sibu_logo} alt="logo" width="170" height="179" />
        </div>
          <div className="auth-session">
            <h2> Log in to continue </h2>
            <form className="auth-form" onSubmit={handleLogin}>
              <label className="auth-field">
                <input
                  type="text"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  autoComplete="email"
                  required
                />
              </label>
              <label className="auth-field">
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  autoComplete="current-password"
                  required
                />
              </label>
              <div className="auth-actions">
                <button type="submit" className="auth-btn auth-btn--primary">
                  Login
                </button>
              </div>
              <div className="auth-actions">
                <button type="button" className="auth-btn auth-btn--secondary">
                  Forgotten password?
                </button>
              </div>
            </form>
            <div className="auth-session-signup">
              Don't have an account?{' '}
              <button type="button" className="auth-link" onClick={onSignup}>
                Sign up
              </button>
            </div>
          </div>
      </section>

      <div className="ticks"></div>

      <section id="next-steps">
        <div id="about-us">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#documentation-icon"></use>
          </svg>
          <h2>About us</h2>
          <p>Our meeting times</p>
          <table className="meeting-table">
            <thead>
              <tr>
                <th scope="col">Section</th>
                <th scope="col">Time (Saturday)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Pre-Junior / Junior</td>
                <td>2:00 PM – 4:00 PM</td>
              </tr>
              <tr>
                <td>Senior</td>
                <td>2:00 PM – 4:30 PM</td>
              </tr>
            </tbody>
          </table>
          <ul>
            <li>
              <a href="https://maps.app.goo.gl/TZESp66j7KHioue27" target="_blank" rel="noreferrer">
                <FiMapPin className="button-icon location-icon" aria-hidden="true" />
                Explore Location
              </a>
            </li>
            {/* <li>
              <a href="https://react.dev/" target="_blank">
                <img className="button-icon" src={reactLogo} alt="" />
                Learn more
              </a>
            </li> */}
          </ul>
        </div>
        <div id="social">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#social-icon"></use>
          </svg>
          <h2>Connect with us</h2>
          <p>Join 8th Sibu Company community</p>
          <ul>
            <li>
              <a href="https://www.facebook.com/p/8th-Sibu-Company-100064614709104/" target="_blank">
                <FaFacebook className="button-icon facebook-icon" />
                Facebook
              </a>
            </li>
            <li>
              <a href="https://web.whatsapp.com/" target="_blank">
                <FaWhatsapp className="button-icon whatsapp-icon" />
                Whatsapp
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/8thbbsibu/" target="_blank">
                <FaInstagram className="button-icon instagram-icon" />
                Instagram
              </a>
            </li>
            <li>
              <a href="https://www.youtube.com/" target="_blank">
                <FaYoutube className="button-icon youtube-icon" />
                YouTube
              </a>
            </li>
          </ul>
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default MainPage
