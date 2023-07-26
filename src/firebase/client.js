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
      .orderBy("date", "desc")
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

export const fetchCupons = () => {
    return db
      .collection("cupones")
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

export const editFormProductFunction = (id, form) => {
  return db.collection('prueba').doc(id).update(form)
}

export const editUserData = (id, user) => {
  return db.collection('users').doc(id).update(user)
}

export const editOrder = (id, order) => {
  return db.collection('pedidos').doc(id).update(order)
}

export const createProduct = (form) => {
  return db.collection('prueba').add(form)
}

export const createCupon = (form) => {
  return db.collection('cupones').add(form)
}

export const deleteProduct = (id) => {
  return db.collection('prueba').doc(id).delete()
}

export const createBanner = (form) => {
  return db.collection('banners').add(form)
}

export const fetchBanners = () => {
  return db
    .collection("banners")
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

export const deleteBanner = (id) => {
  return db.collection('banners').doc(id).delete()
}

export const createColection = (form) => {
  return db.collection('colections').add(form)
}

export const fetchColections = () => {
  return db
    .collection("colections")
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

export const editColection = (id, form) => {
  return db.collection('colections').doc(id).update(form)
}

export const deleteColection = (id) => {
  return db.collection('colections').doc(id).delete()
}