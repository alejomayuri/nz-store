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

    let filtersList = [];
    let subCatList = [];

    let initURL = router?.asPath.split('?cat=')[1];
    let productsToShow = [];
    let productsPerSubCat = [];

    //filtrado por subcategoria y por filtros
    
    const [subCatActive, setSubCatActive] = useState(initURL ? initURL : null);

    const [filtersActive, setFiltersActive] = useState([]);

    useEffect(() => {
        if (router) {
            setSubCatActive(initURL)
        }
    }, [router, initURL])

    useEffect(() => {
        if (subCatActive) {
            Router.push({
                pathname: '/catalogo/[cat]',
                query: { cat: subCatActive },
            }, `/catalogo/${cat}?cat=${subCatActive}`);
        }
        setFiltersActive([])
    }, [subCatActive, cat,initURL]);

    if (products) {
        if (subCatActive) {
            productsPerSubCat = products.filter((product) => {
                if (product.subcategory) {
                    return product.subcategory.includes(subCatActive)
                }
            });
        } else {
            productsPerSubCat = products;
        }
        
        if (filtersActive.length > 0) {
            productsToShow = productsPerSubCat.filter((product) => {
                let filterMatch = 0;
                filtersActive.forEach((filter) => {
                    if (product.filters) {
                        if (product.filters[filter.name]?.split(", ").includes(filter.value)) {
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

    //obtener subcategorias y filtros

    if (products.length > 0) {
        filtersList = getFilters(productsPerSubCat);
        subCatList = getSubcategories(products);
    }

    return (
        <Layout>
            <h1 className="catalogo__title">{subCatActive ? subCatActive : cat}</h1>
            <div className="catalogo__container">
                <Filter filtersActive={filtersActive} subcats={subCatList} filters={filtersList} handlerSetFilters={setFiltersActive} handlerSubCats={setSubCatActive} />
                <ProductList products={productsToShow} />
            </div>
        </Layout>
    );
}

export default Catalogo;