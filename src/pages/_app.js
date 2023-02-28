import '@/styles/globals.css'
import { ProductCartProvider } from '@/context/ProductCartContext'

export default function App({ Component, pageProps }) {
  return (
    <ProductCartProvider>
      <Component {...pageProps} />
    </ProductCartProvider>
  )
}
