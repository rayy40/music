import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

export default function AlbumPageSkeleton() {
  return (
    <div className="album-page-container">
      <SkeletonTheme highlightColor={"#e3e3e3"} baseColor={"#d9d9d9"}>
        <div className="album-page-container__top">
          <div className="album-page-container__top__row">
            <Skeleton />
          </div>
          <div className="album-page-container__top__row">
            <div className="row__content">
              <h2>
                <Skeleton width={"160px"} height={"100%"} />
              </h2>
              <p>
                <Skeleton width={"40px"} height={"100%"} />
              </p>
            </div>
            <div className="row__buttons">
              <Skeleton width={"95px"} height={"40px"} />
            </div>
          </div>
        </div>
        <div className="album-page-container__bottom">
          <div className="album-page-container__bottom__row">
            {Array(5)
              .fill()
              .map((_, index) => (
                <div key={index} className="song-box-container">
                  <div className="index">
                    <p>
                      <Skeleton width={"20px"} height={"100%"} />
                    </p>
                  </div>
                  <div className="song-box__track">
                    <p>
                      <Skeleton width={"140px"} height={"100%"} />
                    </p>
                  </div>
                  <div className="song-box__duration">
                    <p>
                      <Skeleton width={"35px"} height={"100%"} />
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </SkeletonTheme>
    </div>
  );
}
