import { useAuth } from "@/context/AuthContext"
import { useEffect, useState } from 'react'
import firebase from "firebase/compat/app"
import { useRouter } from "next/router"
import "firebase/compat/firestore"
import { auth } from "@/firebase/client"

export const useAdmin = () => {
    const router = useRouter();
    const [isAdmin, setIsAdmin] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const { currentUser } = useAuth();
    const path = router.pathname;

    useEffect(() => {
        const checkUser = async () => {
            const db = firebase.firestore();
            const userRef = db.collection('users').doc(currentUser?.uid);
            const userDoc = await userRef.get();
            auth.onAuthStateChanged(user => {
                if (currentUser) {
                    if (user) {
                        if (userDoc.exists) {
                            const userData = userDoc.data();
                            if (userData.admin) {
                                setIsAdmin(userData.admin);
                            } else {
                                router.push("/");
                            }
                        }
                    }
                }
                setIsLoading(false)
            });
        }

        checkUser();
    }, [currentUser]);

    useEffect(() => {
        if (isLoading) return;
        if (!isAdmin && !auth.currentUser && router.pathname !== '/back-plataform') {
            router.push('/back-plataform');
        } else if (!isAdmin && path !== '/back-plataform') {
            router.push('/');
        }
    }, [isAdmin, path, router, isLoading]);

    return {
        isAdmin,
        isLoading
    };
}