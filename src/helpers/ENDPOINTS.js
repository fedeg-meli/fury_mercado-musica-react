const DEV = {
  login: "https://www.mocky.io/v2/5df672de3400006d00e5a5a3", // to login user
  login401: "https://www.mocky.io/v2/5df6772b3400006c00e5a5b2", // user and password wrong,
  getPlaylists: "https://www.mocky.io/v2/5df689783400002900e5a5dd",
  getPlaylists401: "https://www.mocky.io/v2/5df7769a32000058002dffc4",
  getPlaylistsEmpty: "https://www.mocky.io/v2/5df776f032000058002dffc6",
  createPlaylist: "https://www.mocky.io/v2/5df783d83200006f002e0042",
  createPlaylist401: "https://www.mocky.io/v2/5df78aa732000011002e0090",
  playlist: "https://www.mocky.io/v2/5df7bf913200005a542e0205",
  playlistEmpty: "http://www.mocky.io/v2/5df7af4e3200005a542e01a6",
  playlist401: "http://www.mocky.io/v2/5df7b3413200005a542e01bf",
  tracks: "https://www.mocky.io/v2/5df7cd24320000a0582e0242",
  tracksMany: "http://www.mocky.io/v2/5df7d3fe3200005a542e0267",
  saveSongPlaylist: "http://www.mocky.io/v2/5df7d942320000ee612e0292",
  saveSongPlaylist401: "http://www.mocky.io/v2/5df8d9a6300000042d889fd3"
};

const PROD = {};

const ENV = "dev";

export default ENV === "dev" ? DEV : PROD;
