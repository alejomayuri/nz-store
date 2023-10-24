import { useEffect, useState } from "react"
import { fetchColections } from "@/firebase/client"

export const useColections = ({id, colectionNames} = {id: null, colectionNames: []}) => {
    const [colections, setColections] = useState([])
    const [loading, setLoading] = useState(false)
    const [subcategories, setSubcategories] = useState([])
    const [colectionsLength, setColectionsLength] = useState(0)
    
    useEffect(() => {
        setLoading(true)
        fetchColections().then((colections) => {
            setColections(colections.sort(
                (a, b) => a.order - b.order
            ))
            setLoading(false)
        })
    }, [])

    const removeMayus = (string) => {
        return string.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
    }

    const removeRepeat = (array) => {
        const uniqueArray = array.filter((item, index) => {
            return array.findIndex(obj => obj.name === item.name) === index;
          });
        
          return uniqueArray;
    }

    useEffect(() => {
        if(colectionNames?.length > 0) {
            let subcategories = []

            const colectionsSelected = colections.filter(colection => colectionNames.includes(
                removeMayus(colection.name)
            ))
            
            colectionsSelected.forEach(colection => {
                if (colection?.subcategories) {
                    subcategories = [...subcategories, ...colection?.subcategories]
                }
            })

            setSubcategories(removeRepeat(subcategories))
        }
    }, [colectionNames, colections])

    useEffect(() => {
        setColectionsLength(colections.length)
    }, [colections])

    if(id) {
        return {colections: colections.filter(colection => colection.id === id), loading}
    }

    return {colections, subcategories, loading}
}