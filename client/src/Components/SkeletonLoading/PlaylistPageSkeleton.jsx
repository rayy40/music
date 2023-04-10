import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import SongBoxSkeleton from "./SongBoxSkeleton";

export default function PlaylistPageSkeleton() {
  return (
    <div className="playlist-page-container">
      <div className="playlist-page-container__top">
        <SkeletonTheme highlightColor={"#e3e3e3"} baseColor={"#d9d9d9"}>
          <div className="playlist-page-container__top__row">
            <Skeleton width={"100%"} height={"100%"} />
          </div>
          <div className="playlist-page-container__top__row">
            <div className="row__content">
              <h2>
                <Skeleton width={"150px"} height={"100%"} />
              </h2>
              <p>
                <Skeleton width={"60px"} height={"20px"} />
              </p>
            </div>
            <div className="row__buttons">
              <Skeleton width={"95px"} height={"40px"} />
            </div>
          </div>
        </SkeletonTheme>
      </div>
      <div className="playlist-page-container__bottom">
        <div className="playlist-page-container__bottom__box--header">
          <div>
            <Skeleton width={"60px"} height={"100%"} />
          </div>
          <div>
            <Skeleton width={"60px"} height={"100%"} />
          </div>
          <div>
            <Skeleton width={"60px"} height={"100%"} />
          </div>
          <div>
            <Skeleton width={"60px"} height={"100%"} />
          </div>
        </div>
        <SongBoxSkeleton />
        <SongBoxSkeleton />
        <SongBoxSkeleton />
        <SongBoxSkeleton />
        <SongBoxSkeleton />
        <SongBoxSkeleton />
        <SongBoxSkeleton />
        <SongBoxSkeleton />
      </div>
    </div>
  );
}
