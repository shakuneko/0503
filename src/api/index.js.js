import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

import products from "../json/products.json";
import inspirations from "../json/inspirations.json";
import shop from "../json/shop.json";
import designers from "../json/designers.json";
import aboutus from "../json/about-us";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APPID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENTID

};

firebase.initializeApp(firebaseConfig);


export const getJSON = (url) => {
  switch (url) {
    case "/":
      return products;
    case "/inspirations":
      return inspirations;
    case "/shop":
      return shop;
    case "/designers":
      return designers;
    case "/about-us":
      return aboutus;
    default:
      return products;
  }
};

export const postChatContent = (senderName, message) => {
  // REFERENCE CHATROOM DOCUMENT
  let chatroomDocRef = firebase.firestore()
    .collection("chatrooms")
    .doc("chatroom2");
  // REFERENCE CHATROOM MESSAGES
  let messagesCollectionRef = chatroomDocRef.collection("messages");
  messagesCollectionRef.add({
    senderName,
    message,
    timeStamp: Date.now(),
  });
}

export const authenticateAnonymously = () => {
  return firebase.auth().signInAnonymously();
};



export const signInWithEmailPassword = async (email, password) => {
  return await auth.signInWithEmailAndPassword(email, password);
}

export const registerWithEmailPassword = async (email, password, displayName) => {
  await auth.createUserWithEmailAndPassword(email, password);
  const user = auth.currentUser;
  await user.updateProfile({ displayName })
  return user;
}