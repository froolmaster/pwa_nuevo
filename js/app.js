const cacheName = "cache-1";
const cacheDynamic = "dynamic-1";
const cacheImmutable = "immutable-1";
const app_shell = ["/" , "index.html" , "css/style.css" , "favicon.ico" , "js/app.js" , "img/abs/ab1.png" , 
"img/abs/ab2.png" , "img/abs/ab3.png" , "img/abs/ab4.png" , "img/abs/ab5.png"];

const app_immutable = ["index.html" , "https://netdna.bootstrapcdn.com/font-awesome/3.1.1/css/font-awesome.css" , 
"https://fonts.googleapis.com/css?family=Quicksand:300,400" , "https://fonts.googleapis.com/css?family=Lato:400,300" , 
"libs/jquery.js"];


self.addEventListener("install" , event => {
    const cacheNormal = caches.open(cacheName).then(
        cache => {
            cache.addAll(app_shell);
        }
    )

    const cacheImmutable = caches.open(cacheImmutable).then(
        cacheim =>{
            cacheim.addAll(app_immutable);
        }
    )

    event.waitUntil(Promise.all({cacheNormal , cacheImmutable}));
})