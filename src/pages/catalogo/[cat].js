import { useRouter } from "next/router";
import getFilters from "@/utils/getFilters";
import getSubcategories from "@/utils/getSubcategories";
import { Layout } from "@/Layouts/Layout";
import { useProducts } from "@/hooks/useProducts";
import { Filter } from "@/components/PageCatalogo/Filter/Filter";

const Catalogo = () => {
    const router = useRouter();
    const { cat } = router.query;
    const products = useProducts({ category: cat });

    let filters = [];
    let subCat = [];

    if ( products.length > 0 ) {
        filters = getFilters(products);
        subCat = getSubcategories(products);
    }

    return (
        <Layout>
            <h1>{cat}</h1>
            <Filter subcats={subCat} filters={filters} />
        </Layout>
    );
}

export default Catalogo;