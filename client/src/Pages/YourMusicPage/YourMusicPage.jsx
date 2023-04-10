import React, { useEffect, useState } from "react";
import Carousel from "../../Components/Carousel/Carousel";
import TopSongs from "../../Components/TopSongs/TopSongs";
import YourMusicPageSkeleton from "../../Components/SkeletonLoading/YourMusicPageSkeleton";
import {
  getCurrentUserRecentPlayedTracks,
  getCurrentUserSavedTracks,
  getCurrentUserTopItems,
} from "../../Authenticate/spotify";

export default function YourMusicPage({ accessToken }) {
  const [savedTracks, setSavedTracks] = useState(null);
  const [topSongs, setTopSongs] = useState(null);
  const [recentlyPlayed, setRecentlyPlayed] = useState(null);
  const [topArtists, setTopArtists] = useState(null);
  const [isLoading, setIsLoading] = useState({
    loadingTopTracks: true,
    loadingRecentlyPlayed: true,
    loadingTopArtists: true,
    loadingSavedTracks: true,
  });
  const [isError, setIsError] = useState({
    recentlyPlayedTracks: false,
    yourTopArtists: false,
    yourSavedTracks: false,
    yourTopTracks: false,
  });

  const fetchUserTopArtists = async () => {
    try {
      const { data: userTopArtists } = await getCurrentUserTopItems(
        "artists",
        20
      );
      setTopArtists(userTopArtists.items);
    } catch (error) {
      console.error(error);
      setIsError({ yourTopArtists: true });
    } finally {
      setIsLoading({ loadingTopArtists: false });
    }
  };

  const fetchUserTopTracks = async () => {
    try {
      const { data: userTopTracks } = await getCurrentUserTopItems(
        "tracks",
        10
      );
      setTopSongs(userTopTracks.items);
    } catch (error) {
      console.error(error);
      setIsError({ yourTopTracks: true });
    } finally {
      setIsLoading({ loadingTopTracks: false });
    }
  };

  const fetchUserSavedTracks = async () => {
    try {
      const { data: userSavedTracks } = await getCurrentUserSavedTracks(20, 0);
      setSavedTracks(userSavedTracks.items);
    } catch (error) {
      console.error(error);
      setIsError({ yourSavedTracks: true });
    } finally {
      setIsLoading({ loadingSavedTracks: false });
    }
  };

  const fetchUserRecentPlayedTracks = async () => {
    try {
      const { data: userRecentPlayedTracks } =
        await getCurrentUserRecentPlayedTracks(20, 1664611200000);
      setRecentlyPlayed(userRecentPlayedTracks.items);
    } catch (error) {
      console.error(error);
      setIsError({ recentlyPlayedTracks: true });
    } finally {
      setIsLoading({ loadingRecentlyPlayed: false });
    }
  };

  useEffect(() => {
    fetchUserTopTracks();
    fetchUserTopArtists();
    fetchUserSavedTracks();
    fetchUserRecentPlayedTracks();
  }, []);

  if (Object.values(isLoading).every(Boolean)) {
    return <YourMusicPageSkeleton />;
  }

  if (Object.values(isError).every(Boolean)) {
    return (
      <div className="your-music-page-container">
        <div className="error-msg">
          <h1>You don't use Spotify frequently.</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="your-music-page-container">
      {!isError.yourSavedTracks && savedTracks?.length > 0 && (
        <Carousel title={"Your Saved Tracks"} data={savedTracks} />
      )}
      {!isError.yourTopTracks && topSongs?.length > 0 && (
        <TopSongs title={"Your Top Tracks"} topTracks={topSongs} />
      )}
      {!isError.recentlyPlayedTracks && recentlyPlayed?.length > 0 && (
        <Carousel title={"Recently Played Tracks"} data={recentlyPlayed} />
      )}
      {!isError.yourTopArtists && topArtists?.length > 0 && (
        <Carousel title={"Your Top Artists"} data={topArtists} />
      )}
    </div>
  );
}
