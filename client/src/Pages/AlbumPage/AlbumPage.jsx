import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { millisToMinutesAndSeconds } from "../../Helpers/utilities";
import { SongContext } from "../../Components/SongContext/SongContext";
import Skeleton from "react-loading-skeleton";
import AlbumPageSkeleton from "../../Components/SkeletonLoading/AlbumPageSkeleton";
import { getAlbum } from "../../Authenticate/spotify";

export default function AlbumPage() {
  const { id } = useParams();
  const [album, setAlbum] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAlbumImgLoading, setIsAlbumImgLoading] = useState(true);
  const { setTrackData, setQueue } = useContext(SongContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getAlbum(id);
        setAlbum(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const hanldeUpdateTrack = (clickedTrack) => {
    const updatedTrack = {
      ...clickedTrack,
      image: { url: album?.images?.[2]?.url },
    };
    setTrackData(updatedTrack);
  };

  const handleUpdateQueue = () => {
    setQueue(
      album?.tracks?.items
        .map((item) => ({
          ...item,
          image: { url: album?.images?.[2]?.url },
        }))
        .filter((_, index) => index > 0)
    );
  };

  return isLoading ? (
    <AlbumPageSkeleton />
  ) : (
    <div className="album-page-container">
      <div className="album-page-container__top">
        <div className="album-page-container__top__row">
          {isAlbumImgLoading && (
            <Skeleton
              highlightColor={"#e3e3e3"}
              baseColor={"#d9d9d9"}
            ></Skeleton>
          )}
          <img
            onLoad={() => setIsAlbumImgLoading(false)}
            style={isAlbumImgLoading ? { display: "none" } : {}}
            src={album?.images?.[0]?.url}
            alt="album-cover"
          />
        </div>
        <div className="album-page-container__top__row">
          <div className="row__content">
            <h2>{album?.name}</h2>
            <p>
              {album?.artists?.[0]?.name},
              <span> {album?.release_date?.split("-")[0]}</span>
            </p>
          </div>
          <div className="row__buttons">
            <button
              onClick={() => {
                hanldeUpdateTrack(album?.tracks?.items?.[0]);
                handleUpdateQueue();
              }}
              className="play-btn"
            >
              <i className="fas fa-play"></i>
              <p>Play</p>
            </button>
          </div>
        </div>
      </div>
      <div className="album-page-container__bottom">
        <div className="album-page-container__bottom__row">
          {album?.tracks?.items.map((item, index) => (
            <div key={index} className="song-box-container">
              <div onClick={() => hanldeUpdateTrack(item)} className="index">
                <p>{index + 1}</p>
              </div>
              <div className="song-box__track">
                <p>{item?.name}</p>
              </div>
              <div className="song-box__duration">
                {millisToMinutesAndSeconds(item?.duration_ms)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
