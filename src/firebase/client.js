import firebase from "firebase/compat/app"
import "firebase/compat/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyD1t565GQSz9Dr0vU3kAtySK077MG5YKks",
    authDomain: "nz-store-7bc04.firebaseapp.com",
    projectId: "nz-store-7bc04",
    storageBucket: "nz-store-7bc04.appspot.com",
    messagingSenderId: "230551736776",
    appId: "1:230551736776:web:f334736fffd8322b2170fd",
    measurementId: "G-5C6S58JQXH"
};

!firebase.apps.length && firebase.initializeApp(firebaseConfig)

const db = firebase.firestore()

export const fetchProducts = () => {
    return db
      .collection("products")
      .get()
      .then(({ docs }) => {
        return docs.map((doc) => {
          const data = doc.data()
          const id = doc.id
  
          return {
            ...data,
            id
          }
        })
      })
  }