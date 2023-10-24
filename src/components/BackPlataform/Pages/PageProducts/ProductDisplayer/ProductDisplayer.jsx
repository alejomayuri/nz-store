import style from './ProductDisplayer.module.css';
import { useEffect, useState } from "react";
import { Product } from './Product/Product';
// import { SearchBar } from '@/components/PageProducts/SearchBar/SearchBar';
import { SearchBar } from '../SearchBar/SearchBar';
import { ProductWithVariation } from './ProductWithVariation/ProductWithVariation';

const ProductDisplayer = ({ products }) => {
    const [productsToDisplay, setProductsToDisplay] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [on, setOn] = useState(true);

    let show = productsToDisplay?.filter(
        (product) => product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    useEffect(() => {
        if (on && products?.length > 0) {
            const newProductsToDisplay = [];
        
            products.forEach((product) => {
                newProductsToDisplay.push(product);
            });
        
            setProductsToDisplay(newProductsToDisplay);
            setOn(false);
        }
      }, [products]);

    return (
            <div className={style.wrapper}>
                <div className={style.header__searchBar}>
                    <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                    <a href="./create-products">
                        <button>Crear producto</button>
                    </a>
                </div>
                <div className={style.product}>
                    <div className={style.product__image}></div>
                    <div className={style.product__name}>
                        <p>Nombre</p>
                    </div>
                    <div className={style.product__sku}>
                        <p>SKU</p>
                    </div>
                    <div className={style.product__price}>
                        <p>Precio</p>
                    </div>
                    <div className={style.product__stock}>
                        <p>Stock</p>
                    </div>
                </div>
                {
                    show.map((product, i) => (
                        product?.variations ? (
                            <ProductWithVariation product={product} key={i} />
                        ) : (
                            <Product
                                productPrice={product?.price}
                                productStock={product?.stock}
                                key={i}
                                product={product}
                                setProductsToDisplay={setProductsToDisplay}
                            />
                        )
                    ))
                }
        </div>
    );
}

export { ProductDisplayer };