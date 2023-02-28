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
            const value = window.localStorage.getItem("cart");
            const newCart = !!value ? JSON.parse(value) : [];
            setProducts(newCart);
        }
    }, [clientLoaded]);


    const value = { products, setProducts };

    useEffect(() => {
        console.log(localStorage)
        if(clientLoaded){
            window.localStorage.setItem("xd", JSON.stringify(products));
        }
    }, [products, clientLoaded]);

    return (
        <ProductCartContext.Provider value={value}>
        {props.children}
        </ProductCartContext.Provider>
    );
};
