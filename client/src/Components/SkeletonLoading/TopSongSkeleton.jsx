import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function TopSongSkeleton() {
  return (
    <div className="row__top-songs__container__list-box">
      <SkeletonTheme highlightColor={"#e3e3e3"} baseColor={"#d9d9d9"}>
        <p>
          <Skeleton width={"10px"} height={"100%"} />
        </p>
        <Skeleton width={"50px"} height={"50px"} />
        <div className="detail">
          <p>
            <Skeleton width={"150px"} height={"100%"} />
          </p>
          <div className="artists">
            <span>
              <Skeleton width={"30px"} height={"20px"} />
            </span>
          </div>
        </div>
        <i className="fas fa-play"></i>
      </SkeletonTheme>
    </div>
  );
}
