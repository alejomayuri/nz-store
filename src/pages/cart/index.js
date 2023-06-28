import { Layout } from "@/Layouts/Layout"
import { useProductCartContext } from "@/context/ProductCartContext";
import { ProductCartBox } from "@/components/PageCart/ProductCartBox/ProductCartBox";
import { TotalPrice } from "@/components/PageCart/TotalPrice/TotalPrice";
import { useCupons } from "@/hooks/useCupons";

const Cart = () => {
    const { products, setProducts, cuponActiveInCart, setCuponActiveInCart, cart } = useProductCartContext();
    const { cupons } = useCupons();
    console.log(cuponActiveInCart)
    return (
        <Layout>
            {products.length > 0 ? (
                <div className="cartMainContainer">
                    <div>
                        {products.map((product) => (
                            <ProductCartBox key={product.id} element={product} setProducts={setProducts} />
                        ))}
                    </div>
                    <TotalPrice
                        cupons={cupons}
                        products={products}
                        cuponActiveInCart={cuponActiveInCart}
                        setCuponActiveInCart={setCuponActiveInCart}
                    />
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