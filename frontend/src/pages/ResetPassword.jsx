import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { resetPassword } from "../api/auth";
import BackButton from "../components/BackButton";
import Logo from "../components/Logo";

function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");
    setIsSubmitting(true);

    try {
      const res = await resetPassword({ token, password });

      setMessage("Password reset successful. You can close this tab.");

      setTimeout(() => {
        navigate("/");
      }, 3000);

    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="signup-page">

      <header className="signup-header">
        <BackButton />
      </header>

      <section id="center">
        <Logo />

        <div className="auth-session">
          <h2>Reset your password</h2>

          <p className="mb-3">
            Enter your new password below.
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
              <span>New password</span>

              <input
                type="password"
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>

            <div className="auth-actions">
              <button
                type="submit"
                className="auth-btn auth-btn--primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Resetting..." : "Reset Password"}
              </button>
            </div>

            <div className="auth-session-signup">
              Remembered your password?{" "}
              <button
                type="button"
                className="auth-link"
                onClick={() => navigate("/")}
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
  );
}

export default ResetPassword;