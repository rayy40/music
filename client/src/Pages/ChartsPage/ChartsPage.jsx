import React, { useContext } from "react";
import { charts } from "../../Helpers/utilities";
import { Link } from "react-router-dom";
import { getPlaylist } from "../../Authenticate/spotify";
import { SongContext } from "../../Components/SongContext/SongContext";

export default function ChartsPage() {
  const { setTrackData, setQueue } = useContext(SongContext);

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
    <div className="charts-page-container">
      {charts &&
        charts.map((item, index) => (
          <Link key={index} to={`playlist/${item?.id}`} className="link">
            <div className="charts-page-container__box">
              <img loading="lazy" src={item?.img} alt={item?.name + "-img"} />
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
  );
}
