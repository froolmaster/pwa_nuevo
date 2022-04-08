//Limpiar esta basura
var url = window.location.href;
var pwa = '/pwa_nuevo/serviceWorker.js';
 
if(navigator.serviceWorker){
    if(url.includes('localhost')){
        pwa = '/serviceWorker.js';
    }
    navigator.serviceWorker.register(pwa);
}