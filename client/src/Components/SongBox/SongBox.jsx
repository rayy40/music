import React, { useContext } from "react";
import { Link } from "react-router-dom";
import {
  changeDateToStringDate,
  millisToMinutesAndSeconds,
} from "../../Helpers/utilities";
import { SongContext } from "../SongContext/SongContext";

export default function SongBox({ item, data, index, date }) {
  const { setTrackData, setQueue } = useContext(SongContext);

  const handleTrackClick = (trackIndex) => {
    const newQueue = data?.filter((_, index) => index > trackIndex);
    setQueue(newQueue);
  };

  return (
    <div className={`song-box-container`}>
      {date ? (
        <Link to={`/album/${item?.id}`}>
          <div className="song-box__track">
            <div
              onClick={() => {
                !date && setTrackData(item?.track ?? item);
                !date && handleTrackClick(index);
              }}
              className="song-box__track-img "
            >
              <img
                src={
                  item?.track?.album?.images?.[2]?.url ??
                  item?.album?.images?.[2]?.url ??
                  item?.images?.[2]?.url
                }
                alt="album-img"
              />
            </div>
            {window.innerWidth < 1024 ? (
              <Link to={`/album/${item?.id}`}>
                <div className="track-details">
                  <p>{item?.track?.name ?? item?.name}</p>
                  <div className="song-box__artist">
                    {[
                      ...(item?.track?.artists ?? []),
                      ...(item?.artists ?? []),
                    ].map((artist) => (
                      <span key={artist?.id}>{artist?.name}</span>
                    ))}
                  </div>
                </div>
              </Link>
            ) : (
              <p>{item?.track?.name ?? item?.name}</p>
            )}
          </div>
        </Link>
      ) : (
        <div className="song-box__track">
          <div
            onClick={() => {
              !date && setTrackData(item?.track ?? item);
              !date && handleTrackClick(index);
            }}
            className="song-box__track-img "
          >
            <img
              src={
                item?.track?.album?.images?.[2]?.url ??
                item?.album?.images?.[2]?.url ??
                item?.images?.[2]?.url
              }
              alt="album-img"
            />
          </div>
          {window.innerWidth < 1024 ? (
            <div className="track-details">
              <p>{item?.track?.name ?? item?.name}</p>
              <div className="song-box__artist">
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
          ) : (
            <p>{item?.track?.name ?? item?.name}</p>
          )}
        </div>
      )}
      {window.innerWidth > 1024 && (
        <div className="song-box__artist">
          {[...(item?.track?.artists ?? []), ...(item?.artists ?? [])].map(
            (artist) => (
              <Link key={artist?.id} to={`/artist/${artist?.id}`}>
                {artist?.name}
              </Link>
            )
          )}
        </div>
      )}
      <div className="song-box__album">
        {!date ? (
          <Link to={`/album/${item?.track?.album?.id ?? item?.id}`}>
            {item?.track?.album?.name ?? item?.album_type ?? item?.type}
          </Link>
        ) : (
          item?.track?.album?.name ?? item?.album_type ?? item?.type
        )}
      </div>
      <div className="song-box__duration">
        {date
          ? changeDateToStringDate(item?.release_date)
          : millisToMinutesAndSeconds(
              item?.track?.duration_ms ?? item?.duration_ms
            )}
      </div>
    </div>
  );
}
