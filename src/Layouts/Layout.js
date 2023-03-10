import Head from 'next/head'
import { Header } from '@/components/global/Header/Header'
import { Footer } from '@/components/global/Footer/Footer'

const Layout = ({ children }) => {
    return (
        <>
            <Head>
                <title>NZ Store</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <main>
                {children}
            </main>
            <Footer />
        </>
    )
}

export { Layout }