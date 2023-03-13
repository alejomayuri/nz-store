import { useState } from "react"
import { useAuth } from "@/context/AuthContext"

export const useLogin = () => {
    const { login, loginWithGoogle } = useAuth()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const handleEmail = (e) => setEmail(e.target.value)
    const handlePassword = (e) => setPassword(e.target.value)

    const hangleLogin = (e) => {
        e.preventDefault();
        setLoading(true)
        login(email, password)
            .then(() => {
                setLoading(false)
                router.replace("/user")
            })
            .catch((error) => setError('Server error'));
    }

    const handleLoginWithGoogle = () => {
        setLoading(true)
        loginWithGoogle()
            .then(() => {
                setLoading(false)
                router.replace("/user")
            })
            .catch((error) => setError('Server error'));
    }

    return {
        error,
        loading,
        hangleLogin,
        handleLoginWithGoogle,
        handleEmail,
        handlePassword,
    };
}