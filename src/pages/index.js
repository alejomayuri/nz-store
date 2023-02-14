import { Layout } from '@/Layouts/Layout'
import { MainSlider } from '@/components/PageHome/MainSlider/MainSlider'
import { ProductsGrid } from '@/components/PageHome/ProductsGrid/ProductsGrid'
import { ProductSpotlight } from '@/components/PageHome/ProductSpotlight/ProductSpotlight'
import { MiddleBanner } from '@/components/PageHome/MiddleBanner/MiddleBanner'

export default function Home() {
  
  return (
    <>
      <Layout>
        <MainSlider />
        <ProductsGrid type="juguetes" title="Juguetes para tu engreido" />
        <ProductsGrid type="bandanas" title="Lo nuevo en Bandanas" />
        <ProductSpotlight type="colection" title="Colección de Verano" background="#F9C38F" subtitle="Colección" />
        <ProductsGrid type="bandanas" title="Ropa" />
        <MiddleBanner />
        <ProductsGrid type="giftcard" title="Gift Cards" cards />
        <ProductSpotlight type="offer" title="Aprovecha las Ofertas" background="#E9B5AB" subtitle="Ofertas" />
      </Layout>
    </>
  )
}
