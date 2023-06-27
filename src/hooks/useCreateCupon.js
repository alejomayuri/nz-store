import { useState } from "react"
import { createCupon } from "@/firebase/client"

export default function useCreateCupon() {
    const [formCupon, setFormCupon] = useState({})

    const handleOnChange = (e) => setFormCupon({
        ...formCupon,
        [e.target.name]: e.target.value
    })

    const handleChangeDate = (e) => setFormCupon({
        ...formCupon,
        [e.target.name]: new Date(e.target.value).getTime()
    })

    const handleCreateCupon = (e) => {
        e.preventDefault()
        console.log(formCupon)
        createCupon(formCupon)
    }

    return {
        formCupon,
        handleOnChange,
        handleChangeDate,
        handleCreateCupon
    }
}