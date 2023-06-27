import { useEffect, useState } from "react"
import { fetchCupons } from '@/firebase/client'

export const useCupons = () => {
    const [cupons, setCupons] = useState([])
    const [loading, setLoading] = useState(false)
    
    useEffect(() => {
        setLoading(true)
        fetchCupons().then((cupons) => {
            setCupons(cupons)
            setLoading(false)
        })
    }, [])

    return {cupons, loading}
}