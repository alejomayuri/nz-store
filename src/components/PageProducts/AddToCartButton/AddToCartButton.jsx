import style from "./AddToCartButton.module.css";
import { useEffect, useState } from "react";
// import Modal from "components/Modal";
import { useProductCartContext } from "@/context/ProductCartContext";
// import ModalCart from "components/ModalCart";

const AddToCartButton = ({
  product,
  features,
  onAdd = 1,
})  => {
  // const [showModal, setShowModal] = useState(false);

  const { products, setProducts } = useProductCartContext();
  console.log("products", products);
  const handleClick = () => {
    // setShowModal(true);
    handleAddToCart(product);
    // onAdd(product);
  };

  const handleAddToCart = (newProduct) => {
    if (products.find((item) => item.product === newProduct)) {
      setProducts((prev) => {
        return prev.map((item) => {
          if (item.product === newProduct) {
            return {
              ...item,
              quantity: item.quantity + onAdd,
            };
          }
          return item;
        });
      });
    } else {
      setProducts((prev) => [...prev, { product, quantity: onAdd }]);
    }
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(products));
  }, [products]);

  return (
    <>
      <div className={style.add__button__container}>
        <button onClick={handleClick} className={style.add__button}>
          <span className={style.add__button__text__desktop}>
            Agregar al carrito
          </span>
          <span className={style.add__button__text__mobile}>Agregar</span>
        </button>
      </div>

      {/* {showModal && (
        <Modal onClose={handleClose}>
          <ModalCart onClose={handleClose} />
        </Modal>
      )} */}
    </>
  );
}

export { AddToCartButton }
