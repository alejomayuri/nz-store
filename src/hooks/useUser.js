import { useEffect, useState } from "react"
import { fetchUser } from '@/firebase/client'

export const useUser = ({ id } = { id: null }) => {
    const [userData, setUserData] = useState([])
    const [loading, setLoading] = useState(false)
    
    useEffect(() => {
        setLoading(true)
        fetchUser().then((users) => {
            setUserData(users)
            setLoading(false)
        })
    }, [])
    
    if (id) {
        return userData.find((user) => user?.userId === id)
    }

    if (Object.keys(userData).length > 0) {
        return {userData, loading}
    }
}