import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { SongContext } from "../SongContext/SongContext";

export default function TopSongs({ title, topSongs, topTracks }) {
  const { setCurrentSongIndex, setSkipSongData, setTrackData } =
    useContext(SongContext);

  return (
    <div className="top-songs-container">
      <div className="top-songs-container__header">
        <h2>{title}</h2>
        <Link
          className="link-tag"
          to={topSongs ? `/playlist/${topSongs?.id}` : `/seeAll/your-top-songs`}
        >
          See all
        </Link>
      </div>
      <div className="top-songs-container__list">
        {topSongs
          ? topSongs.data.map((item, index) => (
              <div key={index} className="top-songs-container__list__box">
                <p>{index + 1}</p>
                <img src={item.track.album.images[2].url} alt="album-img" />
                <div className="detail">
                  <p>{item.track.name}</p>
                  <div className="artists">
                    {item.track.artists.map((artist, index) => (
                      <Link
                        className="link-tag"
                        to={`/artist/${artist?.id}`}
                        key={index}
                      >
                        {artist.name}
                      </Link>
                    ))}
                  </div>
                </div>
                <p>
                  <i
                    onClick={() => {
                      setSkipSongData(topSongs.data);
                      setTrackData(item.track);
                      setCurrentSongIndex(index);
                    }}
                    className="fas fa-play"
                  ></i>
                </p>
              </div>
            ))
          : topTracks
              ?.filter((item) => item?.name?.length > 0)
              .map((item, index) => (
                <div key={index} className="top-songs-container__list__box">
                  <p>{index + 1}</p>
                  <img src={item?.album?.images?.[2]?.url} alt="album-img" />
                  <div className="detail">
                    <p>{item?.name}</p>
                    <div className="artists">
                      {item?.artists?.map((artist, index) => (
                        <Link
                          className="link-tag"
                          to={`/artist/${artist?.id}`}
                          key={index}
                        >
                          {artist?.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                  <p>
                    <i
                      onClick={() => {
                        setSkipSongData(topTracks);
                        setTrackData(item);
                        setCurrentSongIndex(index);
                      }}
                      className="fas fa-play"
                    ></i>
                  </p>
                </div>
              ))}
      </div>
    </div>
  );
}
