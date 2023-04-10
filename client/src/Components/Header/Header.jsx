import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SongContext } from "../SongContext/SongContext";
import { getCurrentUserProfile } from "../../Authenticate/spotify";

export default function Header() {
  const { profile, setProfile } = useContext(SongContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [toggle, setToggle] = useState(false);

  const fetchUserProfile = async () => {
    try {
      const { data } = await getCurrentUserProfile();
      setProfile(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (window.innerWidth < 1024) {
    window.addEventListener("scroll", function () {
      if (window.scrollY > 100) {
        document.querySelector(".header").classList.add("header--active");
      } else {
        document.querySelector(".header").classList.remove("header--active");
      }
    });
  }

  return (
    <div>
      {!isLoading && (
        <div className="header">
          <div className="navbar-icons">
            {isNavOpen ? (
              <i
                onClick={() => {
                  document
                    .querySelector(".header--extension")
                    .classList.remove("header--extension-active");
                  setIsNavOpen(false);
                }}
                className="fas fa-times"
              ></i>
            ) : (
              <i
                onClick={() => {
                  document
                    .querySelector(".header--extension")
                    .classList.add("header--extension-active");
                  setIsNavOpen(true);
                }}
                className="fas fa-bars"
              ></i>
            )}
          </div>
          <Link to={"/"}>
            <div className="logo">
              <i
                className="fas fa-compact-disc"
                style={{ color: "#d85555" }}
              ></i>
              <h3>UNIVERSAL</h3>
            </div>
          </Link>
          <div className="links">
            <Link to="/browse">Browse</Link>
            <Link to="/charts">Charts</Link>
            <Link to="/yourMusic">Your Music</Link>
          </div>
          <div className="user">
            <div onClick={() => setToggle(!toggle)} className="user-img">
              <img
                src={
                  profile?.images?.[0]?.url
                    ? profile.images[0].url
                    : "https://media.istockphoto.com/vectors/male-avatar-profile-picture-vector-id1164822188?k=20&m=1164822188&s=612x612&w=0&h=Jsyx0Ea7_cSdATgc0NHtzFUPt1YfNVKqF74ZkIrv5UM="
                }
                alt=""
              />
            </div>
            {toggle && (
              <div
                onClick={() => setToggle(false)}
                className="navbar-signing-container"
              >
                <i className="fas fa-caret-up"></i>
                <a href="https://accounts.spotify.com/en/logout">Sign Out</a>
              </div>
            )}
            <p>{profile.display_name}</p>
          </div>
        </div>
      )}
      <div className="header--extension">
        <div className="links--extension">
          <ul>
            <li>
              <Link
                onClick={() => {
                  document
                    .querySelector(".header--extension")
                    .classList.remove("header--extension-active");
                  setIsNavOpen(false);
                }}
                to="/browse"
              >
                Browse
              </Link>
              <i className="fas fa-chevron-right"></i>
            </li>
            <li>
              <Link
                onClick={() => {
                  document
                    .querySelector(".header--extension")
                    .classList.remove("header--extension-active");
                  setIsNavOpen(false);
                }}
                to="/charts"
              >
                Charts
              </Link>
              <i className="fas fa-chevron-right"></i>
            </li>
            <li>
              <Link
                onClick={() => {
                  document
                    .querySelector(".header--extension")
                    .classList.remove("header--extension-active");
                  setIsNavOpen(false);
                }}
                to="/yourMusic"
              >
                Your Music
              </Link>
              <i className="fas fa-chevron-right"></i>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
