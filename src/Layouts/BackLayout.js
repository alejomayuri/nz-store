import Head from 'next/head'
import { Header } from '@/components/BackPlataform/Header/Header'
import { MainMenu } from '@/components/BackPlataform/MainMenu/MainMenu'
import { useAdmin } from "@/hooks/useAdmin";

const BackLayout = ({ children }) => {
    const { isAdmin, isLoading } = useAdmin()

    if (isLoading) {
        return <div>Cargando...</div>;
    }
    if (isAdmin) {
        return (
            <>
                <Head>
                    <title>Back plataform</title>
                    <meta name="description" content="Generated by create next app" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <Header />
                <div>
                    <MainMenu />
                    <main className="back-main">
                        {children}
                    </main>
                </div>
            </>
        )
    }
}

export { BackLayout }