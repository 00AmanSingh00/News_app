import React from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from '../utils/supabaseClient'; // Import the Supabase client
import logoutIcon from "../assets/logout.png"; // Ensure the path to the icon is correct

const Logout = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const [isRotating, setIsRotating] = React.useState(false);
  const [isClicked, setIsClicked] = React.useState(false);

  const handleLogout = async () => {
    try {
      setIsClicked(true);
      setIsRotating(true);

      await new Promise((resolve) => setTimeout(resolve, 1000));

      await supabase.auth.signOut();

      setIsAuthenticated(false); // Update authentication state
      navigate('/auth', { replace: true }); // Redirect to auth page
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setIsRotating(false);
      setIsClicked(false);
    }
  };

  return (
    <button
      onClick={handleLogout}
      style={{
        background: "transparent",
        border: "none",
        cursor: "pointer",
        marginLeft: "auto",
        transform: isRotating ? "rotateY(180deg)" : "rotateY(0deg)",
        transition: "transform 1s ease, color 0.3s ease",
        color: isClicked ? "black" : "#3A1212",
      }}
    >
      <img
        src={logoutIcon}
        alt="logout"
        style={{ width: "41px", height: "41px", margin: "0px 20px" }}
      />
    </button>
  );
};

export default Logout;