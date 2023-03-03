import style from './MainProductContent.module.css';
import { useState } from 'react';
import Minus from '@/components/global/Icons/minus';
import Plus from '@/components/global/Icons/plus';
import { formatPrice } from '@/utils/formatPrice';
import { MainImage } from '../MainImage/MainImage';
import { AddToCartButton } from '../AddToCartButton/AddToCartButton';

const MainProductContent = ({ product }) => {
    const [cuantity, setCuantity] = useState(1);
    const stock = 10;
    const [features, setFeatures] = useState({});
    let price = formatPrice(product?.price);
    const filters = {}
    let showFilters = null

    const deleteTextFormat = (text) => {
        return text?.replace(/[^a-zA-Z ]/g, "").replace(/\s/g, '').toLowerCase()
    }

    const handleFeature = (e) => {
        const { innerText } = e.target
        const { parentElement } = e.target.parentElement
        const { previousElementSibling } = parentElement
        const { innerText: key } = previousElementSibling
        setFeatures((prev) => {
            return {
                ...prev,
                [deleteTextFormat(key)]: deleteTextFormat(innerText)
            }
        })
    }
    
    if (product?.filters) {
        Object.keys(product?.filters).forEach((key) => {
            if(product?.filters[key].split(', ') && product?.filters[key].split(', ').length > 1) {
                filters[key] = product?.filters[key].split(', ')
            }
        })
        showFilters = (
            <div>
                <ul className={style.filtersList}>
                    {
                        Object.keys(filters).map((key) => {
                            return (
                                <li className={style.filterContainer} key={key}>
                                    <h3 className={style.filterTitle}>{key}</h3>
                                    <ul className={style.filterOptionContainer}>
                                        {
                                            filters[key].map((value) => {
                                                return (
                                                    <li key={value}>
                                                        <button onClick={handleFeature} style={{
                                                            backgroundColor: features[key] === deleteTextFormat(value) ? '#BFD8D0' : 'transparent',
                                                            color: features[key] === deleteTextFormat(value) ? '#fff' : '#000',
                                                            fontWeight: features[key] === deleteTextFormat(value) ? 'bold' : 'normal',
                                                            borderColor: features[key] === deleteTextFormat(value) ? '#BFD8D0' : '#F9C38F',
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
                {showFilters}
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
                            disabled={Object.keys(filters).length === Object.keys(features).length ? false : true}
                        />
                    </div>
                </div>
           </div>
        </div>
    );
}

export { MainProductContent };