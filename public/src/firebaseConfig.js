import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
import { getMessaging, getToken, onMessage } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-messaging.js";

const firebaseConfig = {
  apiKey: "AIzaSyAsFR7YV5hU1KGX3GkxPkPuQ7IGJ9coz-c",
  authDomain: "sample-notification-proj-932b9.firebaseapp.com",
  projectId: "sample-notification-proj-932b9",
  storageBucket: "sample-notification-proj-932b9.firebasestorage.app",
  messagingSenderId: "542619262495",
  appId: "1:542619262495:web:5455294aa2684cdf24ff2a",
  measurementId: "G-8F243Q28EC"
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export async function requestPermissionAndGetToken() {
  try {
    // Demander la permission pour les notifications
    const permission = await Notification.requestPermission();
    if (permission !== 'granted') {
      throw new Error('Permission de notification refusée');
    }

    // Enregistrer ou récupérer le service worker
    const registration = await navigator.serviceWorker.register('/public/firebase-messaging-sw.js', { scope: '/public/' });
    console.log('Service Worker enregistré avec succès:', registration);

    // Attendre que le service worker soit activé
    await navigator.serviceWorker.ready;
    console.log('Service Worker activé');
    
    // Obtenir le token FCM
    const token = await getToken(messaging, {
      vapidKey: "BE2fDSqlzqLC8ep91XDgQBMBWH6vaxDzkNQJHyRHHdT2hcn6_9kQGcsttsXpV6m-U3dzsgc6Y9QJsHBAJGFRT5E",
      serviceWorkerRegistration: registration
    });
    
    console.log("🔑 Token FCM :", token);
    return token;
  } catch (err) {
    console.error("Erreur FCM :", err);
    throw err;
  }
}

export function listenMessages(callback) {
  onMessage(messaging, (payload) => {
    console.log("💬 Message reçu en premier plan :", payload);
    if (callback) callback(payload);
  });
}


