import style from "./ProductList.module.css";
import { ProductCard } from "@/components/global/ProductCard/ProductCard";

const ProductList = ({ products }) => {
    return (
        <div className={style.productList}>
            {
                products.length > 0 && products?.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))
            }
        </div>
    );
}

export { ProductList };