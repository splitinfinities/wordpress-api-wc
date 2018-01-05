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
    "revision": "e8689d74f8f3b1bcf21c55c5508ba845"
  },
  {
    "url": "build/wordpress-api/6dufn9g7.js",
    "revision": "d002bd835e440e14d8fc360af218fad2"
  },
  {
    "url": "build/wordpress-api/pig6k23h.js",
    "revision": "c7923595dfc77204517ea4cc53b1c6ab"
  },
  {
    "url": "build/wordpress-api/wordpress-api.5t2ohrol.js",
    "revision": "4155a56afbc89c4243e1cda171a3331f"
  },
  {
    "url": "build/wordpress-api/wordpress-api.hbthyscr.js",
    "revision": "d344fbe7ac9070870935b1337de61c35"
  },
  {
    "url": "build/wordpress-api/wordpress-api.nviqp1nd.js",
    "revision": "ba9abde0db598ad02595911126b45dd8"
  },
  {
    "url": "build/wordpress-api/wordpress-api.registry.json",
    "revision": "f464d280eed9a71b7761777b3b51aec6"
  },
  {
    "url": "index.html",
    "revision": "de184d72206258c3e38008e0222b8df8"
  }
];

const workboxSW = new self.WorkboxSW({
  "skipWaiting": true,
  "clientsClaim": true
});
workboxSW.precache(fileManifest);
