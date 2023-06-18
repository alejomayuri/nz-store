import style from './Options.module.css'
import { BoxLayout } from "../BoxLayout/BoxLayout";
import { useState, useCallback, useEffect } from 'react'
import { Option } from './Option/Option'

const Options = ({ onChange, productOptions, create }) => {
    const [theseProductsHaveOptions, setTheseProductsHaveOptions] = useState(false)
    const [optionId, setOptionId] = useState([{ id: 1}])
    const [initialOptions, setInitialOptions] = useState(null)
    const [options, setOptions] = useState([])

    useEffect(() => {
        setInitialOptions(productOptions)
    }, [productOptions])
    
    useEffect(() => {
        if (initialOptions) {
            const newOptionId = initialOptions.map((option, index) => {
                return { id: index + 1 }
            })
            setOptionId(newOptionId)
            setOptions(initialOptions)
            if (initialOptions.length > 0) {
                setTheseProductsHaveOptions(true)
            }
        } else {
            setOptionId([{ id: 1, value: "" }])
            setOptions([{ id: 1, name: "", values: [""]}])
        }
    }, [initialOptions])

    const handleHaveOptions = () => {
        setTheseProductsHaveOptions(!theseProductsHaveOptions)

        if (productOptions && productOptions.length > 0) {
            const newOptionId = initialOptions.map((option, index) => {
                return { id: index + 1 }
            })
            setOptionId(newOptionId)
        } else {
            setOptionId([{ id: 1}])
        }

        if (!theseProductsHaveOptions) {
            if (productOptions) {
                setOptions(initialOptions)
            } else {
                setOptions([{ id: 1, name: "", values: [""]}])
            }
        } else {
            setOptions([])
        }
    }

    const handleChangeOptions = useCallback((id, name, values) => {
        if (!options.find(option => option.id === id)) {
            setOptions([...options, { id, name, values }])
            return;
        }
        const newOptions = options.map(option => {
            if (option.id === id) {
                return { ...option, name, values };
            }
            return option;
        });
        setOptions(newOptions);
    }, [options])

    const handleDeleteOptions = useCallback((id) => {
        const newOptions = options.filter(option => option.id !== id)
        setOptions(newOptions)
    }, [options])

    useEffect(() => {
        onChange(options)
    }, [options])

    const handleNewOption = () => {
        setOptionId([...optionId, { id: optionId.length + 1}])
    }

    return (
        <BoxLayout title="Opciones">
            <div className={style.theseProductsHaveOptions}>
                <div>
                    <input checked={theseProductsHaveOptions} type="checkbox" name="theseProductsHaveOptions" onChange={handleHaveOptions} />
                    <label htmlFor="saleWithoutStock">Este producto tiene opciones, como talla y color</label>
                </div>
            </div>
            {theseProductsHaveOptions && (
                <>
                    <div className={style.optionsWrapper}>
                        {optionId.map((option, index) => (
                            <Option
                                key={index}
                                optionId={option.id}
                                onChange={handleChangeOptions}
                                handleDeleteOptions={handleDeleteOptions}
                                initialOptionValues={initialOptions && initialOptions.find(initialOption => initialOption.id === option.id)}
                                create={create}
                            />
                        ))}
                    </div>
                    <div className={style.buttonsWrapper}>
                        <button onClick={handleNewOption}>
                            <span>+</span>
                            <span>Agregar otra opción</span>
                        </button>
                    </div>
                </>
            )}
        </BoxLayout>
    )
}

export { Options }