"use strict";var precacheConfig=[["/Tomato-potato-time/index.html","9b3171897a4c7bb1f3b545a5cfb0338e"],["/Tomato-potato-time/static/css/main.fb7e042b.css","1eff08d7759675c182ba16eee6d14391"],["/Tomato-potato-time/static/js/0.143c9275.chunk.js","b24fc502a9c704e013da8ec16bfb9041"],["/Tomato-potato-time/static/js/1.f0075aa0.chunk.js","271e6c68a8b3b4a57b3f40f3a1473cc1"],["/Tomato-potato-time/static/js/2.b67e78f9.chunk.js","bacbaca0091a14905823f6d52d8f700b"],["/Tomato-potato-time/static/js/3.302c2955.chunk.js","207f4e1cab491d5744b595cf2b648016"],["/Tomato-potato-time/static/js/4.830c908e.chunk.js","2ff4ea5d6a97a4ee06362f9c47e4c5bd"],["/Tomato-potato-time/static/js/5.d5b0ac82.chunk.js","2eb5fce745844c9aa1bf43f955b571d9"],["/Tomato-potato-time/static/js/6.5bf51156.chunk.js","0c88c5ddd2c4966765f382512d00dff3"],["/Tomato-potato-time/static/js/main.f6d6928b.js","e8e32fe2972355adbfa4ca733c0eaebe"],["/Tomato-potato-time/static/media/logo.8086066b.svg","8086066b2709de76f4930569b2ff4147"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,t){var n=new URL(e);return"/"===n.pathname.slice(-1)&&(n.pathname+=t),n.toString()},cleanResponse=function(t){return t.redirected?("body"in t?Promise.resolve(t.body):t.blob()).then(function(e){return new Response(e,{headers:t.headers,status:t.status,statusText:t.statusText})}):Promise.resolve(t)},createCacheKey=function(e,t,n,a){var r=new URL(e);return a&&r.pathname.match(a)||(r.search+=(r.search?"&":"")+encodeURIComponent(t)+"="+encodeURIComponent(n)),r.toString()},isPathWhitelisted=function(e,t){if(0===e.length)return!0;var n=new URL(t).pathname;return e.some(function(e){return n.match(e)})},stripIgnoredUrlParameters=function(e,n){var t=new URL(e);return t.hash="",t.search=t.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(t){return n.every(function(e){return!e.test(t[0])})}).map(function(e){return e.join("=")}).join("&"),t.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var t=e[0],n=e[1],a=new URL(t,self.location),r=createCacheKey(a,hashParamName,n,/\.\w{8}\./);return[a.toString(),r]}));function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(a){return setOfCachedUrls(a).then(function(n){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(t){if(!n.has(t)){var e=new Request(t,{credentials:"same-origin"});return fetch(e).then(function(e){if(!e.ok)throw new Error("Request for "+t+" returned a response with status "+e.status);return cleanResponse(e).then(function(e){return a.put(t,e)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var n=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(t){return t.keys().then(function(e){return Promise.all(e.map(function(e){if(!n.has(e.url))return t.delete(e)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(t){if("GET"===t.request.method){var e,n=stripIgnoredUrlParameters(t.request.url,ignoreUrlParametersMatching),a="index.html";(e=urlsToCacheKeys.has(n))||(n=addDirectoryIndex(n,a),e=urlsToCacheKeys.has(n));var r="/Tomato-potato-time/index.html";!e&&"navigate"===t.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],t.request.url)&&(n=new URL(r,self.location).toString(),e=urlsToCacheKeys.has(n)),e&&t.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(n)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(e){return console.warn('Couldn\'t serve response for "%s" from cache: %O',t.request.url,e),fetch(t.request)}))}});