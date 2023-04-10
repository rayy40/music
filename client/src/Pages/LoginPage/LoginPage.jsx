import React from "react";

export default function Login() {
  const LOGIN_URI =
    process.env.NODE_ENV !== "production" ? "http://localhost:5000/login" : "";

  return (
    <div className="login-page-container">
      <div className="login-page--background-img">
        <img
          src={
            window.matchMedia("(min-width:600px)").matches
              ? `Images/login-page-img.jpg`
              : `Images/login-mobile-page-img.jpg`
          }
          alt="background-img"
        />
        <a href={LOGIN_URI} className="login-btn">
          Login with Spotify
        </a>
      </div>
    </div>
  );
}
