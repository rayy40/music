import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router";
import { SongContext } from "../../Components/SongContext/SongContext";
import SongBox from "../../Components/SongBox/SongBox";
import PlaylistPageSkeleton from "../../Components/SkeletonLoading/PlaylistPageSkeleton";
import { getPlaylist } from "../../Authenticate/spotify";

export default function PlaylistPage() {
  const { id } = useParams();
  const { setTrackData, setQueue } = useContext(SongContext);
  const [playlist, setPlaylist] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        const { data } = await getPlaylist(id, { limit: 20 });
        setPlaylist(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className="playlist-page-container">
      {isLoading ? (
        <PlaylistPageSkeleton />
      ) : (
        <div className="playlist-page-container__top">
          <div className="playlist-page-container__top__row">
            <img src={playlist?.images?.[0]?.url} alt="playlist-cover" />
          </div>
          <div className="playlist-page-container__top__row">
            <div className="row__content">
              <h2>{playlist?.name}</h2>
              <p>{playlist?.description}</p>
              <div className="row__content__detail">
                <p>{playlist?.owner?.display_name}</p>
                <p>{playlist?.tracks?.total} Tracks</p>
              </div>
            </div>
            <div className="row__buttons">
              <button
                onClick={() => {
                  setTrackData(playlist?.tracks?.items?.[0]?.track);
                  setQueue(
                    playlist?.tracks?.items.filter((_, index) => index > 0)
                  );
                }}
                className="play-btn"
              >
                <i className="fas fa-play"></i>
                <p>Play</p>
              </button>
            </div>
          </div>
        </div>
      )}
      {!isLoading && (
        <div className="playlist-page-container__bottom">
          <div className="playlist-page-container__bottom__box--header">
            <div className="box__track">TRACK</div>
            <div className="box__artist">ARTIST</div>
            <div className="box__album">ALBUM</div>
            <div className="box__duration">TIME</div>
          </div>
          {playlist?.tracks?.items?.map((track, index) => (
            <SongBox
              key={index}
              index={index}
              item={track}
              data={playlist?.tracks?.items}
            />
          ))}
        </div>
      )}
    </div>
  );
}
