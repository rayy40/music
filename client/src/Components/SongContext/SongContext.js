import { useState, createContext } from "react";
import { getTrack } from "../../Authenticate/spotify";

export const SongContext = createContext();

export const SongProvider = (props) => {
  const [trackData, setTrackData] = useState(null);
  const [skipSongData, setSkipSongData] = useState(null);
  const [profile, setProfile] = useState([]);
  const [queue, setQueue] = useState([]);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [trackImg, setTrackImg] = useState(null);
  const [isQueueVisible, setIsQueueVisible] = useState(false);

  const getTrackInfo = async (id) => {
    try {
      const { data: track } = await getTrack(id);
      setTrackImg(track?.album?.images?.[2]?.url);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SongContext.Provider
      value={{
        currentSongIndex,
        setCurrentSongIndex,
        skipSongData,
        setSkipSongData,
        trackData,
        setTrackData,
        trackImg,
        getTrackInfo,
        profile,
        setProfile,
        isQueueVisible,
        setIsQueueVisible,
        queue,
        setQueue,
        props,
      }}
    >
      {props.children}
    </SongContext.Provider>
  );
};
