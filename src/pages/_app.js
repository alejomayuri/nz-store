import '@/styles/globals.css'
import { ProductCartProvider } from '@/context/ProductCartContext'
import { AuthProvider } from '@/context/AuthContext'

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <ProductCartProvider>
        <Component {...pageProps} />
      </ProductCartProvider>
    </AuthProvider>
  )
}
