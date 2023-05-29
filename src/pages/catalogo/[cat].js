import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Router from "next/router";
import { Layout } from "@/Layouts/Layout";
import { useProducts } from "@/hooks/useProducts";
import { Filter } from "@/components/PageCatalogo/Filter/Filter";
import { ProductList } from "@/components/PageCatalogo/ProductList/ProductList";
import { Title } from "@/components/PageCatalogo/Title/Title";
import getFilters from "@/utils/getFilters";
import getSubcategories from "@/utils/getSubcategories";

const Catalogo = () => {
    const router = useRouter();
    const { cat, s } = router.query;
    const products = useProducts({ category: cat, param: s });

    let optionsList = [];
    let subCatList = [];

    let initURL = router?.asPath.split('?cat=')[1];
    let productsToShow = [];
    let productsPerSubCat = [];

    //filtrado por subcategoria y por filtros
    
    const [subCatActive, setSubCatActive] = useState(null);
    const [filtersActive, setFiltersActive] = useState([]);

    useEffect(() => {
        if (router) {
            setSubCatActive(initURL)
        }
    }, [initURL])

    useEffect(() => {
        setSubCatActive(null)
    }, [cat])

    useEffect(() => {
        if(s) {
            setSubCatActive(null)
        }
    }, [s])

    useEffect(() => {
        if (!router.query.category) {
            setSubCatActive(null)
        }
    }, [router.query.category])

    

   useEffect(() => {
        let route = null
    
        if(subCatActive) {
            if(s) {
                route = `/catalogo/${cat}?category=${subCatActive}&s=${s}`
            } else {
                route = `/catalogo/${cat}?category=${subCatActive}`
            }
        } else {
            if(s) {
                route = `/catalogo/${cat}?s=${s}`
            } else {
                route = `/catalogo/${cat}`
            }
        }

        if (subCatActive) {
            Router.push({
                query: { category: subCatActive, s: s },
            },
            route);
        }
        setFiltersActive([]);
    }, [subCatActive]);

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
                return filtersActive.every((option) => {
                    return product.options?.some((opt) => opt.name === option.name && opt.values.includes(option.value));
                });
            });
        } else {
            productsToShow = productsPerSubCat;
        }
    }

    if (products.length > 0) {
        optionsList = getFilters(productsPerSubCat).optionList;
        subCatList = getSubcategories(products);
    }

    return (
        <Layout>
            <Title subCatActive={subCatActive} cat={cat} param={s} />
            <div className="catalogo__container">
                <Filter filtersActive={filtersActive} subcats={subCatList} filters={optionsList} handlerSetFilters={setFiltersActive} handlerSubCats={setSubCatActive} />
                <ProductList products={productsToShow} />
            </div>
        </Layout>
    );
}

export default Catalogo;