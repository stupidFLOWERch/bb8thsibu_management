import './Button.css'

function SubmitButton({ onClick, loading, children }) {
    return (
      <button
        className="submit-btn"
        onClick={onClick}
        disabled={loading}
      >
        {loading ? "Submitting..." : children}
      </button>
    );
}

export default SubmitButton