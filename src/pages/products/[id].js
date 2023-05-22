import { useRouter } from 'next/router'
import { useState } from 'react'
import { Layout } from '@/Layouts/Layout'
import { useSingleProduct } from '@/hooks/useSingleProducts'
import { MainProductContent } from '@/components/PageProducts/MainProductContent/MainProductContent'
import { Description } from '@/components/PageProducts/Description/Description'
import { Info } from '@/components/PageProducts/Info/Info'

const Products = () => {
    const router = useRouter()
    const { id } = router.query
    const { product, loading } = useSingleProduct({ id })
    const [ showDescription, setShowDescription ] = useState(true)
    
    return (
        <Layout>
            {!loading && (
                <>
                    <MainProductContent product={product[0]} />
                    <div>
                        <div className="products__button-container">
                            <button onClick={
                                () => setShowDescription(true)
                            } className={
                                showDescription ? 'products__button-active' : ''
                            }>descripción</button>
                        </div>
                        <div>
                            {
                                showDescription ? <Description data={product[0]} /> : <Info data={product[0]} />
                            }
                        </div>
                    </div>
                    <style jsx>{`
                        .products__button-active {
                            transition: all .01s ease;
                            color: #000;
                            border-bottom: solid 2px #F49394;
                        }
                    `}</style>
                </>
            )}
        </Layout>
    )
}

export default Products
