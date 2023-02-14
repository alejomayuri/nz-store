import Router from "next/router";
import getFilters from "@/utils/getFilters";
import getSubcategories from "@/utils/getSubcategories";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Layout } from "@/Layouts/Layout";
import { useProducts } from "@/hooks/useProducts";
import { Filter } from "@/components/PageCatalogo/Filter/Filter";
import { ProductList } from "@/components/PageCatalogo/ProductList/ProductList";

const Catalogo = () => {
    const router = useRouter();
    const { cat } = router.query;
    const products = useProducts({ category: cat });

    const [filtersActive, setFiltersActive] = useState([]);

    let x = router?.asPath.split('?cat=')[1];
    const [subCatActive, setSubCatActive] = useState(
        x ? x : null
    );

    let filtersList = [];
    let subCatList = [];

    let productsToShow = [];
    let productsPerSubCat = [];

    if (products) {
        if (subCatActive) {
            productsPerSubCat = products.filter((product) => product.subcategory.includes(subCatActive));
        } else {
            productsPerSubCat = products;
        }
        
        if (filtersActive.length > 0) {
            productsToShow = productsPerSubCat.filter((product) => {
                let filterMatch = 0;
                filtersActive.forEach((filter) => {
                    if (product.filters) {
                        if (product.filters[filter.name] === filter.value) {
                            filterMatch++;
                        }
                    }
                });
                return filterMatch === filtersActive.length;
            });
        } else {
            productsToShow = productsPerSubCat;
        }
    }
    
    useEffect(() => {
        if (router) {
            setSubCatActive(x)
        }
    }, [router, x])

    if (products.length > 0) {
        filtersList = getFilters(productsPerSubCat);
        subCatList = getSubcategories(products);
    }

    useEffect(() => {
        if (subCatActive) {
            Router.push({
                pathname: '/catalogo/[cat]',
                query: { cat: subCatActive },
            }, `/catalogo/${cat}?cat=${subCatActive}`);
        }
        setFiltersActive([])
    }, [subCatActive, cat,x]);

    return (
        <Layout>
            <h1>{subCatActive ? subCatActive : cat}</h1>
            <div>
                <Filter filtersActive={filtersActive} subcats={subCatList} filters={filtersList} handlerSetFilters={setFiltersActive} handlerSubCats={setSubCatActive} />
                <ProductList products={productsToShow} />
            </div>
        </Layout>
    );
}

export default Catalogo;