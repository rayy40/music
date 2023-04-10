import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import SongBoxSkeleton from "./SongBoxSkeleton";

export default function SeeAllPageSkeleton({ layout }) {
  return (
    <div className="seeAll-page-container">
      <SkeletonTheme highlightColor={"#e3e3e3"} baseColor={"#d9d9d9"}>
        <div className="seeAll-page-container__header">
          <h3>
            {window.matchMedia("(min-width: 1000px)").matches ? (
              <Skeleton width={"220px"} height={"100%"} />
            ) : (
              <Skeleton width={"120px"} height={"100%"} />
            )}
          </h3>
        </div>
        <div className="seeAll-page-container__list">
          {layout === "list" ? (
            <div className="seeAll-page-container__list__box--header">
              <div className="box__track">
                <Skeleton width={"40px"} height={"100%"} />
              </div>
              <div className="box__artist">
                <Skeleton width={"40px"} height={"100%"} />
              </div>
              <div className="box__album">
                <Skeleton width={"40px"} height={"100%"} />
              </div>
              <div className="box__duration">
                <Skeleton width={"40px"} height={"100%"} />
              </div>
            </div>
          ) : (
            <div className="seeAll-page-container__list-grid">
              {Array(25)
                .fill()
                .map((_, index) => (
                  <div key={index} className="seeAll-page-container__box">
                    <Skeleton width={"100%"} height={"100%"} />
                    <h3>
                      <Skeleton width={"60px"} height={"100%"} />
                    </h3>
                  </div>
                ))}
            </div>
          )}
          {layout === "list" &&
            Array(12)
              .fill()
              .map((_, index) => <SongBoxSkeleton key={index} />)}
        </div>
      </SkeletonTheme>
    </div>
  );
}
