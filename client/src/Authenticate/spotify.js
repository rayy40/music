import axios from "axios";
import { getHashParams } from "../Helpers/utilities";

// TOKENS ******************************************************************************************
const EXPIRATION_TIME = 3600 * 1000; // 3600 seconds * 1000 = 1 hour in milliseconds

const setTokenTimestamp = () =>
  window.localStorage.setItem("spotify_token_timestamp", Date.now());
const setLocalAccessToken = (token) => {
  setTokenTimestamp();
  window.localStorage.setItem("spotify_access_token", token);
};
const setLocalRefreshToken = (token) =>
  window.localStorage.setItem("spotify_refresh_token", token);
const getTokenTimestamp = () =>
  window.localStorage.getItem("spotify_token_timestamp");
const getLocalAccessToken = () =>
  window.localStorage.getItem("spotify_access_token");
const getLocalRefreshToken = () =>
  window.localStorage.getItem("spotify_refresh_token");

// Refresh the token
const refreshAccessToken = async () => {
  try {
    const { data } = await axios.get(
      `/refresh_token?refresh_token=${getLocalRefreshToken()}`
    );
    const { access_token } = data;
    setLocalAccessToken(access_token);
    window.location.reload();
    return;
  } catch (e) {
    console.error(e);
  }
};

// Get access token off of query params (called on application init)
export const getAccessToken = () => {
  const { error, access_token, refresh_token } = getHashParams();

  if (error) {
    console.error(error);
    refreshAccessToken();
  }

  // If token has expired
  if (Date.now() - getTokenTimestamp() > EXPIRATION_TIME) {
    console.warn("Access token has expired, refreshing...");
    refreshAccessToken();
  }

  const localAccessToken = getLocalAccessToken();

  // If there is no ACCESS token in local storage, set it and return `access_token` from params
  if ((!localAccessToken || localAccessToken === "undefined") && access_token) {
    setLocalAccessToken(access_token);
    setLocalRefreshToken(refresh_token);
    return access_token;
  }

  return localAccessToken;
};

export const token = getAccessToken();

export const logout = () => {
  window.localStorage.removeItem("spotify_token_timestamp");
  window.localStorage.removeItem("spotify_access_token");
  window.localStorage.removeItem("spotify_refresh_token");
  window.location.reload();
};

axios.defaults.baseURL = "https://api.spotify.com/v1";
axios.defaults.headers["Authorization"] = `Bearer ${token}`;
axios.defaults.headers["Content-Type"] = "application/json";

export const getCurrentUserProfile = () => axios.get("/me");

export const getCategories = (limit, country) =>
  axios.get("/browse/categories", {
    params: {
      limit: limit,
      country: country,
    },
  });

export const getPlaylistsForCategories = (limit, category_id) =>
  axios.get(`/browse/categories/${category_id}/playlists`, {
    params: {
      limit: limit,
    },
  });

export const getFeaturedPlaylists = (country_id) =>
  axios.get(`/browse/featured-playlists`, {
    params: {
      country: country_id,
    },
  });

export const getPlaylist = (playlist_id) =>
  axios.get(`/playlists/${playlist_id}`);

export const getAlbum = (album_id) => axios.get(`/albums/${album_id}`);

export const getAlbumTracks = (album_id) =>
  axios.get(`/albums/${album_id}/tracks`);

export const getArtist = (artist_id) => axios.get(`/artists/${artist_id}`);

export const getTrack = (track_id) => axios.get(`/tracks/${track_id}`);

export const getArtistTopTracks = (artist_id, country) =>
  axios.get(`/artists/${artist_id}/top-tracks?market=${country}`);

export const getArtistAlbums = (artist_id, limit, offset) =>
  axios.get(`/artists/${artist_id}/albums`, {
    params: {
      limit: limit,
      offset: offset,
    },
  });

export const getArtistRelatedArtists = (artist_id) =>
  axios.get(`/artists/${artist_id}/related-artists`);

export const getNewReleases = (limit, offset) =>
  axios.get(`/browse/new-releases`, {
    params: {
      limit: limit,
      offset: offset,
    },
  });

export const getCurrentUserSavedTracks = (limit, offset) =>
  axios.get(`/me/tracks`, {
    params: {
      limit: limit,
      offset: offset,
    },
  });

export const getCurrentUserTopItems = (type, limit, offset) =>
  axios.get(`/me/top/${type}`, {
    params: {
      limit: limit,
    },
  });

export const getCurrentUserRecentPlayedTracks = (limit, after) =>
  axios.get(`/me/player/recently-played/`, {
    params: {
      limit: limit,
      after: after,
    },
  });
