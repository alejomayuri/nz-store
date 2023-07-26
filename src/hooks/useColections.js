import { useEffect, useState } from "react"
import { fetchColections } from "@/firebase/client"

export const useColections = () => {
    const [colections, setColections] = useState([])
    const [loading, setLoading] = useState(false)
    
    useEffect(() => {
        setLoading(true)
        fetchColections().then((colections) => {
            setColections(colections)
            setLoading(false)
        })
    }, [])

    return {colections, loading}
}