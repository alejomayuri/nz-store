import firebase from "firebase/compat/app"
import "firebase/compat/firestore"
import 'firebase/compat/auth';
import 'firebase/compat/storage';

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

export const db = firebase.firestore()

export const fetchProducts = () => {
    return db
      .collection("prueba")
      .get()
      .then(({ docs }) => {
        return docs.map((doc) => {
          const data = doc.data()
          const id = doc.id
  
          return {
            ...data,
            id
          }
        }
      )
  })
}

export const fetchOrders = () => {
    return db
      .collection("pedidos")
      .get()
      .then(({ docs }) => {
        return docs.map((doc) => {
          const data = doc.data()
          const id = doc.id

          return {
            ...data,
            id
          }
        }
      )
  })
}

export const fetchUser = (userId) => {
    return db
      .collection("users")
      .get()
      .then(({ docs }) => {
        return docs.map((doc) => {
          const data = doc.data()
          const id = doc.id
  
          return {
            ...data,
            id
          }
        }
      )
  })
}

export const auth = firebase.auth();

export const googleProvider = new firebase.auth.GoogleAuthProvider();

export const uploadUserData = (user) => {
    return db
      .collection("users")
      .doc(user.userId)
      .set(user)
      .then(() => {
        return user
      })
  }

export const uploadOrder = (order) => {
    return db
      .collection("pedidos")
      .add(order)
      .then(({ id }) => {
        return id
      })
  }

export const getStorage = () => {
  return firebase.storage()
}

export const timeStamps = () => {
  const timestamp = firebase.firestore.Timestamp.now();
  return timestamp.seconds;
}

export const editFormProduct = (id, form) => {
  return db.collection('prueba').doc(id).update(form)
}

export const createProduct = (form) => {
  return db.collection('prueba').add(form)
}