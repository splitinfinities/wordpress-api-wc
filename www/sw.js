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
    "revision": "d8a2a6bdf50413a4ee7230f83ab7e975"
  },
  {
    "url": "build/wordpress-api/n4tovou7.js",
    "revision": "b18f1bbd94a001d560f9e7e60fad80de"
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
    "revision": "63feb0b0f4178cb26650e048e0cc322f"
  },
  {
    "url": "build/wordpress-api/xeugkddn.js",
    "revision": "1481b63b0ccca848056dc3df8b681da5"
  },
  {
    "url": "index.html",
    "revision": "80bbdb375865903adc6d313ea0a56b0b"
  }
];

const workboxSW = new self.WorkboxSW({
  "skipWaiting": true,
  "clientsClaim": true
});
workboxSW.precache(fileManifest);
