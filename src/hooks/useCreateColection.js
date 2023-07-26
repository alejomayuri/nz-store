import { useEffect, useState } from "react"

export default function useCreateColection() {
    const FORM_STATE = {
        name: null,
        slug: null
    }

    const [formColection, setFormColection] = useState(
        FORM_STATE 
    )

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
        console.log("aqui")
    }, [formColection.name])

    return {
        formColection,
        handleOnChange,
        setFormColection
    }
}