import { useState } from "react"

export default function useCreateSubcategory() {
    const FORM_STATE = {
        name: null
    }

    const [formSubcategory, setFormSubcategory] = useState(
        FORM_STATE 
    )

    const handleOnChange = (e) => setFormSubcategory({
        ...formSubcategory,
        [e.target.name]: e.target.value
    })

    return {
        formSubcategory,
        handleOnChange,
        setFormSubcategory
    }
}