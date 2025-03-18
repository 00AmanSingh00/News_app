// src/components/Auth.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from '../utils/supabaseClient'; // Import the Supabase client

const Auth = ({ setIsAuthenticated }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is already authenticated
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession(); // Use getSession() instead of session()
      if (session) {
        setIsAuthenticated(true);
        navigate("/");
      }
    };

    checkSession();
  }, [navigate, setIsAuthenticated]);

  const handleAuth = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (isLogin) {
        // Use signInWithPassword for login
        response = await supabase.auth.signInWithPassword({ email, password });
      } else {
        // Use signUp for signup
        response = await supabase.auth.signUp({ email, password });
      }

      if (response.error) throw response.error;

      setMessage(isLogin ? "Login successful" : "Signup successful, please check your email for verification.");
      if (isLogin) {
        setIsAuthenticated(true); // Update authentication state
        navigate("/"); // Redirect to home page
      }
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div style={styles.container}>
      {/* Video Background */}
      <video autoPlay loop muted style={styles.videoBackground}>
        <source src="/assets/background_video" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Auth Box */}
      <div style={styles.authBox}>
        <h2 style={styles.heading}>{isLogin ? "Login" : "Signup"}</h2>
        <form onSubmit={handleAuth} style={styles.form}>
          <label style={styles.label}>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />
          <label style={styles.label}>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />
          <button type="submit" style={styles.button}>
            {isLogin ? "Login" : "Signup"}
          </button>
        </form>
        <p style={styles.message}>{message}</p>
        <button
          onClick={() => setIsLogin(!isLogin)}
          style={styles.switchButton}
        >
          {isLogin ? "Switch to Signup" : "Switch to Login"}
        </button>
      </div>
    </div>
  );
};

// Custom CSS Styles
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    width: "100vw",
    position: "relative",
    overflow: "hidden",
    fontFamily: "Helvetica, Arial, sans-serif",
  },
  videoBackground: {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transform: "translate(-50%, -50%)",
    zIndex: -1, // Ensure the video is behind the auth box
  },
  authBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    background: "rgba(14, 15, 15, 0.8)", // Semi-transparent dark background
    padding: "40px",
    borderRadius: "20px",
    boxShadow: "10px 7px 4px rgba(28, 28, 28, 0.5)",
    textShadow: "2px 2px 4px #08fcd0",
    color: "white",
    zIndex: 1, // Ensure the auth box is above the video
    maxWidth: "90%", // Responsive width
    width: "400px", // Fixed width for larger screens
  },
  heading: {
    fontSize: "27px",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },
  label: {
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "5px",
  },
  input: {
    width: "100%",
    height: "40px",
    fontSize: "18px",
    padding: "10px",
    marginBottom: "15px",
    borderRadius: "14px",
    border: "1px solid #ccc",
    color: "white",
    backgroundColor: "rgba(28, 28, 28, 0.8)", // Semi-transparent dark background
  },
  button: {
    width: "100%",
    height: "45px",
    fontSize: "20px",
    background: "#0f0b00",
    color: "white",
    border: "1px solid #1f1e1d",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "10px",
    transition: "background 0.3s ease",
  },
  switchButton: {
    marginTop: "10px",
    fontSize: "18px",
    background: "transparent",
    border: "none",
    color: "grey",
    cursor: "pointer",
    textDecoration: "underline",
  },
  message: {
    fontSize: "16px",
    color: "red",
    marginTop: "10px",
  },
};

export default Auth;