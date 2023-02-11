
import { Layout } from '@/Layouts/Layout'
import { MainSlider } from '@/components/PageHome/MainSlider/MainSlider'
import { ProductsGrid } from '@/components/PageHome/ProductsGrid/ProductsGrid'

export default function Home() {
  
  return (
    <>
      <Layout>
        <MainSlider />
        <ProductsGrid type="bandana" title="Lo nuevo en Bandanas" />
      </Layout>
    </>
  )
}
