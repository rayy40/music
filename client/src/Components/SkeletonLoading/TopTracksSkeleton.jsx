import React from "react";
import Skeleton from "react-loading-skeleton";

export default function TopTracksSkeleton() {
  return (
    <div className="top-songs-container">
      <div className="top-songs-container__header">
        <h2>
          <Skeleton width={"90px"} height={"100%"} />
        </h2>
        <p>
          <Skeleton width={"30px"} height={"100%"} />
        </p>
      </div>
      <div className="top-songs-container__list">
        {Array(10)
          .fill()
          .map((_, item) => (
            <div key={item} className="top-songs-container__list__box">
              <p>
                <Skeleton width={"25px"} height={"100%"} />
              </p>
              <Skeleton width={"55px"} height={"55px"} />
              <div className="detail">
                <p>
                  <Skeleton width={"150px"} height={"100%"} />
                </p>
                <div className="artists">
                  {Array(2)
                    .fill()
                    .map((_, item) => (
                      <span key={item}>
                        <Skeleton width={"50px"} height={"100%"} />
                      </span>
                    ))}
                </div>
              </div>
              <p>
                <i className="fas fa-play"></i>
              </p>
            </div>
          ))}
      </div>
    </div>
  );
}
