import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function SongBoxSkeleton() {
  return (
    <div className="song-box-container">
      <SkeletonTheme highlightColor={"#e3e3e3"} baseColor={"#d9d9d9"}>
        <div className="song-box__track">
          <div className="song-box__track-img">
            <Skeleton width={"100%"} height={"100%"} />
          </div>
          <p>
            <Skeleton width={"150px"} height={"100%"} />
          </p>
        </div>
        {window.matchMedia("(min-width: 1000px)").matches && (
          <div className="song-box__artist">
            <Skeleton width={"75px"} height={"100%"} />
          </div>
        )}
        <div className="song-box__album">
          <Skeleton width={"75px"} height={"100%"} />
        </div>
        <div className="song-box__duration">
          <Skeleton width={"50px"} height={"100%"} />
        </div>
      </SkeletonTheme>
    </div>
  );
}
