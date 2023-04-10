import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function BrowsePageSkeleton() {
  return (
    <div className="browse-page-container">
      <SkeletonTheme highlightColor={"#e3e3e3"} baseColor={"#d9d9d9"}>
        {Array(20)
          .fill()
          .map((_, index) => (
            <div key={index} className="browse-page-container__box">
              <Skeleton width={"100%"} height={"100%"} />
              <h3>
                <Skeleton width={"60px"} height={"100%"} />
              </h3>
            </div>
          ))}
      </SkeletonTheme>
    </div>
  );
}
