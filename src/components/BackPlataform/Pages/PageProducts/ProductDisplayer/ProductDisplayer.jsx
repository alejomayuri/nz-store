import style from './ProductDisplayer.module.css';
import { useEffect, useState } from "react";
import { Product } from './Product/Product';
// import { SearchBar } from '@/components/PageProducts/SearchBar/SearchBar';
import { SearchBar } from '../SearchBar/SearchBar';

const ProductDisplayer = ({ products, editProduct }) => {
    const [productsToDisplay, setProductsToDisplay] = useState([]);
    console.log("productsToDisplay", productsToDisplay)
    const [searchTerm, setSearchTerm] = useState('');
    const [on, setOn] = useState(true);

    const handleSearch = (searchTerm) => {
        // console.log(searchTerm);
    }

    let show = productsToDisplay?.filter(
        (product) => product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    useEffect(() => {
        if (on && products?.length > 0) {
            const newProductsToDisplay = [];
        
            products.forEach((product) => {
            if (product?.variations?.length > 0) {
                product.variations.forEach((variation) => {
                newProductsToDisplay.push({ ...product, variation });
                });
            } else {
                newProductsToDisplay.push(product);
            }
            });
        
            setProductsToDisplay(newProductsToDisplay);
            setOn(false);
        }
      }, [products]);

    return (
            <div className={style.wrapper}>
                <div className={style.header__searchBar}>
                    <SearchBar onSearch={handleSearch} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
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
                {show.map((product, i) => (
                    <>
                        <Product 
                            productPrice={product?.variation ? product?.variation.price : product?.price}
                            productStock={product?.variation ? product?.variation.stock : product?.stock}
                            key={i}
                            product={product}
                            setProductsToDisplay={setProductsToDisplay}
                            // editProduct={editProduct}
                        />
                    </>
                ))}
        </div>
    );
}

export { ProductDisplayer };