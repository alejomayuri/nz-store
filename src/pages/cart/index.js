import { Layout } from "@/Layouts/Layout"
import { useProductCartContext } from "@/context/ProductCartContext";
import { ProductCartBox } from "@/components/PageCart/ProductCartBox/ProductCartBox";
import { TotalPrice } from "@/components/PageCart/TotalPrice/TotalPrice";
import { useCupons } from "@/hooks/useCupons";

const Cart = () => {
    const { products, setProducts } = useProductCartContext();
    const { cupons } = useCupons();

    console.log(cupons)

    return (
        <Layout>
            {products.length > 0 ? (
                <div className="cartMainContainer">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {products.map((product) => (
                            <ProductCartBox key={product.id} element={product} setProducts={setProducts} />
                        ))}
                    </div>
                    <TotalPrice cupons={cupons} products={products} />
                </div>
            )
                : (
                    <div className="container mx-auto">
                        <div className="flex flex-col items-center justify-center h-screen">
                            <h1 className="text-2xl font-bold">No hay productos en el carrito</h1>
                        </div>
                    </div>
                )
            }
        </Layout>
    )
}

export default Cart