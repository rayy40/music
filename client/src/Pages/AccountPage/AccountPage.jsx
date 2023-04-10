import React, { useContext } from "react";
import { SongContext } from "../../Components/SongContext/SongContext";

const AccountPage = () => {
  const { profile } = useContext(SongContext);

  console.log(profile);
  return (
    <div className="account-page-container">
      <h2>Account</h2>
      <div className="account-page-container__content">
        <div className="account-page-container--sidebar">
          <p>Log out</p>
        </div>
        <div className="account-page-container--details">
          <table>
            <tbody>
              <tr>
                <td>Name</td>
                <td>{profile?.display_name}</td>
              </tr>
              <tr>
                <td>Country</td>
                <td>{profile?.country}</td>
              </tr>
              <tr>
                <td>Email</td>
                <td>{profile?.email}</td>
              </tr>
              <tr>
                <td>Followers</td>
                <td>{profile?.followers?.total}</td>
              </tr>
              <tr>
                <td>Subscribed</td>
                <td>{profile?.product === "free" ? "No" : "Yes"}</td>
              </tr>
              <tr>
                <td>Spotify</td>
                <td>
                  <a href={profile?.href}>Go to Spotify</a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
