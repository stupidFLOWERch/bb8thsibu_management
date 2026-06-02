import { FiArrowLeft } from 'react-icons/fi'

function BackButton({ onClick }) {
  return (
    <button
      type="button"
      className="back-btn"
      onClick={onClick}
      aria-label="Back"
    >
      <FiArrowLeft
        className="back-btn__icon"
        aria-hidden="true"
      />
    </button>
  )
}

export default BackButton