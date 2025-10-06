importScripts("https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js");

const firebaseConfig = {
  apiKey: "AIzaSyAsFR7YV5hU1KGX3GkxPkPuQ7IGJ9coz-c",
  authDomain: "sample-notification-proj-932b9.firebaseapp.com",
  projectId: "sample-notification-proj-932b9",
  storageBucket: "sample-notification-proj-932b9.firebasestorage.app",
  messagingSenderId: "542619262495",
  appId: "1:542619262495:web:5455294aa2684cdf24ff2a",
  measurementId: "G-8F243Q28EC"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("Message en arrière-plan : ", payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});

