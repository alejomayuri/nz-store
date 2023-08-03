import { useEffect, useState } from "react"
import { fetchSecondaryBanner } from "@/firebase/client"

export const useSecondaryBanner = () => {
    const [secondaryBanner, setSecondaryBanner] = useState([])
    const [loading, setLoading] = useState(false)
    
    useEffect(() => {
        setLoading(true)
        fetchSecondaryBanner().then((secondaryBanner) => {
            setSecondaryBanner(secondaryBanner)
            setLoading(false)
        })
    }, [])

    return {secondaryBanner, loading}
}