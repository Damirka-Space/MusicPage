// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  api_root: "http://localhost:8090",
  api_main: "/api/main",
  api_album_get: "/api/album/get/",
  api_tracks_get: "/api/album/tracks/get/",
  api_track_get: "/api/track/get/",

  api_image_get: "http://localhost:8090/api/image/get/",
  api_image_medium_get: "http://localhost:8090/api/image/medium/get/",
  api_album_image_get: "http://localhost:8090/api/album/image/medium/get/",
  api_album_track_image_get: "http://localhost:8090/api/album/image/small/get/",
  api_album_track_metadata_image_get: "http://localhost:8090/api/album/image/get/"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
