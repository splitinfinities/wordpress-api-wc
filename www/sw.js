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
    "revision": "adfc1e18228e3c6419ff6c0b83081121"
  },
  {
    "url": "build/wordpress-api/dx9iagf6.js",
    "revision": "01990b5bb1a88ac38be720f12c8de2e8"
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
    "revision": "ba5ef9deed0f8db88804b25e40f34c93"
  },
  {
    "url": "build/wordpress-api/xyekswxr.js",
    "revision": "7112cdfa8cd6d2fc4d1db43edb0b75c8"
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
