import style from "./AddToCartButton.module.css";
import { useEffect, useState } from "react";
// import Modal from "components/Modal";
import { useProductCartContext } from "@/context/ProductCartContext";
// import ModalCart from "components/ModalCart";

const AddToCartButton = ({
  product,
  features,
  onAdd = 1,
  disabled
})  => {
  // const [showModal, setShowModal] = useState(false);

  const { products, setProducts } = useProductCartContext();
  console.log(products);
  const handleClick = () => {
    // setShowModal(true);
    handleAddToCart(product);
    // onAdd(product);
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
