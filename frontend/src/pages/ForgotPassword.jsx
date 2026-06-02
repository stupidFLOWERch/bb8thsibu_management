import { useState } from 'react'
import './AuthPage.css'

import { forgotPassword } from '../api/auth'

import Logo from '../components/Logo'
import BackButton from '../components/BackButton'

function ForgotPassword({ onLogin }) {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    setError('')
    setMessage('')
    setIsSubmitting(true)

    try {
      await forgotPassword({email})

      console.log('Reset password request:', email)

      setMessage(
        'If an account exists for this email, a reset link has been sent.'
      )
    } catch (err) {
      setError(err.message || 'Something went wrong.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="signup-page">
      <header className="signup-header">
        <BackButton onClick={onLogin} />
      </header>

      <section id="center">
        <Logo />

        <div className="auth-session">
          <h2>Forgot your password? </h2>

          <p className="mb-3">
            Enter your email address and we'll send you a link to reset password.
          </p>

          {error && (
            <p className="auth-message auth-message--error">
              {error}
            </p>
          )}

          {message && (
            <p className="auth-message auth-message--success">
              {message}
            </p>
          )}

          <form className="auth-form" onSubmit={handleSubmit}>
            <label className="auth-field">
              <h2 className="auth-field-label">
                Email address
              </h2>

              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                autoComplete="email"
                required
              />
            </label>

            <div className="auth-actions">
              <button
                type="submit"
                className="auth-btn auth-btn--primary"
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? 'Sending reset link…'
                  : 'Send reset link'}
              </button>
            </div>

            <div className="auth-session-signup">
              Remember your password?{' '}

              <button
                type="button"
                className="auth-link"
                onClick={onLogin}
              >
                Back to login
              </button>
            </div>
          </form>
        </div>
      </section>

      <div className="ticks"></div>

      <section id="spacer"></section>
    </div>
  )
}

export default ForgotPassword