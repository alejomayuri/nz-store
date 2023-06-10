import { useAuth } from "@/context/AuthContext"
import { LoginForm } from "@/components/BackPlataform/Login/Login";
import { useEffect, useState } from 'react'
import firebase from "firebase/compat/app"
import "firebase/compat/firestore"
import { BackLayout } from "@/Layouts/BackLayout";
import { BackHome } from "@/components/BackPlataform/Home/Home";

const BackPlataform = () => {
    const { currentUser } = useAuth()
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const checkAdminRole = async () => {
          if (currentUser) {
            const db = firebase.firestore();
            const userRef = db.collection('users').doc(currentUser.uid);
            const userDoc = await userRef.get();
    
            if (userDoc.exists) {
              const userData = userDoc.data();
              setIsAdmin(userData.admin);
            }
          }
        };
    
        checkAdminRole();
    }, [currentUser]);

    if (isAdmin) {
        return (
            <BackLayout>
                <BackHome />
            </BackLayout>
        )
    } else {
        return <LoginForm />
    }
}

export default BackPlataform