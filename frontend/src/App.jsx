import { useState } from 'react'
import './App.css'
import eighth_sibu_logo from './assets/8th_sibu_logo.jpg'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import { FaFacebook, FaInstagram, FaWhatsapp, FaYoutube } from "react-icons/fa";

function App() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (e) => {
    e.preventDefault()
    // TODO: connect to auth API
    console.log('Login', { username, password })
  }

  const handleSignup = (e) => {
    e.preventDefault()
    // TODO: connect to auth API
    console.log('Sign up', { username, password })
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
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  autoComplete="username"
                  required
                />
              </label>
              <label className="auth-field">
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
                />
              </label>
              <div className="auth-actions">
                <button type="submit" className="auth-btn auth-btn--primary">
                  Login
                </button>
                <button
                  type="button"
                  className="auth-btn auth-btn--secondary"
                  onClick={handleSignup}
                >
                  Sign up
                </button>
              </div>
            </form>
          </div>
      </section>

      <div className="ticks"></div>

      <section id="next-steps">
        <div id="docs">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#documentation-icon"></use>
          </svg>
          <h2>Documentation</h2>
          <p>Your questions, answered</p>
          <ul>
            <li>
              <a href="https://vite.dev/" target="_blank">
                <img className="logo" src={viteLogo} alt="" />
                Explore Vite
              </a>
            </li>
            <li>
              <a href="https://react.dev/" target="_blank">
                <img className="button-icon" src={reactLogo} alt="" />
                Learn more
              </a>
            </li>
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

export default App
