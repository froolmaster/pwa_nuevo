
const cacheName = "cache-1";
const cacheDynamic = "dynamic-1";
const cacheImmutable = "immutable-1";
const app_shell = [
    "/" , 
    "index.html" , 
    "css/style.css" , 
    "favicon.ico" , 
    "js/app.js" , 
    "images/abs/ab1.png" , 
    "images/abs/ab2.png" , 
    "images/abs/ab3.png" , 
    "images/abs/ab4.png" ];

const app_immutable = [
    "https://netdna.bootstrapcdn.com/font-awesome/3.1.1/css/font-awesome.css" , 
    "https://fonts.googleapis.com/css?family=Quicksand:300,400" , 
    "https://fonts.googleapis.com/css?family=Lato:400,300" , 
    "libs/jquery.js"];



    self.addEventListener('install', event => {
        const cacheNormal = caches.open(cacheName).then(cache => {
             cache.addAll(app_shell);
         });
         const cacheImu = caches.open(cacheImmutable).then(cache => {
             cache.addAll(app_immutable);
         });
         event.waitUntil(Promise.all([cacheNormal,cacheImu]));
     });


         
    self.addEventListener('activate', event => {
        const respuesta = caches.keys().then(keys =>{
            keys.forEach(key => {
                if(key !== cacheName && key.includes('static')){
                    return caches.delete(key);
                }
            });
        });
        event.waitUntil(respuesta);
    });
    
    self.addEventListener('fetch', event => {
        const respuesta = caches.match(event.request).then( res => {
            if(res){return res;}
            else{
                return fetch(event.request).then(newRes => {
                    return actualizaCacheDinamico(cacheDynamic, event.request, newRes);
                });
            }
        });
    });

function actualizaCacheDinamico(dynamicCache, request, response){
    if(response.ok){
        return caches.open(dynamicCache).then(cache => {
            cache.put(request,response.clone() );
            return cache.clone();
        });
    }else{
        return response;
    }
}
