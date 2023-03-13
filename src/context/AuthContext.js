import { createContext, useState, useEffect, useContext } from 'react';
import { auth, googleProvider } from '@/firebase/client';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            setCurrentUser(user);
            setLoading(false);
        });
    }, []);

    const singup = (email, password) => {
        return auth.createUserWithEmailAndPassword(email, password)
    }

    const loginWithGoogle = () => {
        return auth.signInWithPopup(googleProvider)
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