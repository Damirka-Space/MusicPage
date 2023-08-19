// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  auth_client_name: "music-server",
  auth_client_id: "server",
  auth_client_secret:"secret",
  auth_scopes: "profile music-server.read music-server.write",
  auth_base64: "Basic c2VydmVyOnNlY3JldA==",
  auth_redirect: "http://localhost:4200/user/authorized",
  auth_login: "http://localhost:9000/auth/oauth2/authorize",
  auth_logout: "http://localhost:9000/auth/logout",
  auth_token: "http://localhost:9000/auth/oauth2/token",
  auth_introspect: "http://localhost:9000/auth/oauth2/introspect",

  api_root: "http://localhost:8090/api",
  api_main: "/main",
  api_channel: "/channel",
  api_channel_list: "/channel/list",
  api_channel_create: "/channel/create",
  api_collection_albums: "/collection/albums/",
  api_collection_playlists: "/collection/playlists/",
  api_collection_authors: "/collection/authors/",
  api_like_track: "/like/track/",
  api_like_album: "/like/album/",
  api_history_save_track: "/history/save/track/",
  api_history_save_album: "/history/save/album/",
  api_album_get: "/album/get/",
  api_tracks_get: "/album/tracks/get/",
  api_track_get: "http://localhost:8090/api/track/get/",
  api_user_get: "http://localhost:8090/api/user",
  
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
