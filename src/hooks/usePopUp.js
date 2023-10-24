import { useEffect, useState } from "react"
import { fetchPopUp } from "@/firebase/client"

export const usePopUp = () => {
    const [popUp, setPopUp] = useState([])
    const [loading, setLoading] = useState(false)
    
    useEffect(() => {
        setLoading(true)
        fetchPopUp().then((popup) => {
            setPopUp(popup)
            setLoading(false)
        })
    }, [])

    return { popUp, loading }
}