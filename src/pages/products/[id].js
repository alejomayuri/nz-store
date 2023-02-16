import { useRouter } from 'next/router'
import { Layout } from '@/Layouts/Layout'
import { useSingleProduct } from '@/hooks/useSingleProducts'
import { MainProductContent } from '@/components/PageProducts/MainProductContent/MainProductContent'

const Products = () => {
    const router = useRouter()
    const { id } = router.query

    const product = useSingleProduct({ id })

    console.log(product)
    
    return (
        <Layout>
            {product && <MainProductContent product={product[0]} />}
        </Layout>
    )
}

export default Products
