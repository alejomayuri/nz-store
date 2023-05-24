import style from "./ProductList.module.css";
import { ProductCard } from "@/components/global/ProductCard/ProductCard";

const ProductList = ({ products }) => {
    return (
        <ul className={style.productList}>
            {
                products.length > 0 && products?.map((product) => (
                    <li key={product.id}>
                        <ProductCard product={product} />
                    </li>
                ))
            }
        </ul>
    );
}

export { ProductList };