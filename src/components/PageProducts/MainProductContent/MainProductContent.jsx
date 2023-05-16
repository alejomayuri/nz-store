import style from './MainProductContent.module.css';
import { useState, useEffect } from 'react';
import Minus from '@/components/global/Icons/minus';
import Plus from '@/components/global/Icons/plus';
import { formatPrice } from '@/utils/formatPrice';
import { MainImage } from '../MainImage/MainImage';
import { AddToCartButton } from '../AddToCartButton/AddToCartButton';

const MainProductContent = ({ product }) => {
    const [cuantity, setCuantity] = useState(1);
    const stock = 10;
    const [features, setFeatures] = useState({});
    let price = null
    // formatPrice(product?.price);
    let options = product?.options || null
    let showOptions = null

    // console.log(product?.variations)
    const deleteTextFormat = (text) => {
        return text?.replace(/[^a-zA-Z ]/g, "").replace(/\s/g, '').toLowerCase()
    }

    useEffect(() => {
        if(product?.variations?.length > 0) {
            const initialFeatures = product?.variations[0]?.options?.reduce((acc, option) => {
                return {
                    ...acc,
                    [deleteTextFormat(option.name)]: deleteTextFormat(option.value)
                }
            }
            , {})
            setFeatures(initialFeatures)
        }

    }, [product])
    
    if(product) {
        if(product?.variations?.length > 0) {
            const variation = product.variations.filter(variation => {
                    const values = variation.options.map(option => deleteTextFormat(option.value))
                    const result = values.every(value => {
                        return Object.values(features).includes(value)
                    })

                    return result
                }
            )

            if(variation.length > 0) {
                price = formatPrice(variation[0].price)
            }
        } else {
            price = formatPrice(product.price)
        }
    }

    const handleFeature = (e) => {
        const { innerText } = e.target
        const { parentElement } = e.target.parentElement
        const { previousElementSibling } = parentElement
        const { innerText: key } = previousElementSibling
        // console.log(key, innerText)
        setFeatures((prev) => {
            return {
                ...prev,
                [deleteTextFormat(key)]: deleteTextFormat(innerText)
            }
        })
    }
    
    if (product?.options) {
        showOptions = (
            <div>
                <ul className={style.filtersList}>
                    {
                        options?.map((option, index) => {
                            return (
                                <li className={style.filterContainer} key={index}>
                                    <h3 className={style.filterTitle}>{option.name}</h3>
                                    <ul className={style.filterOptionContainer}>
                                        {
                                            option.values.filter(value => value !== '').map((value, i) => {
                                                return (
                                                    <li key={i}>
                                                        <button onClick={handleFeature} style={{
                                                            backgroundColor: features[deleteTextFormat(option.name)] === deleteTextFormat(value) ? '#BFD8D0' : 'transparent',
                                                            color: features[deleteTextFormat(option.name)] === deleteTextFormat(value) ? '#fff' : '#000',
                                                            fontWeight: features[deleteTextFormat(option.name)] === deleteTextFormat(value) ? 'bold' : 'normal',
                                                            borderColor: features[deleteTextFormat(option.name)] === deleteTextFormat(value) ? '#BFD8D0' : '#F9C38F',
                                                        }}>
                                                            {value}
                                                        </button>
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul>
                                </li>
                            )
                        }
                    )}
                </ul>
            </div>
        )
    }

    return (
        <div className={style.productWrapper}>
           <div className={style.imageSite}>
                <MainImage mainImage={product?.image} title={product?.name} />
           </div>
           <div className={style.infoSite}>
                <h1>{product?.name}</h1>
                {showOptions}
                <span className={style.price}>
                    <bdi>
                        {price}
                    </bdi>
                </span>
                <div className={style.buttonsWrapper}>
                    <div className={style.selectQuantity}>
                        <button
                            disabled={cuantity === 1}
                            onClick={() => setCuantity(cuantity - 1)}>
                            <Minus width={25} fill={'#000'} />
                        </button>
                        <span>{cuantity}</span>
                        <button
                            disabled={stock > 0 ? cuantity === stock : true}
                            onClick={() => setCuantity(cuantity + 1)}>
                            <Plus width={25} fill={'#000'} />
                        </button>
                    </div>
                    <div className={style.buttonContainer}>
                        <AddToCartButton
                            onAdd={cuantity} 
                            product={product?.id} 
                            features={features}
                            // disabled={Object.keys(filters).length === Object.keys(features).length ? false : true}
                        />
                    </div>
                </div>
           </div>
        </div>
    );
}

export { MainProductContent };