import { useState } from "react"
import { useAuth } from "@/context/AuthContext"
import { useRouter } from "next/router"

export const useRegister = () => {
    const { singup } = useAuth()
    const router = useRouter()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const handleEmail = (e) => setEmail(e.target.value)
    const handlePassword = (e) => setPassword(e.target.value)
    const handleConfirmPassword = (e) => setConfirmPassword(e.target.value)

    const handleRegister = (e) => {
        e.preventDefault();
        setLoading(true)
        if (password !== confirmPassword) {
            setError('las contraseñas son distintas');
        } else {
            singup(email, password)
                .then(() => {
                    setLoading(false)
                    router.replace("/user")
                })
                .catch((error) => setError('Server error'));
        }
    };

    return {
        error,
        loading,
        handleRegister,
        handleEmail,
        handlePassword,
        handleConfirmPassword,
        email,
        password,
        confirmPassword
    };
}