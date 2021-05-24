import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

import products from "../json/products.json";
import inspirations from "../json/inspirations.json";
import shop from "../json/shop.json";
import designers from "../json/designers.json";
import aboutus from "../json/about-us";

const firebaseConfig = {
  apiKey: "AIzaSyCEUGQwE2ts9kDMgeCXcd12x8M5KBVBIss",
  authDomain: "yourhome2-37337.firebaseapp.com",
  projectId: "yourhome2-37337",
  storageBucket: "yourhome2-37337.appspot.com",
  messagingSenderId: "199138331232",
  appId: "1:199138331232:web:c6c36292a4d547fd085105"
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


