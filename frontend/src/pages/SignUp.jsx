import { useState } from 'react'
import './MainPage.css'
import eighth_sibu_logo from '../assets/8th_sibu_logo.jpg'
import { FiArrowLeft } from 'react-icons/fi'
import { signup } from '../api/auth'

function SignUp({ onLogin }) {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [telephone, setTelephone ] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSignup = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    setIsSubmitting(true)
    try {
      await signup({ firstName, lastName, telephone, email, password })
      setSuccess('Account created! Redirecting to login…')
      setTimeout(() => onLogin?.(), 1200)
    } catch (err) {

      setError(err.message || 'Sign up failed')
      
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="signup-page">
      <header className="signup-header">
        <button
          type="button"
          className="back-btn"
          onClick={onLogin}
          aria-label="Back to login"
        >
          <FiArrowLeft className="back-btn__icon" aria-hidden="true" />
        </button>
      </header>
      <section id="center">
        <div className="logo">
          <img src={eighth_sibu_logo} alt="logo" width="170" height="179" />
        </div>
        <div className="auth-session">
          <h2>Create your account</h2>
          {error && <p className="auth-message auth-message--error">{error}</p>}
          {success && <p className="auth-message auth-message--success">{success}</p>}
          <form className="auth-form" onSubmit={handleSignup}>
            <div className="auth-field-group">
              <h2 className="auth-field-label">Name</h2>
              <div className="auth-field-row">
                <label className="auth-field">
                  <input
                    type="text"
                    name="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First name"
                    autoComplete="given-name"
                    required
                  />
                </label>
                <label className="auth-field">
                  <input
                    type="text"
                    name="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Last name"
                    autoComplete="family-name"
                    required
                  />
                </label>
              </div>
            </div>
            <label className="auth-field">
              <h2 className="auth-field-label">Phone number</h2>
              <input
                type="tel"
                name="telephone"
                value={telephone}
                onChange={(e) => setTelephone(e.target.value)}
                placeholder="Phone number"
                autoComplete="tel"
                required
              />
            </label>
            <label className="auth-field">
              <h2 className="auth-field-label">Email address</h2>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                autoComplete="email"
                required
              />
            </label>
            <label className="auth-field">
              <h2 className="auth-field-label">Password</h2>  
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                autoComplete="new-password"
                minLength={8}
                required
              />
            </label>
            <label className="auth-field">
              <input
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm password"
                autoComplete="new-password"
                minLength={8}
                required
              />
            </label>
            <div className="auth-actions">
              <button
                type="submit"
                className="auth-btn auth-btn--primary"
                disabled={isSubmitting || !!success}
              >
                {isSubmitting ? 'Creating account…' : 'Sign up'}
              </button>
            </div>
            <div className="auth-session-signup">
              Already have an account?{' '}
              <button type="button" className="auth-link" onClick={onLogin}>
                Log in
              </button>
            </div>
          </form>
        </div>
      </section>

      <div className="ticks"></div>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </div>
  )
}

export default SignUp
