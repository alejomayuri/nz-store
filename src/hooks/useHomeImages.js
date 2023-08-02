import { useEffect, useState } from "react"
import { fetchHomeImages } from "@/firebase/client"

export const useHomeImages = () => {
    const [homeImages, setHomeImages] = useState([])
    const [loading, setLoading] = useState(false)
    
    useEffect(() => {
        setLoading(true)
        fetchHomeImages().then((homeImages) => {
            setHomeImages(homeImages)
            setLoading(false)
        })
    }, [])

    return {homeImages, loading}
}