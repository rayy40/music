require("dotenv").config();

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
let REDIRECT_URI = process.env.REDIRECT_URI || "http://localhost:5000/callback";
let FRONTEND_URI = process.env.FRONTEND_URI || "http://localhost:3000";
const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== "production") {
  REDIRECT_URI = "http://localhost:5000/callback";
  FRONTEND_URI = "http://localhost:3000";
}

const express = require("express");
const cors = require("cors");
const axios = require("axios");
const qs = require("qs");
const path = require("path");
const cookieParser = require("cookie-parser");
const cluster = require("cluster");
const numCPUs = require("os").cpus().length;
const history = require("connect-history-api-fallback");

const app = express();

app.use(cors());

const generateRandomString = (length) => {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

const stateKey = "spotify_auth_state";

// Multi-process to utilize all CPU cores.
if (cluster.isMaster) {
  console.warn(`Node cluster master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.error(
      `Node cluster worker ${worker.process.pid} exited: code ${code}, signal ${signal}`
    );
  });
} else {
  const app = express();

  // Priority serve any static files.
  app.use(express.static(path.resolve(__dirname, "../client/build")));

  app
    .use(express.static(path.resolve(__dirname, "../client/build")))
    .use(cors())
    .use(cookieParser())
    .use(
      history({
        verbose: true,
        rewrites: [
          { from: /\/login/, to: "/login" },
          { from: /\/callback/, to: "/callback" },
          { from: /\/refresh_token/, to: "/refresh_token" },
        ],
      })
    )
    .use(express.static(path.resolve(__dirname, "../client/build")));

  app.get("/", function (req, res) {
    res.render(path.resolve(__dirname, "../client/build/index.html"));
  });

  app.get("/login", function (req, res) {
    const state = generateRandomString(16);
    res.cookie(stateKey, state);

    // your application requests authorization
    const scope =
      "ugc-image-upload user-read-private user-read-email user-read-currently-playing streaming user-library-read user-read-recently-played user-top-read user-follow-read playlist-read-private playlist-read-collaborative";

    res.redirect(
      `https://accounts.spotify.com/authorize?response_type=code&client_id=${CLIENT_ID}&scope=${encodeURIComponent(
        scope
      )}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&state=${state}`
    );
  });

  app.get("/callback", function (req, res) {
    // your application requests refresh and access tokens
    // after checking the state parameter

    const code = req.query.code || null;
    const state = req.query.state || null;
    const storedState = req.cookies ? req.cookies[stateKey] : null;

    if (state === null || state !== storedState) {
      res.redirect(`/#error=state_mismatch`);
    } else {
      res.clearCookie(stateKey);
      const authOptions = {
        url: "https://accounts.spotify.com/api/token",
        form: {
          code: code,
          redirect_uri: REDIRECT_URI,
          grant_type: "authorization_code",
        },
        headers: {
          Authorization: `Basic ${Buffer.from(
            `${CLIENT_ID}:${CLIENT_SECRET}`
          ).toString("base64")}`,
        },
        json: true,
      };

      axios
        .post(authOptions.url, qs.stringify(authOptions.form), {
          headers: authOptions.headers,
        })
        .then((response) => {
          const access_token = response.data.access_token;
          const refresh_token = response.data.refresh_token;

          // we can also pass the token to the browser to make requests from there
          res.redirect(
            `${FRONTEND_URI}/#access_token=${access_token}&refresh_token=${refresh_token}`
          );
        })
        .catch((error) => {
          res.redirect(`/#error=invalid_token`);
        });
    }
  });

  app.get("/refresh_token", function (req, res) {
    // requesting access token from refresh token
    const refresh_token = req.query.refresh_token;
    const authOptions = {
      method: "post",
      url: "https://accounts.spotify.com/api/token",
      headers: {
        Authorization: `Basic ${Buffer.from(
          `${CLIENT_ID}:${CLIENT_SECRET}`
        ).toString("base64")}`,
      },
      data: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token,
      }),
    };

    axios(authOptions)
      .then((response) => {
        const access_token = response.data.access_token;
        res.send({ access_token });
      })
      .catch((error) => {
        console.error(error);
        res.sendStatus(400);
      });
  });
  // All remaining requests return the React app, so it can handle routing.
  app.get("*", function (request, response) {
    response.sendFile(
      path.resolve(__dirname, "../client/public", "index.html")
    );
  });

  app.listen(PORT, function () {
    console.warn(
      `Node cluster worker ${process.pid}: listening on port ${PORT}`
    );
  });
}
