'use strict';
const PREFIX='bengkel-life-'+encodeURIComponent(self.registration.scope)+'-';
const CACHE=PREFIX+'3.0.0';
const ASSETS=['./','./index.html','./manifest.webmanifest','./favicon.svg','./apple-touch-icon.png','./icons/app-192.png','./icons/app-512.png','./icons/maskable-512.png','./icons/favicon-32.png','./icons/favicon-16.png'];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS))));
self.addEventListener('activate',event=>event.waitUntil((async()=>{for(const key of await caches.keys())if(key.startsWith(PREFIX)&&key!==CACHE)await caches.delete(key);await self.clients.claim()})()));
self.addEventListener('message',event=>{if(event.data?.type==='SKIP_WAITING')self.skipWaiting()});
self.addEventListener('fetch',event=>{
 const url=new URL(event.request.url);if(event.request.method!=='GET'||url.origin!==self.location.origin||!url.href.startsWith(self.registration.scope))return;
 if(event.request.mode==='navigate'&&![new URL('./',self.registration.scope).pathname,new URL('./index.html',self.registration.scope).pathname].includes(url.pathname))return;
 if(event.request.mode==='navigate'){event.respondWith((async()=>{const cache=await caches.open(CACHE);try{const response=await fetch(event.request);if(response.ok){await cache.put(new URL('./index.html',self.registration.scope),response.clone());return response}return await cache.match(new URL('./index.html',self.registration.scope))||response}catch{return await cache.match(new URL('./index.html',self.registration.scope))||new Response('Buka Bengkel Life satu kali saat online untuk menyiapkan permainan offline.',{status:503,headers:{'Content-Type':'text/plain; charset=utf-8'}})}})());return}
 const allowed=ASSETS.some(path=>new URL(path,self.registration.scope).pathname===url.pathname);if(!allowed)return;
 event.respondWith((async()=>{const cache=await caches.open(CACHE),cached=await cache.match(event.request,{ignoreSearch:true});if(cached)return cached;const response=await fetch(event.request);if(response.ok)await cache.put(event.request,response.clone());return response})());
});
