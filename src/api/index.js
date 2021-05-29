import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

import jsonInfo from "../json/jsonInfo.json";
import products from "../json/products.json";
// import products from "../json/products.json";
// import inspirations from "../json/inspirations.json";
// import shop from "../json/shop.json";
// import designers from "../json/designers.json";
// import aboutus from "../json/about-us.json";

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
const allOrdersCollectionRef = firebase.firestore().collection("allOrders");

// export const getJSON = (url) => {
//   switch (url) {
//     case "/":
//       return products;
//     case "/inspirations":
//       return inspirations;
//     case "/shop":
//       return shop;
//     case "/designers":
//       return designers;
//     case "/about-us":
//       return aboutus;
//     default:
//       return products;
//   }
// };

const auth = firebase.auth();

const productsCollectionRef = firebase.firestore().collection("products");
const productsDocRef = productsCollectionRef.doc("json");
const allProductsCollectionRef = productsDocRef.collection("allProducts");
// const allOrdersCollectionRef = firebase.firestore().collection("allOrders");


export const getProductById = async (productId) => {
  // REFERENCE PRODUCTS COLLECTION
  const doc = await allProductsCollectionRef.doc(productId).get();
  return doc.data()
}



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



export const createOrderApi = async (order) => {
  const user = auth.currentUser.uid;
  const orderRef = await allOrdersCollectionRef.doc();
  const id = orderRef.id;
  // Store Data for Aggregation Queries
  await orderRef.set({
    ...order,
    id,
    user
  });
  return { ...order, id };

}

export const getOrderById = async (orderId) => {
  const doc = await allOrdersCollectionRef.doc(orderId).get();
  return doc.data()
}

export const updateUserInfoApi = async (email, password, displayName) => {
  const user = auth.currentUser;
  if(displayName)
    await user.updateProfile({ displayName });
  if(email)
    await user.updateEmail(String(email));
  if(password)
    await user.updatePassword(password);
  return user;
}
export const checkLoginApi = () => {
  const user = auth.currentUser;
  return user.uid?  true : false;
}

export const getOrderByUser = async () => {
  const user = auth.currentUser.uid;
  let jsonOrders = [];

  // QUERY Orders
  const querySnapshot = await allOrdersCollectionRef.where("user", "==", user).get();
  querySnapshot.forEach((doc) => {
    jsonOrders.push(doc.data());
  });
  return jsonOrders;
}

export const signOut = () => {
  auth.signOut();
}

export const getProducts = async (url) => {
  const collection = jsonInfo.find(element => element.url === url);
  const collectionName = collection.name || "allproducts";
  console.log(collectionName)
  let jsonProducts = [];

  
  // QUERY PRODUCTS
  let querySnapshot;
  if (collectionName === "allproducts")
    querySnapshot = await allProductsCollectionRef.get();
  else
    querySnapshot = await allProductsCollectionRef.where("name", "==", collectionName).get();
  querySnapshot.forEach((doc) => {
    jsonProducts.push(doc.data());
  });
  return jsonProducts;
}