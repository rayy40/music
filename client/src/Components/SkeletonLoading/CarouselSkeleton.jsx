import React from "react";
import Skeleton from "react-loading-skeleton";

export default function CarouselSkeleton() {
  return (
    <div className="carousel">
      <div style={{ marginTop: "0px" }} className="carousel-outline">
        <div className="carousel-outline__header">
          <h2>
            <Skeleton width={"125px"} height={"100%"} />
          </h2>
          <p>
            <Skeleton width={"30px"} height={"100%"} />
          </p>
        </div>
        <div className="carousel-outline__layout">
          <div className="carousel-outline__container">
            {Array(20)
              .fill()
              .map((_, index) => (
                <div key={index} className="carousel-outline__container__box">
                  <div
                    style={{ pointerEvents: "none" }}
                    className="carousel-outline__container__box-img"
                  >
                    <Skeleton width={"100%"} height={"100%"} />
                  </div>
                  <div className="carousel-outline__container__box-name">
                    <h3>
                      <Skeleton width={"40px"} height={"100%"} />
                    </h3>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
