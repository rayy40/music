import React, { useContext } from "react";
import { SongContext } from "../SongContext/SongContext";
import { Link } from "react-router-dom";

const QueueList = () => {
  const { queue, setQueue, setTrackData } = useContext(SongContext);

  const handleDeleteTrack = (index) => {
    const newQueue = [...queue];
    newQueue.splice(index, 1);
    setQueue(newQueue);
  };

  const handleTrackClick = (clickedTrack) => {
    const clickedIndex = queue.findIndex(
      (track) => track.id === clickedTrack.id
    );
    const newQueue = queue.slice(clickedIndex + 1);
    setQueue(newQueue);
    console.log(clickedTrack);
    setTrackData(clickedTrack);
  };
  return (
    <ul>
      {queue?.map((item, index) => (
        <li key={index}>
          <div className="track-details">
            <div onClick={() => handleTrackClick(item)} className="track--img">
              <img
                src={
                  item?.track?.album?.images?.[2]?.url ??
                  item?.album?.images?.[2]?.url ??
                  item?.image?.url
                }
                alt="track-img"
              />
            </div>
            <div className="track--name">
              <p>{item?.track?.name ?? item?.name}</p>
              <div className="track--name__artists">
                {[
                  ...(item?.track?.artists ?? []),
                  ...(item?.artists ?? []),
                ].map((artist) => (
                  <Link key={artist?.id} to={`/artist/${artist?.id}`}>
                    {artist?.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div
            onClick={() => handleDeleteTrack(index)}
            className="track-delete"
          >
            <i className="fas fa-trash"></i>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default QueueList;
