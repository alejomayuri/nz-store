import { createContext, useEffect, useState, useContext } from "react";

const ProductCartContext = createContext();

export const useProductCartContext = () => useContext(ProductCartContext);

export const ProductCartProvider = (props) => {
    const [products, setProducts] = useState([]);
    const [cuponActiveInCart, setCuponActiveInCart] = useState([])
    const [clientLoaded, setClientLoaded] = useState(false);

    const cart = {
        products: products,
        cuponActiveInCart: cuponActiveInCart,
    }

    useEffect(() => {
        setClientLoaded(true);
      }, []);

    useEffect(() => {
        if(clientLoaded){
            const cartValue = window.localStorage.getItem("productCart");
            const cuponValue = window.localStorage.getItem("cuponActiveInCart");
            const newCart = !!cartValue ? JSON.parse(cartValue) : [];
            const newCupon = !!cuponValue ? JSON.parse(cuponValue) : [];
            setProducts(newCart);
            setCuponActiveInCart(newCupon);
        }
    }, [clientLoaded]);

    const value = { products, setProducts, cuponActiveInCart, setCuponActiveInCart, cart };

    useEffect(() => {
        if(products.length > 0) {
            window.localStorage.setItem("productCart", JSON.stringify(products));
        }

        if(products?.length === 0 && clientLoaded) {
            window.localStorage.removeItem("productCart");
        }

        if(cuponActiveInCart?.length > 0) {
            window.localStorage.setItem("cuponActiveInCart", JSON.stringify(cuponActiveInCart));
        }

        if(cuponActiveInCart?.length === 0 && clientLoaded) {
            window.localStorage.removeItem("cuponActiveInCart");
        }
    }, [products, clientLoaded, cuponActiveInCart]);

    return (
        <ProductCartContext.Provider value={value}>
            {props.children}
        </ProductCartContext.Provider>
    );
};
