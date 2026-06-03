import { FiArrowLeft } from 'react-icons/fi'
import { useNavigate } from "react-router-dom";

function BackButton() {
  const navigate = useNavigate();
  return (
    <button
      type="button"
      className="back-btn"
      onClick={() => navigate("/")}
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