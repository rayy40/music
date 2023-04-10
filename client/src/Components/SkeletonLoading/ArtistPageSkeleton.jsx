import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import TopSongSkeleton from "./TopSongSkeleton";

export default function ArtistPageSkeleton() {
  return (
    <div className="artist-page-container">
      <SkeletonTheme highlightColor={"#e3e3e3"} baseColor={"#d9d9d9"}>
        <div className="artist-page-container__top">
          <div className="artist-page-container__top__row">
            <Skeleton borderRadius={"50%"} />
          </div>
          <div className="artist-page-container__top__row">
            <div className="row__genre">
              <p>
                <Skeleton width={"40px"} height={"100%"} />
              </p>
              <p>
                <Skeleton width={"40px"} height={"100%"} />
              </p>
            </div>
            <h2>
              <Skeleton width={"225px"} height={"100%"} />
            </h2>
          </div>
        </div>
        <div className="artist-page-container__bottom">
          <div className="artist-page-container__bottom__first-row">
            <div className="row__latest-album">
              <h3>
                <Skeleton width={"120px"} height={"100%"} />
              </h3>
              <div className="row__latest-album__content">
                {window.matchMedia("(min-width: 1000px)").matches ? (
                  <Skeleton width={"200px"} height={"200px"} />
                ) : (
                  <Skeleton width={"160px"} height={"160px"} />
                )}
                <div className="row__latest-album__content__details">
                  <p>
                    <Skeleton width={"40px"} height={"100%"} />
                  </p>
                  <h4>
                    <Skeleton width={"90px"} height={"100%"} />
                  </h4>
                  <p>
                    <Skeleton width={"50px"} height={"100%"} />
                  </p>
                </div>
              </div>
            </div>
            <div className="row__top-songs">
              <h3>
                <Skeleton width={"100px"} height={"100%"} />
              </h3>
              <div className="row__top-songs__container">
                {window.matchMedia("(max-width: 1300px)").matches
                  ? Array(3)
                      .fill()
                      .map((_, index) => <TopSongSkeleton key={index} />)
                  : Array(6)
                      .fill()
                      .map((_, index) => <TopSongSkeleton key={index} />)}
              </div>
            </div>
          </div>
        </div>
      </SkeletonTheme>
    </div>
  );
}
