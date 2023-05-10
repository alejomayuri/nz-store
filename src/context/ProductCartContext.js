import { createContext, useEffect, useState, useContext } from "react";

const ProductCartContext = createContext();

export const useProductCartContext = () => useContext(ProductCartContext);

export const ProductCartProvider = (props) => {
    const [products, setProducts] = useState([]);
    const [clientLoaded, setClientLoaded] = useState(false);

    useEffect(() => {
        setClientLoaded(true);
      }, []);

    useEffect(() => {
        if(clientLoaded){
            const value = window.localStorage.getItem("productCart");
            const newCart = !!value ? JSON.parse(value) : [];
            setProducts(newCart);
        }
    }, [clientLoaded]);

    const value = { products, setProducts };

    useEffect(() => {
        if(products.length > 0) {
            window.localStorage.setItem("productCart", JSON.stringify(products));
        }

        if(products?.length === 0 && clientLoaded) {
            window.localStorage.removeItem("productCart");
        }
    }, [products, clientLoaded]);

    // console.log(products);

    return (
        <ProductCartContext.Provider value={value}>
            {props.children}
        </ProductCartContext.Provider>
    );
};
