import React, { useEffect, useState } from "react";
import Carousel from "../../Components/Carousel/Carousel";
import { charts } from "../../Helpers/utilities";
import TopSongs from "../../Components/TopSongs/TopSongs";
import HomePageSkeleton from "../../Components/SkeletonLoading/HomePageSkeleton";
import {
  getFeaturedPlaylists,
  getNewReleases,
  getPlaylist,
  getPlaylistsForCategories,
} from "../../Authenticate/spotify";

export default function HomePage() {
  const [newReleases, setNewReleases] = useState({
    limit: 0,
    data: null,
  });
  const [topHits, setTopHits] = useState({ id: null, data: null });
  const [mood, setMood] = useState(null);
  const [hiphop, setHiphop] = useState({ id: null, data: null });
  const [kpop, setKpop] = useState(null);
  const [featuredPlaylists, setFeaturedPlaylists] = useState(null);
  const [dailyCharts, setDailyCharts] = useState(null);
  const [isLoading, setIsLoading] = useState({
    loadingNewReleases: true,
    loadingFeaturedPlaylists: true,
    loadingPlaylistsForCategory: true,
    loadingPlaylistsById: true,
  });

  const fetchNewReleases = async () => {
    try {
      const { data: newReleased } = await getNewReleases(20, 0);
      setNewReleases({
        limit: newReleased.albums.total,
        data: newReleased.albums.items,
      });
      setIsLoading({ loadingNewReleases: false });
    } catch (error) {
      console.error(error);
    }
  };

  const fetchPlaylistsForCategory = async (category, setter) => {
    try {
      const { data: playlistForCategory } = await getPlaylistsForCategories(
        20,
        category
      );
      setter(playlistForCategory?.playlists?.items);
      setIsLoading({ loadingPlaylistsForCategory: false });
    } catch (error) {
      console.error(error);
    }
  };

  const fetchFeaturedPlaylists = async () => {
    try {
      const { data: featuringPlaylists } = await getFeaturedPlaylists("IN");
      setFeaturedPlaylists(featuringPlaylists.playlists.items);
      setIsLoading({ featuredPlaylists: false });
    } catch (error) {
      console.error(error);
    }
  };

  const fetchPlaylistsById = async (playlist_id, setter) => {
    try {
      const { data: playlists } = await getPlaylist(playlist_id);
      setter({ id: playlists?.id, data: playlists.tracks.items.splice(0, 20) });
      setIsLoading({ loadingPlaylistsById: false });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    let dupCharts = [...charts];
    fetchFeaturedPlaylists();
    fetchNewReleases();
    fetchPlaylistsById("37i9dQZF1DWSYPG5hvDijP", setHiphop);
    fetchPlaylistsById("37i9dQZF1DXcBWIGoYBM5M", setTopHits);
    fetchPlaylistsForCategory("kpop", setKpop);
    fetchPlaylistsForCategory("mood", setMood);
    setDailyCharts(dupCharts.splice(0, 20));
  }, []);

  if (Object.values(isLoading).every(Boolean)) {
    return <HomePageSkeleton />;
  }

  return (
    <div className="home-container">
      <Carousel
        limit={newReleases.limit}
        title={"New Releases"}
        data={newReleases.data}
      />
      <Carousel
        categoryId={"charts"}
        title={"Daily Top 50"}
        data={dailyCharts}
      />
      {topHits.data && (
        <TopSongs title={"Today's Top Hits"} topSongs={topHits} />
      )}
      <Carousel title={"Editor's Pick"} data={featuredPlaylists} />
      <Carousel
        playlistId={hiphop.id}
        title={"Hip Hop in India"}
        data={hiphop.data}
      />
      <Carousel categoryId={"mood"} title={"Music by Mood"} data={mood} />
      <Carousel categoryId={"kpop"} title={"Kpop"} data={kpop} />
    </div>
  );
}
