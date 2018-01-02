importScripts('workbox-sw.prod.v2.1.2.js');

/**
 * DO NOT EDIT THE FILE MANIFEST ENTRY
 *
 * The method precache() does the following:
 * 1. Cache URLs in the manifest to a local cache.
 * 2. When a network request is made for any of these URLs the response
 *    will ALWAYS comes from the cache, NEVER the network.
 * 3. When the service worker changes ONLY assets with a revision change are
 *    updated, old cache entries are left as is.
 *
 * By changing the file manifest manually, your users may end up not receiving
 * new versions of files because the revision hasn't changed.
 *
 * Please use workbox-build or some other tool / approach to generate the file
 * manifest which accounts for changes to local files and update the revision
 * accordingly.
 */
const fileManifest = [
  {
    "url": "build/wordpress-api.js",
    "revision": "81f2f17ba6966397dbc99e584e8776cf"
  },
  {
    "url": "build/wordpress-api/wordpress-api.core.js",
    "revision": "cdbbd3118d253d7a5f81bc49c8657138"
  },
  {
    "url": "build/wordpress-api/wordpress-api.core.pf.js",
    "revision": "cf4fd170fae92c8ba34bf4588ef17079"
  },
  {
    "url": "build/wordpress-api/wordpress-api.core.ssr.js",
    "revision": "d132c123c14d09dbd9057dde87cbdf9d"
  },
  {
    "url": "build/wordpress-api/wordpress-api.js",
    "revision": "48acdfe16540c5bf8b655f358f3b10f2"
  },
  {
    "url": "build/wordpress-api/wordpress-api.registry.json",
    "revision": "180ce4dd21e104686faee871bea17f4d"
  },
  {
    "url": "index.html",
    "revision": "6abde8791aadf7e49e3be20110050b89"
  }
];

const workboxSW = new self.WorkboxSW({
  "skipWaiting": true,
  "clientsClaim": true
});
workboxSW.precache(fileManifest);
