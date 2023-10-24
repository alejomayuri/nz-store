import style from './Product.module.css';
import { useEffect, useState, useRef } from 'react';
import EditIcon from '@/components/global/Icons/editIcon';
import Link from 'next/link';
import {editProduct} from '@/firebase/client';
import { deleteProduct } from '@/firebase/client';
import { useRouter } from 'next/router';
import { Modal } from '@/components/global/Modal/Modal';
import Trash from '@/components/global/Icons/trash';
import { formatPrice } from '@/utils/formatPrice';

const Product = ({ product, productPrice, productStock, variationName, setProductToDisplay }) => {
    const [stock, setStock] = useState(productStock);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isMouseOnTheDiv, setIsMouseOnTheDiv] = useState(false);
    const stockRef = useRef(null);
    const router = useRouter();
    const [showMessage, setShowMessage] = useState(false);

    const handleShowMessage = () => {
        setShowMessage(true);
        setTimeout(() => {
            setShowMessage(false);
        }, 3000);
    };

    const [productToUpdate, setProductToUpdate] = useState(product);

    useEffect(() => {
        if(product?.variations) {
            setProductToUpdate(product)
        }
    }, [product])
    
    const handleStock = (e) => {
        const newStockValue = e.target.value;
    
        if (productToUpdate?.variations && productToUpdate.variations.length > 0) {
            setProductToDisplay({
                ...product,
                variations: product.variations.map(variation => {
                    if (variation.name === variationName) {
                        // Actualiza solo la variación deseada
                        return { ...variation, stock: newStockValue };
                    } else {
                        // No toca las otras variaciones
                        return variation;
                    }
                })
            })
        } else {
            setProductToUpdate({
                ...productToUpdate,
                stock: newStockValue,
            });
        }
        // Actualiza el estado de stock
        setStock(newStockValue);
    };

    const [showEditButton, setShowEditButton] = useState(stock !== productStock);

    useEffect(() => {
        setShowEditButton(stock !== productStock);
    }, [stock, productStock]);

    const haldleEditProduct = () => {
        if (editProduct) {
            editProduct(product?.id, productToUpdate)
                .then(() => {
                    handleShowMessage()
                    setShowEditButton(false);
                })
        }
    }

    const handleOpenModal = () => {
        setIsModalOpen(true);
    }

    const handleDeleteProduct = () => {
        if (deleteProduct) {
            deleteProduct(product?.id)
                .then(() => {
                    handleShowMessage()
                    router.reload()
                })
        }
    }

    const handleMouseEnter = () => {
        setIsMouseOnTheDiv(true);
    };
    
    const handleMouseLeave = () => {
        setIsMouseOnTheDiv(false);
    };

    return (
        <>
            {showMessage && (
                <div className={style.message}>
                    {product?.variation ? (
                        <p>✏️ El producto <b>{product?.name}</b> - <b>{variationName}</b> se ha actualizado correctamente</p>
                    ) : (
                        <p>✏️ El producto <b>{product?.name}</b> se ha actualizado correctamente</p>
                    )}
                </div>
            )}
            <div 
                className={style.product}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <div className={style.product__image}>
                    {product?.images && <img src={product?.images[0]} alt={product?.name} />}
                </div>
                <div className={style.product__name}>
                    <Link href={`/back-plataform/edit-product/${product?.id}`}>
                        <h3>{product?.name}</h3>
                    </Link>
                    {product?.variations && (
                        <p>{variationName}</p>
                    )}
                </div>
                <div className={style.product__sku}>
                    {product?.variations ? (
                        <p>{`${product?.id} - ${variationName}`}</p>
                    ) : (
                        <p>{product?.id}</p>
                    )}
                </div>
                <div className={style.product__price}>
                    <p>
                        <span>
                            {formatPrice(productPrice)}
                        </span>
                    </p>
                </div>
                <div className={style.product__stock}>
                    <input ref={stockRef} type="number" name='stock' value={stock} onChange={handleStock}/>
                </div>
                {showEditButton && (
                    <div className={style.edit__product}>
                        <button onClick={haldleEditProduct}>
                            <EditIcon width="25px" height="25px" />
                        </button>
                    </div>
                )}
                {isMouseOnTheDiv && (
                    <button className={style.deleteProductButton} onClick={handleOpenModal}>
                        <Trash width={25} />
                    </button>
                )}
            </div>
            <Modal isOpen={isModalOpen} >
                <h2 className={style.modalTitle}>Eliminar producto</h2>
                <p>
                    ¿Estás seguro que deseas eliminar el producto <b>{product?.name}</b>?
                    Si el producto tiene variaciones, se eliminarán <b>todas</b> las variaciones.
                </p>
                <div className={style.modalButtons}>
                    <button className={style.closeModal} onClick={() => setIsModalOpen(false)}>Cancelar</button>
                    <button className={style.deleteProduct} onClick={handleDeleteProduct}>
                        Eliminar
                    </button>
                </div>
            </Modal>
        </>
    );
}

export { Product }