import React, { useRef, useState, useContext } from "react";
import { slideLeft, slideRight } from "../../Helpers/utilities";
import { Link } from "react-router-dom";
import { SongContext } from "../SongContext/SongContext";
import { getAlbumTracks, getPlaylist } from "../../Authenticate/spotify";

export default function Carousel({ playlistId, categoryId, title, data }) {
  const carouselRef = useRef();
  const [visibility, setVisibility] = useState(false);
  const { setTrackData, setQueue } = useContext(SongContext);

  const addTracksToQueue = async (e, item, type) => {
    e.preventDefault();
    console.log(item);
    try {
      if (type === "single" || type === "album") {
        const { data: albumTracks } = await getAlbumTracks(item?.id);
        const updatedTrack = {
          ...albumTracks?.items?.[0],
          image: { url: item?.images?.[2]?.url },
        };
        setTrackData(updatedTrack);
        setQueue(
          albumTracks?.items
            .map((i) => ({
              ...i,
              image: { url: item?.images?.[2]?.url },
            }))
            .filter((_, index) => index > 0)
        );
      } else {
        const { data: playlist } = await getPlaylist(item?.id);
        setTrackData(playlist?.tracks?.items?.[0]?.track);
        setQueue(playlist?.tracks?.items?.filter((_, index) => index > 0));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const addSongsToList = async (e, item) => {
    e.preventDefault();
    try {
      const { data: albumTracks } = await getAlbumTracks(item.id);
      setQueue((prevQueue) => [
        ...prevQueue,
        ...albumTracks?.items.map((i) => ({
          ...i,
          image: { url: item?.images?.[2]?.url },
        })),
      ]);
    } catch (error) {
      console.error(error);
    }
  };

  const addPlaylistTracksToQueue = async (id) => {
    try {
      const { data: playlist } = await getPlaylist(id);
      const tracks = playlist?.tracks?.items?.map((item) => item.track);
      setQueue((prevQueue) => [...prevQueue, ...tracks]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="carousel">
      {data && (
        <div
          onMouseEnter={() =>
            visibility &&
            (carouselRef.current.parentElement.children[0].style.opacity = 1)
          }
          onMouseLeave={() =>
            (carouselRef.current.parentElement.children[0].style.opacity = 0)
          }
          className={`carousel-outline ${
            (title === "Daily Top 50" ||
              title === "Music by Mood" ||
              title === "Categories" ||
              title === "Editor's Pick" ||
              title === "Hip Hop in India" ||
              title === "Kpop") &&
            "modifier"
          }`}
        >
          <div className="carousel-outline__header">
            <h2>{title}</h2>
            {title === "Similar Artists" ||
            title === "Editor's Pick" ||
            title === "Recently Played Tracks" ? null : (
              <Link
                className="link"
                to={
                  categoryId
                    ? categoryId === "charts"
                      ? "/charts"
                      : `/discover/${categoryId}`
                    : playlistId
                    ? `/playlist/${playlistId}`
                    : title === "Albums"
                    ? {
                        pathname: `/seeAll/albums`,
                        state: { artistId: data?.[0]?.artists?.[0]?.id },
                      }
                    : `/seeAll/${title.toLowerCase().replace(/\s+/g, "-")}`
                }
              >
                See all
              </Link>
            )}
          </div>
          <div className="carousel-outline__layout">
            <div onClick={() => slideLeft(carouselRef)} className="left-slider">
              <i className="fas fa-chevron-left"></i>
            </div>
            {(title === "Music by Mood" ||
              title === "Kpop" ||
              title === "Editor's Pick" ||
              title === "Daily Top 50") && (
              <div ref={carouselRef} className="carousel-outline__container">
                {data.map((item, index) => (
                  <div key={index} className="carousel-outline__container__box">
                    <Link className="link" to={`/playlist/${item?.id}`}>
                      <div className="carousel-outline__container__box-img">
                        <img
                          loading="lazy"
                          src={
                            item.img
                              ? item.img
                              : item.images
                              ? item.images[0].url
                              : item.icons[0].url
                          }
                          alt="album-img"
                        />
                        <div className="hover-buttons">
                          <button
                            onClick={(e) => {
                              addTracksToQueue(e, item, "playlist");
                            }}
                            className="play-btn"
                          >
                            <i className="fas fa-play"></i>
                          </button>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              addPlaylistTracksToQueue(item?.id);
                            }}
                            className="add-to-queue-btn"
                          >
                            <img src="Images/add-to-playlist.png" alt="" />
                          </button>
                        </div>
                      </div>
                    </Link>
                    <div className="carousel-outline__container__box-name">
                      <Link to={`/playlist/${item?.id}`} className="link-tag">
                        {title === "Daily Top 50"
                          ? `Top 50: ${item.name}`
                          : item.name}
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {(title === "Albums" ||
              title === "Your Top Artists" ||
              title === "Similar Artists" ||
              title === "Hip Hop in India") && (
              <div ref={carouselRef} className="carousel-outline__container">
                {data
                  ?.filter(
                    (item) =>
                      item?.track?.name?.length > 0 || item?.name?.length > 0
                  )
                  .map((item, index) => (
                    <div
                      key={index}
                      className="carousel-outline__container__box"
                    >
                      <Link
                        className="link"
                        to={
                          title === "Similar Artists" ||
                          title === "Your Top Artists"
                            ? `/artist/${item?.id}`
                            : title === "Albums"
                            ? `/album/${item?.id}`
                            : `/album/${item?.track?.album?.id}`
                        }
                      >
                        <div className="carousel-outline__container__box-img">
                          <img
                            loading="lazy"
                            src={
                              item?.track?.album?.images?.[1]?.url ??
                              item?.images?.[1]?.url
                            }
                            alt="album-img"
                          />
                          {(title === "Hip Hop in India" ||
                            title === "Albums") && (
                            <div className="hover-buttons">
                              <button
                                onClick={(e) => {
                                  e.preventDefault();
                                  title === "Albums"
                                    ? addTracksToQueue(
                                        e,
                                        item,
                                        item?.album_type
                                      )
                                    : setTrackData(item?.track);
                                }}
                                className="play-btn"
                              >
                                <i className="fas fa-play"></i>
                              </button>
                              {title === "Albums" ? (
                                <button className="add-to-queue-btn">
                                  <i className="fas fa-ellipsis-h"></i>
                                </button>
                              ) : (
                                <button
                                  onClick={(e) => {
                                    e.preventDefault();
                                    setQueue((prevQueue) => [
                                      ...prevQueue,
                                      item.track,
                                    ]);
                                  }}
                                  className="add-to-queue-btn"
                                >
                                  <img
                                    src="Images/add-to-playlist.png"
                                    alt=""
                                  />
                                </button>
                              )}
                            </div>
                          )}
                        </div>
                      </Link>
                      <div className="carousel-outline__container__box-name">
                        <Link
                          to={
                            title === "Similar Artists" ||
                            title === "Your Top Artists"
                              ? `/artist/${item?.id}`
                              : title === "Albums"
                              ? `/album/${item?.id}`
                              : `/playlist/${item?.track?.id}`
                          }
                          className="link-tag"
                        >
                          {item?.name || item?.track?.name}
                        </Link>
                        {title === "Albums" && (
                          <p>{item.release_date.split("-")[0]}</p>
                        )}
                        {title === "Hip Hop in India" && (
                          <div className="artist-box">
                            {item.track.artists.map((artist, idx) => (
                              <Link
                                className="artist--link-tag"
                                to={`/artist/${artist?.id}`}
                                key={idx}
                              >
                                {artist.name}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            )}
            {(title === "Today's Top Hits" ||
              title === "Recently Played Tracks" ||
              title === "Your Saved Tracks" ||
              title === "New Releases") && (
              <div ref={carouselRef} className="carousel-outline__container">
                {data
                  ?.filter(
                    (item) =>
                      item?.track?.name?.length > 0 || item?.name?.length > 0
                  )
                  .map((item, index) => (
                    <div
                      key={index}
                      className="carousel-outline__container__box"
                    >
                      <Link to={`/album/${item?.track?.album?.id ?? item?.id}`}>
                        <div className="carousel-outline__container__box-img">
                          <img
                            loading="lazy"
                            src={
                              item?.track?.album?.images?.[1]?.url ??
                              item?.images?.[1]?.url
                            }
                            alt="album-img"
                          />
                          {(title === "Recently Played Tracks" ||
                            title === "Your Saved Tracks") && (
                            <div className="hover-buttons">
                              <button
                                onClick={(e) => {
                                  e.preventDefault();
                                  setTrackData(item?.track);
                                }}
                                className="play-btn"
                              >
                                <i className="fas fa-play"></i>
                              </button>
                              <button
                                onClick={(e) => {
                                  e.preventDefault();
                                  setQueue((prevQueue) => [
                                    ...prevQueue,
                                    item.track,
                                  ]);
                                }}
                                className="add-to-queue-btn"
                              >
                                <img src="Images/add-to-playlist.png" alt="" />
                              </button>
                            </div>
                          )}
                          {title === "New Releases" && (
                            <div className="hover-buttons">
                              <button
                                onClick={(e) => {
                                  addTracksToQueue(e, item, item?.album_type);
                                }}
                                className="play-btn"
                              >
                                <i className="fas fa-play"></i>
                              </button>
                              <button
                                onClick={(e) => {
                                  addSongsToList(e, item);
                                }}
                                className="add-to-queue-btn"
                              >
                                <img src="Images/add-to-playlist.png" alt="" />
                              </button>
                            </div>
                          )}
                        </div>
                      </Link>
                      <div className="carousel-outline__container__box-name">
                        <h3>{item?.track?.name ?? item?.name}</h3>
                        {
                          <div className="artist-box">
                            {[
                              ...(item?.track?.artists ?? []),
                              ...(item?.artists ?? []),
                            ].map((artist, idx) => (
                              <Link
                                className="artist--link-tag"
                                to={`/artist/${artist?.id}`}
                                key={idx}
                              >
                                {artist.name}
                              </Link>
                            ))}
                          </div>
                        }
                      </div>
                    </div>
                  ))}
              </div>
            )}
            <div
              onClick={() => slideRight(carouselRef, setVisibility)}
              className="right-slider"
            >
              <i className="fas fa-chevron-right"></i>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
