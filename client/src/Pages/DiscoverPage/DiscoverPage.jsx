import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  getPlaylist,
  getPlaylistsForCategories,
} from "../../Authenticate/spotify";
import BrowsePageSkeleton from "../../Components/SkeletonLoading/BrowsePageSkeleton";
import { SongContext } from "../../Components/SongContext/SongContext";

export default function DiscoverPage() {
  const { id } = useParams();
  const { setTrackData, setQueue } = useContext(SongContext);
  const [playlistsForCategories, setPlaylistsForCategories] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getPlaylistsForCategories(50, id);
        setPlaylistsForCategories(data.playlists.items);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const addToTracksQueue = async (e, id) => {
    e.preventDefault();
    try {
      const { data } = await getPlaylist(id);
      setTrackData(data?.tracks?.items?.[0]?.track);
      setQueue(data?.tracks?.items?.filter((_, index) => index > 0));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {isLoading ? (
        <BrowsePageSkeleton />
      ) : (
        <div className="discover-page-container">
          {playlistsForCategories.map((item, index) => (
            <Link key={index} to={`/playlist/${item?.id}`} className="link">
              <div className="discover-page-container__box">
                <img
                  loading="eager"
                  src={item?.images?.[0]?.url}
                  alt={item?.name + "-img"}
                />
                <div className="hover-buttons">
                  <button
                    onClick={(e) => addToTracksQueue(e, item?.id)}
                    className="play-btn"
                  >
                    <i className="fas fa-play"></i>
                  </button>
                  <button className="add-to-queue-btn">
                    <i className="fas fa-ellipsis-h"></i>
                  </button>
                </div>
                <p className="link-tag">{item?.name}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
