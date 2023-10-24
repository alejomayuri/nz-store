import { useEffect, useState } from "react"
import { useColections } from '@/hooks/useColections'

export default function useCreateColection() {
    const { colectionsLength } = useColections()

    const FORM_STATE = {
        id: null,
        name: null,
        slug: null,
        order: null
    }

    const [formColection, setFormColection] = useState(
        FORM_STATE 
    )

    useEffect(() => {
        if (colectionsLength) {
            setFormColection({
                ...formColection,
                order: colectionsLength
            })
        }
    }, [colectionsLength])

    const handleOnChange = (e) => setFormColection({
        ...formColection,
        [e.target.name]: e.target.value
    })

    useEffect(() => {
        function removeAccents(str) {
            const accents = {
              'á': 'a',
              'é': 'e',
              'í': 'i',
              'ó': 'o',
              'ú': 'u',
              'ñ': 'n',
              'Á': 'A',
              'É': 'E',
              'Í': 'I',
              'Ó': 'O',
              'Ú': 'U',
              'Ñ': 'N',
            };
            
            return str?.replace(/[áéíóúñÁÉÍÓÚÑ]/g, (match) => accents[match]);
        }

        if (formColection.name){
            setFormColection({
                ...formColection,
                slug: removeAccents(formColection?.name)?.toLowerCase().replace(/ /g, '-')
            })
        }
    }, [formColection.name])

    return {
        formColection,
        handleOnChange,
        setFormColection
    }
}