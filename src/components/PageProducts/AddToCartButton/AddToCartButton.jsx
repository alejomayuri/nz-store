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

  const { products, setProducts } = useProductCartContext();
  
  const handleClick = () => {
    handleAddToCart(product);
    router.push("/cart");
  };

  const handleAddToCart = (newProduct) => {
    if (products.find((item) => item.product === newProduct && item.features === features)) {
      setProducts((prev) => {
        return prev.map((item) => {
          if (item.product === newProduct && item.features === features) {
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
