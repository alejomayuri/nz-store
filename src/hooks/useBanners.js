import { useEffect, useState } from "react"
import { fetchBanners } from "@/firebase/client"

export const useBanners = () => {
    const [banners, setBanners] = useState([])
    const [loading, setLoading] = useState(false)
    
    useEffect(() => {
        setLoading(true)
        fetchBanners().then((banners) => {
            setBanners(banners)
            setLoading(false)
        })
    }, [])

    return {banners, loading}
}