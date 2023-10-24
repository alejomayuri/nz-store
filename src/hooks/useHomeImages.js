import { useEffect, useState } from "react"
import { fetchHomeImages } from "@/firebase/client"

export const useHomeImages = () => {
    const [homeImages, setHomeImages] = useState([])
    const [loading, setLoading] = useState(false)
    const [homeImagesLength, setHomeImagesLength] = useState(0)
    
    useEffect(() => {
        setLoading(true)
        fetchHomeImages().then((homeImages) => {
            setHomeImages(homeImages)
            setLoading(false)
        })
    }, [])

    useEffect(() => {
        setHomeImagesLength(homeImages.length)
    }, [homeImages])

    return {homeImages, loading, homeImagesLength}
}