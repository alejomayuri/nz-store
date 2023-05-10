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
        <ProductsGrid type="ropa" title="Lo nuevo" />
        <ProductsGrid type="ropa" title="Lo nuevo en Bandanas" />
        <CategoryBanner 
          img_one="https://i.ibb.co/7NTF9Rh/IMG-1700.jpg"
          img_two="https://i.ibb.co/Gd9JM6V/Screenshot-2023-02-25-at-14-38-08-Pet-Fashion.png"
        />
        <ProductSpotlight type="ropa" title="Colección de Verano" background="#F9C38F" subtitle="Colección" />
        <CategoryBanner 
          img_one="https://i.ibb.co/7NTF9Rh/IMG-1700.jpg"
          img_two="https://i.ibb.co/Gd9JM6V/Screenshot-2023-02-25-at-14-38-08-Pet-Fashion.png"
        />
        <ProductsGrid type="ropa" title="ropa" />
        <MiddleBanner />
        <ProductsGrid type="Ropa" title="Gift Cards" cards />
        <ProductSpotlight type="offer" title="Aprovecha las Ofertas" background="#E9B5AB" subtitle="Ofertas" />
      </Layout>
    </>
  )
}
