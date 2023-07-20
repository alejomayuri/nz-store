import { createContext, useState, useEffect, useContext } from 'react';
import { auth, googleProvider, db } from '@/firebase/client';
import { useUser } from '@/hooks/useUser';
import { useRouter } from 'next/router';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const userData = useUser()
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setCurrentUser(user);
            setLoading(false);
        });

        // Se debe cancelar la suscripción al desmontar el componente
        return () => unsubscribe();
    }, []);

    const singup = async (email, password) => {
        try {
            const userCredential = await auth.createUserWithEmailAndPassword(email, password);
            const { user } = userCredential;
            const newUser = {
                userId: user.uid,
            };

            if (userData && userData.userData) {
                const userExist = userData.userData.find((u) => u.userId === user.uid || u.uid === user.uid);
           
                if (!userExist) {
                    await db.collection('users').doc(user.uid).set({
                        userId: newUser.userId,
                    });
                }
            }

            router.reload();
        } catch (error) {
            console.log(error);
        }
    }

    const loginWithGoogle = async () => {
        try {
            const userCredential = await auth.signInWithPopup(googleProvider);
            const { user } = userCredential;
            const newUser = {
                userId: user.uid,
            };

            if (userData && userData.userData) {
                const userExist = userData.userData.find((u) => u.userId === user.uid || u.uid === user.uid);

                if (!userExist) {
                    await db.collection('users').doc(user.uid).set({
                        userId: newUser.userId,
                    });
                }
            }

            router.reload();
        } catch (error) {
            console.log(error);
        }
    }

    const login = (email, password) => {
        return auth.signInWithEmailAndPassword(email, password)
    }

    const logout = () => {
        return auth.signOut()
    }
    
    return (
        <AuthContext.Provider value={{ singup, loginWithGoogle, login, logout, currentUser, loading }}>
            {children}
        </AuthContext.Provider>
    );
}