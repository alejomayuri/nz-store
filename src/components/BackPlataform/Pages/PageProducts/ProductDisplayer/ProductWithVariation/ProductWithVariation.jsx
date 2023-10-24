import { Product } from "../Product/Product"
import { useState, useEffect } from "react";

const ProductWithVariation = ({ product }) => {
    const [productToDisplay, setProductToDisplay] = useState([]);
    useEffect(() => {
        if (product) {      
            setProductToDisplay(product);
        }
      }, [product]);

    return (
        <div>
            {
                productToDisplay && product?.variations?.map((variation, i) => (
                    <Product 
                        key={i} 
                        product={productToDisplay} 
                        productPrice={variation.price} 
                        productStock={variation.stock} 
                        variationName={variation.name}
                        setProductToDisplay={setProductToDisplay}
                        productToDisplay={productToDisplay}
                    />
                ))
            }
        </div>
    )
}

export { ProductWithVariation }