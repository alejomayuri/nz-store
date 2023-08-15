import style from './Option.module.css'
import { useState, useEffect } from 'react'
import DeleteIcon from '@/components/global/Icons/deleteIcon'

const Option = ({ 
    initialOptionValues, 
    optionId, 
    optionName, 
    onChange, 
    handleDeleteOptions, 
    optionValues, 
    create,
    clearVariations,
    optionQuantity,
    setTheseProductsHaveOptions}) => {
    // const [inputs, setInputs] = useState([{ id: 1, value: "" }]);
    const [inputs, setInputs] = useState([])
    const [initialOptions, setInitialOptions] = useState(null)
    const [name, setName] = useState("");

    useEffect(() => {
        if (initialOptionValues) {
            setInitialOptions(initialOptionValues)
        }
    }, [initialOptionValues])

    useEffect(() => {
        if (initialOptions) {
            const { values } = initialOptions
            const newInputs = values.map((value, index) => {
                return { id: index + 1, value }
            })
            setInputs(newInputs)
            setName(initialOptions.name)
        } else {
            setInputs([{ id: 1, value: "" }])
        }
    }, [initialOptions])

    const values = inputs.map(input => input.value);
    
    const [hideThisOption, setHideThisOption] = useState(false);

    const handleName = (e) => {
        setName(e.target.value)
    }

    const handleInputChange = (id, value) => {
      // Actualiza el valor del input correspondiente
      const newInputs = inputs.map(input => {
        if (input.id === id) {
          return { ...input, value };
        }
        return input;
      });
      setInputs(newInputs);
  
      // Agrega un nuevo input si el último input tiene un valor
      const lastInput = newInputs[newInputs.length - 1];
      if (lastInput.value !== "") {
        setInputs([...newInputs, { id: lastInput.id + 1, value: "" }]);
      }

    //   onChange(optionId, name, values)
    };

    useEffect(() => {
        if (initialOptions || create) {
            onChange(optionId, name, values)
        }
    }, [name, optionId, inputs, initialOptions])
    
    const handleDelete = () => {
        handleDeleteOptions(optionId)
        setHideThisOption(true)
        if (optionQuantity === 1) {
            clearVariations([])
            setTheseProductsHaveOptions(false)
        }
    }

    const handleDeleteOption = (id) => {
        setInputs(inputs.filter(input => input.id !== id))
    }

    return (
        <div className={`${style.option} ${hideThisOption ? style.hide : ""}`}>
            <div className={style.optionName}>
                <label htmlFor="options">Nombre de la opción</label>
                <div className={style.valueWrapper}>
                    <input value={name} type="text" name="name_option" placeholder="Color" onChange={handleName} />
                    <button onClick={handleDelete} className={style.deleteValue}>
                        <DeleteIcon stroke={"#c1c1c1"} width="23px" height="22px" />
                    </button>
                </div>
            </div>
            <div className={style.optionValue}>
                <label htmlFor="options">Valores de la opción</label>
                {inputs.map(input => (
                    <div className={style.valueWrapper} key={input.id}>
                        <input
                            key={input.id}
                            // value={input.value}
                            onChange={e => handleInputChange(input.id, e.target.value)}
                            name="values_option"
                            className={style.value}
                            placeholder={input.id === 1 ? "Rojo" : "Agregar otro valor"}
                            value={input.value}
                        />
                        {
                            input.value !== "" && (
                                <button onClick={() => handleDeleteOption(input.id)} className={style.deleteValue}>
                                    <DeleteIcon stroke={"#c1c1c1"} width="23px" height="22px" />
                                </button>
                            )
                        }
                    </div>
                ))}
            </div>
        </div>
    )
}

export { Option }