import { useState } from "react"

export default function useCreatePopUp() {
    const INITIAL_STATE = {
        mainText: null,
        buttonText: null,
        buttonLink: null,
        delayTime: null
    }

    const [formPopUp, setFormPopUp] = useState(INITIAL_STATE)

    const handleOnChange = (e) => setFormPopUp({
        ...formPopUp,
        [e.target.name]: e.target.value
    })

    return {
        formPopUp,
        handleOnChange,
    }
}