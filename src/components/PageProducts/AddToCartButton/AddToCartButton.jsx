import style from "./AddToCartButton.module.css";
import { useEffect, useState } from "react";
import { useProductCartContext } from "@/context/ProductCartContext";
import { useRouter } from "next/router";

const AddToCartButton = ({
  product,
  features,
  onAdd = 1,
  disabled
})  => {
  const router = useRouter();

  const { products, setProducts, setLastProductAdded } = useProductCartContext();
  // console.log("product", product)
  // console.log("products", products)
  const handleClick = () => {
    handleAddToCart(product, features);
    // router.push("/cart");
  };

  const handleAddToCart = (newProduct, features) => {
    function sonObjetosIguales(objeto1, objeto2) {
      const keys1 = Object.keys(objeto1);
      const keys2 = Object.keys(objeto2);
    
      if (keys1.length !== keys2.length) {
        return false;
      }
    
      for (let key of keys1) {
        if (objeto1[key] !== objeto2[key]) {
          return false;
        }
      }
    
      return true;
    }

    if (products) {
      if (products.find((item) => item.product === newProduct && sonObjetosIguales(item?.features, features))) {
        // console.log(
        //   products.find((item) => item.product === newProduct && sonObjetosIguales(item?.features, features))
        // )
        setProducts((prev) => {
          return prev.map((item) => {
            if (item.product === newProduct && sonObjetosIguales(item?.features, features)) {
              return {
                ...item,
                quantity: item.quantity + onAdd,
              };
            }
            return item;
          });
        });
      } else {
        setProducts((prev) => [...prev, { product, quantity: onAdd, features: features }]);
      }
    }

    setLastProductAdded({ product, quantity: onAdd, features: features });
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(products));
  }, [products]);

  return (
    <>
      <button disabled={disabled} onClick={handleClick} className={style.add__button}>
        <span className={style.add__button__text__desktop}>
          Agregar al carrito
        </span>
        <span className={style.add__button__text__mobile}>Agregar</span>
      </button>


      {/* {showModal && (
        <Modal onClose={handleClose}>
          <ModalCart onClose={handleClose} />
        </Modal>
      )} */}
    </>
  );
}

export { AddToCartButton }
