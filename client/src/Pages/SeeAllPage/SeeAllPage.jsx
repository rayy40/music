import React, { useEffect, useState } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import { removeDupElements } from "../../Helpers/utilities";
import SongBox from "../../Components/SongBox/SongBox";
import SeeAllPageSkeleton from "../../Components/SkeletonLoading/SeeAllPageSkeleton";
import {
  getArtistAlbums,
  getCurrentUserSavedTracks,
  getCurrentUserTopItems,
  getNewReleases,
} from "../../Authenticate/spotify";
import InfiniteScroll from "react-infinite-scroll-component";

export default function SeeAllPage() {
  const { id } = useParams();
  const { state = {} } = useLocation();
  const [offset, setOffset] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [albumData, setAlbumData] = useState([]);
  const [itemData, setItemData] = useState([]);
  const [trackData, setTrackData] = useState([]);
  const [isLoading, setIsLoading] = useState({
    newTrack: true,
    savedTracks: true,
    topSongs: true,
    topArtists: true,
    albums: true,
  });
  const [topSongs, setTopSongs] = useState(null);

  const fetchData = async () => {
    try {
      if (id === "new-releases") {
        const { data: newReleases } = await getNewReleases(50, offset);
        setAlbumData((prev) => [...prev, ...newReleases.albums.items]);
        setIsLoading({ newTrack: false });
        if (newReleases.next) {
          setOffset((prev) => prev + 50);
        } else {
          setHasNextPage(false);
        }
      } else if (id === "your-saved-tracks") {
        const { data: userSavedTracks } = await getCurrentUserSavedTracks(
          50,
          offset
        );
        setTrackData((prev) => [...prev, ...userSavedTracks.items]);
        setIsLoading({ savedTracks: false });
        if (userSavedTracks.next) {
          setOffset((prev) => prev + 50);
        } else {
          setHasNextPage(false);
        }
      } else if (id === "your-top-artists") {
        const { data: userTopArtists } = await getCurrentUserTopItems(
          "artists",
          20
        );
        setItemData(userTopArtists.items);
        setIsLoading({ topArtists: false });
      } else if (id === "your-top-songs") {
        const { data: userTopTracks } = await getCurrentUserTopItems(
          "tracks",
          20
        );
        setTopSongs(userTopTracks.items);
        setIsLoading({ topSongs: false });
      } else if (id === "albums") {
        const { data: artistAlbums } = await getArtistAlbums(
          state.artistId,
          50,
          offset
        );
        setAlbumData((prev) => [
          ...prev,
          ...removeDupElements(artistAlbums.items),
        ]);
        setIsLoading({ albums: false });
        if (artistAlbums.next) {
          setOffset((prev) => prev + 50);
        } else {
          setHasNextPage(false);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, state.artistId]);

  if (id === "New Releases" && isLoading.newTrack) {
    return <SeeAllPageSkeleton layout={"list"} />;
  } else if (id === "Your Top Songs" && isLoading.topSongs) {
    return <SeeAllPageSkeleton layout={"list"} />;
  } else if (id === "Your Saved Tracks" && isLoading.savedTracks) {
    return <SeeAllPageSkeleton layout={"list"} />;
  } else if (id === "Your Top Artists" && isLoading.topArtists) {
    return <SeeAllPageSkeleton layout={"grid"} />;
  } else if (id === "Albums" && isLoading.albums) {
    return <SeeAllPageSkeleton layout={"grid"} />;
  }

  return (
    <div className="seeAll-page-container">
      <div className="seeAll-page-container__header">
        <h3 style={{ textTransform: "capitalize" }}>
          {id
            .replace(/-/g, " ")
            .replace(/\b\w/g, (firstLetter) => firstLetter.toUpperCase())}
        </h3>
      </div>
      <div className="seeAll-page-container__list">
        {id === "Your Top Artists" ? (
          <div className="seeAll-page-container__list-grid">
            {itemData?.flat().map((item, index) => (
              <div key={index} className="seeAll-page-container__box">
                <img
                  loading="lazy"
                  src={item.images[1].url}
                  alt={item.name + "-img"}
                />
                <Link to={`/artists/${item?.id}`}>{item.name}</Link>
              </div>
            ))}
          </div>
        ) : (
          <div
            className={`seeAll-page-container__list__box--header ${
              id === "New Releases" && "modifier--table"
            }`}
          >
            <div className="box__track">TRACK</div>
            <div className="box__artist">ARTIST</div>
            <div className="box__album">
              {id === "New Releases" ? "TYPE" : "ALBUM"}
            </div>
            <div className="box__duration">
              {id === "New Releases" ? "RELEASE" : "TIME"}
            </div>
          </div>
        )}
        {topSongs &&
          topSongs
            .filter((track) => track?.name?.length > 0)
            .map((track, index) => (
              <SongBox key={index} item={track} data={topSongs} />
            ))}
        <InfiniteScroll
          dataLength={albumData.length || trackData.length}
          next={fetchData}
          hasMore={hasNextPage}
        >
          {albumData &&
            albumData
              .flat()
              .map((item, index) => (
                <SongBox key={index} item={item} data={albumData} date={true} />
              ))}
          {trackData &&
            trackData
              .flat()
              .filter((item) => item?.track?.name?.length > 0)
              .map((item, index) => (
                <SongBox
                  key={index}
                  index={index}
                  item={item}
                  data={trackData}
                />
              ))}
        </InfiniteScroll>
      </div>
    </div>
  );
}
