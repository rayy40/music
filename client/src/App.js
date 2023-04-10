import React, { useState, useEffect } from "react";
import { token as accessToken } from "./Authenticate/spotify";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {
  LoginPage,
  BrowsePage,
  AlbumPage,
  ArtistPage,
  YourMusicPage,
  SeeAllPage,
  HomePage,
  ChartsPage,
  PlaylistPage,
  DiscoverPage,
} from "./Pages";
import { SongProvider } from "./Components/SongContext/SongContext";
import Queue from "./Components/Queue/Queue";
import Header from "./Components/Header/Header";
import "./index.css";
import SongBar from "./Components/SongPlayer/SongBar";
import AccountPage from "./Pages/AccountPage/AccountPage";

function App() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    setToken(accessToken);
  }, []);

  const routes = [
    { path: "/", exact: true, component: HomePage },
    { path: "/browse", component: BrowsePage },
    { path: "/charts", component: ChartsPage },
    { path: "/discover/:id", component: DiscoverPage },
    { path: "/playlist/:id", component: PlaylistPage },
    { path: "/artist/:id", component: ArtistPage },
    { path: "/album/:id", component: AlbumPage },
    { path: "/seeAll/:id", component: SeeAllPage },
    { path: "/yourMusic", component: YourMusicPage },
    { path: "/account", component: AccountPage },
  ];

  return (
    <div className="App">
      {!token ? (
        <LoginPage />
      ) : (
        <SongProvider>
          <Router>
            <Header />
            <Switch>
              {routes.map((route) => (
                <Route
                  key={route.path}
                  path={route.path}
                  exact={route.exact || false}
                  component={route.component}
                />
              ))}
            </Switch>
            <SongBar />
            <Queue />
          </Router>
        </SongProvider>
      )}
    </div>
  );
}

export default App;
