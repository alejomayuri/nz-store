import { useEffect, useState } from 'react'
// import { useFunctions } from "@/hooks/useFunctions";
// import { ProductsDisplayer } from "@/components/PageProducts/ProductsDisplayer/ProductsDisplayer"
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";
import { BackLayout } from "@/Layouts/BackLayout";
import { useProducts } from "@/hooks/useProducts";
import { ProductDisplayer } from '@/components/BackPlataform/Pages/PageProducts/ProductDisplayer/ProductDisplayer';

const BackPlataform_Products = () => {
    const {products, loading} = useProducts()
    
    return (
        <BackLayout>
            <div className="content__wrapper_big">
                <h1>Productos</h1>
                <ProductDisplayer
                    products={products}
                    // editProduct={editProduct}
                />
            </div>
        </BackLayout>
    )
}

export default BackPlataform_Products