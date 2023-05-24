import Router from "next/router";
import getFilters from "@/utils/getFilters";
import getSubcategories from "@/utils/getSubcategories";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Layout } from "@/Layouts/Layout";
import { useProducts } from "@/hooks/useProducts";
import { Filter } from "@/components/PageCatalogo/Filter/Filter";
import { ProductList } from "@/components/PageCatalogo/ProductList/ProductList";
import { Title } from "@/components/PageCatalogo/Title/Title";

const Catalogo = () => {
    const router = useRouter();
    const { cat } = router.query;
    const products = useProducts({ category: cat });

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
        if (subCatActive) {
            Router.push({
                // pathname: '/catalogo/[cat]',
                query: { cat: subCatActive },
            }, `/catalogo/${cat}?cat=${subCatActive}`);
        }
        setFiltersActive([])
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
                let filterMatch = 0;
                filtersActive.forEach((option) => {
                    if (product.options) {
                        // console.log("--------->", product.options)
                        // console.log("--------->", option.value)
                        product.options.map((opt) => {
                            if (opt.name === option.name && opt.values.includes(option.value)) {
                                filterMatch++;
                            }
                        })
                    }
                });
                return filterMatch === filtersActive.length;
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
            <Title subCatActive={subCatActive} cat={cat} />
            <div className="catalogo__container">
                <Filter filtersActive={filtersActive} subcats={subCatList} filters={optionsList} handlerSetFilters={setFiltersActive} handlerSubCats={setSubCatActive} />
                <ProductList products={productsToShow} />
            </div>
        </Layout>
    );
}

export default Catalogo;