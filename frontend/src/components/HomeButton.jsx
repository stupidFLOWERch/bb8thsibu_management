import { useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";

function HomeButton() {
  const navigate = useNavigate();

  const handleHome = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      navigate("/");
      return;
    }
    if (user.role === "Boys") {
      if (user.rank === "Pte") {
        navigate("/menu");
      }
      else{
        navigate("/nco-menu");
      }
    } 
    else if (user.role === "Officers") {
      if (user.rank === "Capt") {
        navigate("/menu");
      }

      else{
        navigate("/officer-menu");
      }
    } 
    else {
      navigate("/");
    }
  };

  return (
    <button
      type="button"
      className="btn"
      onClick={handleHome}
      aria-label="Home"
    >
      <FaHome
        className="btn__icon"
        aria-hidden="true"
      />
    </button>
  );
}

export default HomeButton;