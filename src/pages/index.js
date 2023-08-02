import { Layout } from '@/Layouts/Layout'
import { MainSlider } from '@/components/PageHome/MainSlider/MainSlider'
import { ProductsGrid } from '@/components/PageHome/ProductsGrid/ProductsGrid'
import { ProductSpotlight } from '@/components/PageHome/ProductSpotlight/ProductSpotlight'
import { MiddleBanner } from '@/components/PageHome/MiddleBanner/MiddleBanner'
import { CategoryBanner } from '@/components/PageHome/CategoryBanner/CategoryBanner'


export default function Home() {
  
  

  return (
    <>
      <Layout>
        <MainSlider />
        <ProductsGrid type="juguetes" title="Lo nuevo en juguetes" />
        <ProductsGrid type="bandanas" title="Lo nuevo en Bandanas" />
        <CategoryBanner
          hierarchy="first"
        />
        <ProductSpotlight type="ropa" title="Colección de Verano" background="#F9C38F" subtitle="Colección" />
        <CategoryBanner 
          hierarchy="second"
        />
        <ProductsGrid type="ropa" title="ropa" />
        <MiddleBanner />
        <ProductsGrid type="gift-cards" title="Gift Cards" />
        <ProductSpotlight type="ropa" title="Aprovecha las Ofertas" background="#E9B5AB" subtitle="Ofertas" />
      </Layout>
    </>
  )
}
