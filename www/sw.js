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
    "revision": "fe49b769e5b96c8c176ddb1bd3c21ccc"
  },
  {
    "url": "build/wordpress-api/iumgzhhz.js",
    "revision": "ee48471ae20a3e888f7752aa8aca3281"
  },
  {
    "url": "build/wordpress-api/qbz2prdw.js",
    "revision": "573903997962b18172588ed8196b6684"
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
    "revision": "49e61ab6020a9773beda869e9f100ca5"
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
