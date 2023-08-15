import style from "./Variations.module.css"
import { BoxLayout } from "../BoxLayout/BoxLayout";
import { useEffect, useState } from "react"

const Variations = ({ options, onChange, productVariations }) => {
    const [initialVariations, setInitialVariations] = useState(null)

    useEffect(() => {
        setInitialVariations(productVariations)
    }, [productVariations])

    function generateCombinations(arrays) {
        if (arrays.length === 0) {
            return [[]]; // Caso base: retorna un array vacío dentro de otro array
        }
        
        if (arrays.length === 1) {
            return arrays[0].map(el => [el])
        }

        const combinations = [];
        const smallerCombinations = generateCombinations(arrays.slice(1));

        for (let i = 0; i < arrays[0].length; i++) {
            for (let j = 0; j < smallerCombinations.length; j++) {
                combinations.push([arrays[0][i], ...smallerCombinations[j]]);
            }
        }
        return combinations;
    }

    const arrays = options?.map(option => option.values)
    const parseArrays = arrays.map(array => array.filter(el => el !== ""))
    const combinations = generateCombinations(parseArrays);
    const variations = combinations.map(combination => {
        const iv = initialVariations ? initialVariations.find(variation => {
            const variationName = variation.name.split(" / ")
            return variationName.every((value, index) => {
                return value === combination[index]
            })
        }) : null

        const variation = {
            name: combination.join(" / "),
            price: iv ? iv.price : '0',
            stock: iv ? iv.stock : '0',
            options: combination.map((value, index) => {
                return {
                    name: options[index].name,
                    value: value
                }
            })
        }
        return variation
    })

    const [variationsState, setVariationsState] = useState(productVariations)

    useEffect(() => {
        setVariationsState(variations)
    }, [options])

    const handleChange = (e, index) => {
        const { name, value } = e.target;
        setVariationsState(
            variationsState.map((variation, i) => {
                if (i === index) {
                    return {
                        ...variation,
                        [name]: value
                    }
                }
                return variation
            })
        )
    }

    useEffect(() => {
        onChange(variationsState)
    }, [variationsState])

    return (
        <BoxLayout title="Variaciones">
            <div className={style.topLeyend}>
                <p>Variación</p>
                <p>Precio</p>
                <p>Stock</p>
            </div>
            {combinations.map((combination, index) => {
                return (
                    <div className={style.variationWrapper} key={index}>
                        <div className={style.variation}>
                            {combination.map((value, index) => {
                                return (
                                    <div className={style.element} key={index}>
                                        <p>{value}</p>
                                        {
                                            index !== combination.length - 1 && (
                                                <span>/</span>
                                            )
                                        }
                                    </div>
                                )
                            })}
                        </div>

                        <div className={style.variationInfo}>
                            <div className={style.infoElement}>
                                <input 
                                onChange={
                                    (e) => handleChange(e, index)
                                }
                                    type="number" 
                                    name="price"
                                    value={variationsState[index]?.price}
                                />
                            </div>
                            <div className={style.infoElement}>
                                <input
                                 onChange={
                                    (e) => handleChange(e, index)
                                }
                                    type="number"
                                    name="stock"
                                    value={variationsState[index]?.stock}
                                />
                            </div>
                        </div>
                    </div>
                )
            })}
        </BoxLayout>
    )
}

export { Variations }