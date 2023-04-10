import React, { useContext, useEffect, useState } from "react";
import {
  changeDateToStringDate,
  removeDupElements,
} from "../../Helpers/utilities";
import Carousel from "../../Components/Carousel/Carousel";
import { SongContext } from "../../Components/SongContext/SongContext";
import ArtistPageSkeleton from "../../Components/SkeletonLoading/ArtistPageSkeleton";
import Skeleton from "react-loading-skeleton";
import {
  getArtist,
  getArtistAlbums,
  getArtistRelatedArtists,
  getArtistTopTracks,
} from "../../Authenticate/spotify";
import { Link, useParams } from "react-router-dom";

export default function ArtistPage() {
  const { id } = useParams();
  const { profile, setTrackData } = useContext(SongContext);
  const [artist, setArtist] = useState(null);
  const [artistAlbums, setArtistAlbums] = useState(null);
  const [relatedArtists, setRelatedArtists] = useState(null);
  const [artistLatestRelease, setArtistLatestRelease] = useState(null);
  const [artistTopTracks, setArtistTopTracks] = useState(null);
  const [isImgLoading, setIsImgLoading] = useState(true);
  const [isLatestAlbumImgLoading, setIsLatestAlbumImgLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const { data } = await getArtist(id);
        setArtist(data);
        setIsLoading(false);

        setIsLoading(true);
        const { data: topTracks } = await getArtistTopTracks(
          id,
          profile?.country
        );
        setArtistTopTracks(
          window.innerWidth < 1300
            ? topTracks.tracks.slice(0, 3)
            : topTracks.tracks.slice(0, 6)
        );
        setIsLoading(false);

        setIsLoading(true);
        const { data: albums } = await getArtistAlbums(
          id,
          30,
          0,
          profile?.country
        );
        setArtistAlbums(removeDupElements(albums?.items).slice(0, 20));
        setArtistLatestRelease(albums?.items[0]);
        setIsLoading(false);

        setIsLoading(true);
        const { data: relatedArtists } = await getArtistRelatedArtists(id);
        setRelatedArtists(relatedArtists.artists);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id, profile]);

  if (isLoading) {
    return <ArtistPageSkeleton />;
  }

  return isLoading ? (
    <ArtistPageSkeleton />
  ) : (
    <div className="artist-page-container">
      <div className="artist-page-container__top">
        <div className="artist-page-container__top__row">
          {isImgLoading && (
            <Skeleton
              highlightColor={"#e3e3e3"}
              baseColor={"#d9d9d9"}
              borderRadius={"50%"}
            ></Skeleton>
          )}
          <img
            onLoad={() => setIsImgLoading(false)}
            style={isImgLoading ? { display: "none" } : {}}
            src={artist?.images[0].url}
            alt="artist-img"
          />
        </div>
        <div className="artist-page-container__top__row">
          <div className="row__genre">
            {artist?.genres.map((genre, index) => (
              <p key={index}>{genre}</p>
            ))}
          </div>
          <h2>{artist?.name}</h2>
        </div>
      </div>
      <div className="artist-page-container__bottom">
        <div className="artist-page-container__bottom__first-row">
          {artistLatestRelease && (
            <div className="row__latest-album">
              <h3>Latest Release</h3>
              <div className="row__latest-album__content">
                <Link className="link" to={`/abum/${artistLatestRelease?.id}`}>
                  {isLatestAlbumImgLoading && (
                    <Skeleton
                      highlightColor={"#e3e3e3"}
                      baseColor={"#d9d9d9"}
                      width={"200px"}
                      height={"200px"}
                    ></Skeleton>
                  )}
                  <img
                    onLoad={() => setIsLatestAlbumImgLoading(false)}
                    style={isLatestAlbumImgLoading ? { display: "none" } : {}}
                    src={artistLatestRelease?.images?.[1]?.url}
                    alt="album-img"
                  />
                  <div className="row__latest-album__content__details">
                    <p>
                      {changeDateToStringDate(
                        artistLatestRelease?.release_date
                      )}
                    </p>
                    <p className="link-tag">{artistLatestRelease?.name}</p>
                    <p>{artistLatestRelease?.total_tracks + " songs"}</p>
                  </div>
                </Link>
              </div>
            </div>
          )}
          <div className="row__top-songs">
            <h3>Top Songs</h3>
            <div className="row__top-songs__container">
              {artistTopTracks?.map((item, index) => (
                <div
                  key={index}
                  className="row__top-songs__container__list-box"
                >
                  <p>{index + 1}</p>
                  <img src={item?.album?.images?.[2]?.url} alt="album-img" />
                  <div className="detail">
                    <p>{item?.name}</p>
                    <div className="artists">
                      {item.artists.map((artist, index) => (
                        <Link
                          className="artist-link"
                          to={`/artist/${artist?.id}`}
                          key={index}
                        >
                          {artist?.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                  <i
                    onClick={() => setTrackData(item)}
                    className="fas fa-play"
                  ></i>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="artist-page-container__bottom__second-row">
          <Carousel title={"Albums"} data={artistAlbums} />
          <Carousel title={"Similar Artists"} data={relatedArtists} />
        </div>
      </div>
    </div>
  );
}
