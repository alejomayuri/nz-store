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
        auth.onAuthStateChanged((user) => {
            setCurrentUser(user);
            setLoading(false);
        });
    }, []);

    const singup = (email, password) => {
        return auth
            .createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                const { user } = userCredential;

                const newUser = {
                    userId: user.uid,
                }

                if (userData) {
                    if (userData.userData) {
                        const userExist = userData.userData.find((u) => u.userId === user.uid || u.uid === user.uid)
                        
                        if (!userExist) {
                            return db
                                .collection('users')
                                .doc(user.uid)
                                .set(
                                    {
                                        userId: newUser.userId
                                    }
                                )
                                .then(() => {
                                    router.reload()
                                })
                        }
                    }
                }
            })
    }

    const loginWithGoogle = () => {
        return auth
            .signInWithPopup(googleProvider)
            .then((userCredential) => {
                const { user } = userCredential;

                const newUser = {
                    userId: user.uid,
                }

                if (userData) {
                    if (userData.userData) {
                        const userExist = userData.userData.find((u) => u.userId === user.uid || u.uid === user.uid)
                        
                        if (!userExist) {
                            return db
                                .collection('users')
                                .doc(user.uid)
                                .set(
                                    {
                                        userId: newUser.userId
                                    }
                                )
                                .then(() => {
                                    router.reload()
                                })
                        }
                    }
                }
            })
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