import { useState } from 'react'
import '../styles/AuthPage.css'
import Logo from '../components/Logo'
import { FaFacebook, FaInstagram, FaWhatsapp, FaYoutube } from 'react-icons/fa'
import { FiMapPin } from 'react-icons/fi'
import { login } from '../api/auth'
import { getMemberRanking } from '../api/member'
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    setIsSubmitting(true)

    try {
      const data = await login({ email, password });
      const ranking = await getMemberRanking(email)

      localStorage.setItem(
        "user",
        JSON.stringify({
          ...data.user,
          rank: ranking.rank,
          role: ranking.role
        })
      );

      if (ranking.role === "Boys"){
        if (ranking.rank === "Pte"){
          navigate("/menu");
        }

        else {
          navigate("/nco-menu");
        }
      }
      
      
      

    } catch (err) {
      setError(err.message || 'Login failed. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div>
      <section id="center">
        <Logo />

        <div className="auth-session">
          <h2>Log in to continue</h2>

          {error && (
            <p className="auth-message auth-message--error">
              {error}
            </p>
          )}

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
              <button
                type="submit"
                className="auth-btn auth-btn--primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Logging in…' : 'Login'}
              </button>
            </div>

            <div className="auth-actions">
              <button
                type="button"
                className="auth-btn auth-btn--secondary"
                onClick={() => navigate("/forgot-password")}
              >
                Forgotten password?
              </button>
            </div>
          </form>

          <div className="auth-session-signup">
            Don't have an account?{' '}
            <button
              type="button"
              className="auth-link"
              onClick={() => navigate("/signup")}
            >
              Sign up
            </button>
          </div>
        </div>
      </section>

      <div className="ticks"></div>

      <section id="next-steps">
      <div id="about-us">
      <h2>About us</h2>

      <p>Our meeting times</p>

      <table className="meeting-table">
        <thead>
          <tr>
            <th>Section</th>
            <th>Time (Saturday)</th>
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
          <a
            href="https://maps.app.goo.gl/TZESp66j7KHioue27"
            target="_blank"
            rel="noreferrer"
          >
            <FiMapPin
              className="button-icon location-icon"
              aria-hidden="true"
            />
            Explore Location
          </a>
        </li>
      </ul>
    </div>

    <div id="social">
        <h2>Connect with us</h2>
  
        <p>Join 8th Sibu Company community</p>
  
        <ul>
          <li>
            <a
              href="https://www.facebook.com/p/8th-Sibu-Company-100064614709104/"
              target="_blank"
            >
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
            <a
              href="https://www.instagram.com/8thbbsibu/"
              target="_blank"
            >
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
      </div>
  )
}

export default Login