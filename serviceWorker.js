importScripts('swa.js')

const STATIC_CACHE = "cache-1";
const DYNAMIC_CACHE = "dynamic-1";
const INMUTABLE_CACHE = "immutable-1";
const APP_SHELL = [
    "/" , 
    "index.html" , 
    "css/style.css" , 
    "favicon.ico" , 
    "js/app.js" , 
    "swa.js" , 
     ];

const APP_SHELL_INMUTABLE = [
    "https://netdna.bootstrapcdn.com/font-awesome/3.1.1/css/font-awesome.css" , 
    "https://fonts.googleapis.com/css?family=Quicksand:300,400" , 
    "https://fonts.googleapis.com/css?family=Lato:400,300" , 
    "libs/jquery.js" ,
    "images/abs/ab1.png" , 
    "images/abs/ab2.png" , 
    "images/abs/ab3.png" , 
    "images/abs/ab4.png"];



    self.addEventListener('install', event => {
        const cacheStatic = caches.open(STATIC_CACHE).then(cache => {
            cache.addAll(APP_SHELL);
        });
        const cacheInmutable = caches.open(INMUTABLE_CACHE).then(cache => {
            cache.addAll(APP_SHELL_INMUTABLE);
        });
        event.waitUntil(Promise.all([cacheStatic, cacheInmutable]));
    });
    
    self.addEventListener('activate', event => {
        const respuesta = caches.keys().then(keys => {
            keys.forEach(key => {
                if (key !== STATIC_CACHE && key.includes('static')) {
                    return caches.delete(key);
                }
            });
        });
        event.waitUntil(respuesta);
    });
    
    self.addEventListener('fetch', event => {
        const respuesta = caches.match(event.request).then(res => {
            if (res) { return res; }
            else {
                return fetch(event.request).then(newRes => {
                    return actualizaCacheDinamico(DYNAMIC_CACHE, event.request, newRes);
                });
            }
        });
    
        event.respondWith(respuesta);
    });