importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js');

firebase.initializeApp({
    apiKey: "AIzaSyC_11EkKOt9eSE5iNnsQ4swloVO8zvUi9Q",
    authDomain: "gestiolink-46df5.firebaseapp.com",
    databaseURL: "https://gestiolink-46df5-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "gestiolink-46df5",
    storageBucket: "gestiolink-46df5.firebasestorage.app",
    messagingSenderId: "470383410886",
    appId: "1:470383410886:web:14a614e030b0028bb821c7"
});

const messaging = firebase.messaging();

// Recevoir notification en arrière-plan
messaging.onBackgroundMessage((payload) => {
    const { title, body } = payload.notification || {};
    self.registration.showNotification(title || "Management Academy", {
        body: body || "Nouveau document disponible !",
        icon: 'https://via.placeholder.com/192x192/2d6a9f/ffffff?text=MA',
        badge: 'https://via.placeholder.com/72x72/2d6a9f/ffffff?text=MA',
        vibrate: [200, 100, 200],
        data: { url: self.location.origin + self.location.pathname }
    });
});

// Clic sur notification → ouvrir l'app
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(
        clients.openWindow(event.notification.data?.url || '/')
    );
});

const CACHE_NAME = 'management-academy-v2';
const urlsToCache = [
  '/Management-Academy/',
  '/Management-Academy/index.html'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
