import { useEffect, useState } from "react"
import { fetchColections } from "@/firebase/client"

export const useColections = ({id} = {id: null}) => {
    const [colections, setColections] = useState([])
    const [loading, setLoading] = useState(false)
    
    useEffect(() => {
        setLoading(true)
        fetchColections().then((colections) => {
            setColections(colections)
            setLoading(false)
        })
    }, [])

    if(id) {
        return {colections: colections.filter(colection => colection.id === id), loading}
    }

    return {colections, loading}
}