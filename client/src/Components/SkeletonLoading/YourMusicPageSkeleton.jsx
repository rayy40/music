import React from "react";
import { SkeletonTheme } from "react-loading-skeleton";
import CarouselSkeleton from "./CarouselSkeleton";
import TopTracksSkeleton from "./TopTracksSkeleton";

export default function YourMusicPageSkeleton() {
  return (
    <div className="your-music-page-container">
      <SkeletonTheme highlightColor={"#e3e3e3"} baseColor={"#d9d9d9"}>
        <CarouselSkeleton />
        <TopTracksSkeleton />
        <CarouselSkeleton />
        <CarouselSkeleton />
      </SkeletonTheme>
    </div>
  );
}
