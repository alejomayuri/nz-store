import { useState, useEffect } from "react";
import { BoxLayout } from "../BoxLayout/BoxLayout";

const TitleAndDescription = ({ onChange, name, description }) => {
    const [nameState, setNameState] = useState("")
    const [descriptionState, setDescriptionState] = useState("")
    
    const handleNameChange = (e) => {
        setNameState(e.target.value)
        onChange(e)
    }

    const handleDescriptionChange = (e) => {
        setDescriptionState(e.target.value)
        onChange(e)
    }

    useEffect(() => {
        setNameState(name)
        setDescriptionState(description)
    }, [name, description])

    return (
        <BoxLayout>
            <div>
                <h3>Nombre</h3>
                <input
                    type="text"
                    onChange={handleNameChange}
                    name="name"
                    value={nameState}
                />
            </div>
            <div>
                <h3>Descripción</h3>
                <textarea
                    onChange={handleDescriptionChange}
                    name="description"
                    value={descriptionState}
                />
            </div>
        </BoxLayout>
    );
}

export { TitleAndDescription };