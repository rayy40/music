import React, { useEffect, useState, useRef, useContext } from "react";
import { SongContext } from "../SongContext/SongContext";
import { Link } from "react-router-dom";
import QueueList from "../Queue/QueueList";

const SongBar = () => {
  const { queue, trackData, setTrackData, setIsQueueVisible, setQueue } =
    useContext(SongContext);

  const [isMusicPlayerVisible, setIsMusicPlayerVisible] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [touchStartY, setTouchStartY] = useState(null);
  const [panelPosition, setPanelPosition] = useState(0);
  const [volume, setVolume] = useState(0);
  const [isMute, setIsMute] = useState(false);
  const animationRef = useRef();
  const audioRef = useRef();
  const progressBarRef = useRef();
  const progressMobileBarRef = useRef();

  useEffect(() => {
    if (!trackData) return;
    setIsPlaying(true);
    animationRef.current = requestAnimationFrame(whilePlaying);
  }, [trackData]);

  const togglePlayPause = () => {
    const prevValue = isPlaying;
    setIsPlaying(!prevValue);
    if (!prevValue) {
      audioRef.current.play();
      animationRef.current = requestAnimationFrame(whilePlaying);
    } else {
      audioRef.current.pause();
      cancelAnimationFrame(animationRef.current);
    }
  };

  const skipSong = (forwards = true) => {
    console.log(queue);
    if (queue.length < 1) return;
    if (forwards) {
      let temp = queue[0]?.preview_url ? queue[0] : queue[0]?.track;
      console.log(temp);
      queue.shift();
      queue.push(temp);
      setTrackData(temp);
    } else {
      let temp = queue.pop();
      queue.unshift(temp);
      setTrackData(queue[0]?.preview_url ? queue[0] : queue[0]?.track);
    }
  };

  const whilePlaying = () => {
    const currentTime = audioRef?.current?.currentTime;
    setCurrentTime(currentTime);
    const duration = audioRef?.current?.duration;
    const progressPercent = (currentTime / duration) * 100;
    progressBarRef?.current?.style.setProperty(
      "--progress",
      `${progressPercent}`
    );
    progressBarRef.current.value = progressPercent;
    if (isMusicPlayerVisible) {
      progressMobileBarRef?.current?.style.setProperty(
        "--progress",
        `${progressPercent}`
      );
      progressMobileBarRef.current.value = progressPercent;
    }
    if (currentTime === duration) {
      skipSong();
    }
    animationRef.current = requestAnimationFrame(whilePlaying);
  };

  const handleVolumeChange = (e) => {
    const value = e.target.value;
    setVolume(value);
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (window.innerWidth < 1024) {
      setIsMusicPlayerVisible(true);
    }
  };

  const handleAddToQueue = (trackData) => {
    if (!queue.some((item) => item.id === trackData.id)) {
      setQueue((prevQueue) => [...prevQueue, trackData]);
    }
  };

  return (
    <>
      <div
        onClick={(e) => handleClick(e)}
        style={{ display: trackData ? "flex" : "none" }}
        className="song-bar-container"
      >
        <input
          ref={progressBarRef}
          type="range"
          max={100}
          className="progress-bar"
        />
        <div className="track-details">
          <div className="track--img">
            <img
              src={
                trackData?.album?.images?.[2]?.url ??
                trackData?.images?.[2]?.url ??
                trackData?.image?.url
              }
              alt="track-img"
            />
          </div>
          <div className="track--name">
            <p>{trackData?.name}</p>
            <div className="track--name__artists">
              {trackData?.artists?.map((artist, index) => (
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
        </div>
        <div onClick={(e) => e.stopPropagation()} className="track-controls">
          <button>
            <i className="fas fa-random"></i>
          </button>
          <button onClick={() => skipSong(false)}>
            <i className="fas fa-step-backward"></i>
          </button>
          <button onClick={togglePlayPause}>
            {Math.round(currentTime) !== 30 && isPlaying ? (
              <i className="fas fa-pause"></i>
            ) : (
              <i className="fas fa-play"></i>
            )}
          </button>
          <button onClick={() => skipSong(true)}>
            <i className="fas fa-step-forward"></i>
          </button>
          <button>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path d="M0 224c0 17.7 14.3 32 32 32s32-14.3 32-32c0-53 43-96 96-96H320v32c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l64-64c12.5-12.5 12.5-32.8 0-45.3l-64-64c-9.2-9.2-22.9-11.9-34.9-6.9S320 19.1 320 32V64H160C71.6 64 0 135.6 0 224zm512 64c0-17.7-14.3-32-32-32s-32 14.3-32 32c0 53-43 96-96 96H192V352c0-12.9-7.8-24.6-19.8-29.6s-25.7-2.2-34.9 6.9l-64 64c-12.5 12.5-12.5 32.8 0 45.3l64 64c9.2 9.2 22.9 11.9 34.9 6.9s19.8-16.6 19.8-29.6V448H352c88.4 0 160-71.6 160-160z" />
            </svg>
          </button>
        </div>
        <div className="track-sidebar">
          <div className="track-duration">
            <span>{Math.round(currentTime)}</span>
            <span>30</span>
          </div>
          <button onClick={() => setIsMute(!isMute)}>
            <i
              className={`fas fa-volume-${
                isMute
                  ? "mute"
                  : volume > 39
                  ? "up"
                  : volume > 0
                  ? "down"
                  : "off"
              }`}
            ></i>
          </button>
          <input
            type="range"
            min={0}
            value={volume}
            style={{ "--progress": `${volume}` }}
            max={100}
            className="sound-bar"
            onChange={handleVolumeChange}
          />
          <button onClick={() => setIsQueueVisible((v) => !v)}>
            <i className="fas fa-bars"></i>
          </button>
        </div>
        <audio
          preload="metadata"
          autoPlay
          ref={audioRef}
          src={trackData?.preview_url}
          volume={volume / 100}
        />
      </div>
      {isMusicPlayerVisible && (
        <div
          style={{
            transform: `translateY(${panelPosition}px)`,
            justifyContent: queue.length > 0 ? "flex-start" : "center",
          }}
          className="song-bar--extension"
        >
          <button
            onTouchStart={(e) => setTouchStartY(e.touches[0].clientY)}
            onTouchMove={(e) =>
              setPanelPosition(Math.max(e.touches[0].clientY - touchStartY, 0))
            }
            onTouchEnd={(e) => {
              if (panelPosition > 100) {
                setIsMusicPlayerVisible(false);
              }
              setPanelPosition(0);
            }}
            className="slide-down--panel"
          ></button>
          <div className="track-img">
            <img
              src={
                trackData?.album?.images?.[0]?.url ??
                trackData?.images?.[0]?.url ??
                trackData?.image?.url
              }
              alt="track-img"
            />
          </div>
          <div className="track-details">
            <div className="track-details__row">
              <h2>{trackData?.name}</h2>
              <div className="track-details__artists">
                {trackData?.artists?.map((artist, index) => (
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
            <button
              onClick={() => handleAddToQueue(trackData)}
              className="add-to-queue"
            >
              <i className="fas fa-plus"></i>
            </button>
          </div>
          <input
            ref={progressMobileBarRef}
            type="range"
            max={100}
            className="progress-bar"
          />
          <div className="track-duration">
            <span>{Math.round(currentTime)}</span>
            <span>30</span>
          </div>
          <div className="track-controls">
            <button onClick={() => skipSong(false)}>
              <i className="fas fa-step-backward"></i>
            </button>
            <button onClick={togglePlayPause}>
              {Math.round(currentTime) !== 30 && isPlaying ? (
                <i className="fas fa-pause"></i>
              ) : (
                <i className="fas fa-play"></i>
              )}
            </button>
            <button onClick={() => skipSong(true)}>
              <i className="fas fa-step-forward"></i>
            </button>
          </div>
          {queue.length > 0 && (
            <div className="tracks-queue">
              <div className="tracks-queue__header">
                <h3>Queue</h3>
                <span onClick={() => setQueue([])}>Clear all</span>
              </div>
              <div className="tracks-queue__list">
                <QueueList />
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default SongBar;
