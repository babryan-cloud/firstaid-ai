
const CACHE="firstaid-ai-v2-cache-v1";
const ASSETS=["./","./index.html","./css/style.css","./js/app.js","./js/search.js","./js/camera.js","./js/ai.js","./js/voice.js","./js/maps.js","./manifest.json"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)))});
self.addEventListener("fetch",e=>{
  e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)));
});
