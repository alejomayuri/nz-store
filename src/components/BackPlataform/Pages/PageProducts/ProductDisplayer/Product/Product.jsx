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

const Product = ({ product, productPrice, productStock, setProductsToDisplay }) => {
    const [price, setPrice] = useState(productPrice);
    const [stock, setStock] = useState(productStock);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isMouseOnTheDiv, setIsMouseOnTheDiv] = useState(false);

    const priceRef = useRef(null);
    const stockRef = useRef(null);

    const router = useRouter();

    const productWithouVariation = (product) => {
        const productToUpdate = {...product}
        if(productToUpdate?.variation) {
            delete productToUpdate['variation']
            return productToUpdate
        } else {
            return productToUpdate
        }
    }

    // useEffect(() => {
    //     priceRef.current.value = productPrice
    // }, [productPrice])

    const [showMessage, setShowMessage] = useState(false);

    const handleShowMessage = () => {
        setShowMessage(true);
        setTimeout(() => {
            setShowMessage(false);
        }, 3000);
    };

    const [productToUpdate, setProductToUpdate] = useState(
        productWithouVariation(product)
    );

    useEffect(() => {
        setProductToUpdate(productWithouVariation(productToUpdate))
        setPrice(productPrice)
        setStock(productStock)
    }, [product, productPrice, productStock])
    
    const handlePrice = (e) => {
        setPrice(e.target.value);

        if(productToUpdate?.variations && productToUpdate?.variations?.length > 0) {
            const variation = productToUpdate?.variations.find(variation => 
                variation.name === product?.variation.name
            )
            
            setProductToUpdate({...productToUpdate, 
                variations: [
                    ...productToUpdate?.variations.filter(variation =>
                        variation.name !== product?.variation.name
                    ),
                    {...variation, price: e.target.value}
                ]
            })
        } else {
            setProductToUpdate({...productToUpdate, price: e.target.value})
        }

        // setProductsToDisplay((prevState) => {
        //     return prevState.map((product) => {
        //         const thisVariation = product?.variations?.find(variation => variation.name === product?.variation?.name)
        //         console.log(thisVariation)
        //         if (product?.id === productToUpdate?.id && thisVariation.name === product?.variation?.name) {
                    
        //             return {
        //                 ...productToUpdate,
        //                 variation: productToUpdate?.variations?.find(variation => variation.name === product?.variation?.name)
        //             }
        //         } else {
        //             return product;
        //         }
        //     });
        // });
    }
    // if (product?.variation) {
    //     console.log("product", productToUpdate)
    // }
    const handleStock = (e) => {
        setStock(e.target.value);

        if(productToUpdate?.variations && productToUpdate?.variations?.length > 0) {
            const variation = productToUpdate?.variations.find(variation =>
                variation.name === product?.variation.name
            )

            setProductToUpdate({...productToUpdate,
                variations: [
                    ...productToUpdate?.variations.filter(variation =>
                        variation.name !== product?.variation.name
                    ),
                    {...variation, stock: e.target.value}
                ]
            })
        } else {
            setProductToUpdate({...productToUpdate, stock: e.target.value})
        }
    }

    const [showEditButton, setShowEditButton] = useState(price !== productPrice || stock !== productStock);

    useEffect(() => {
        setShowEditButton(price !== productPrice || stock !== productStock);
    }, [price, stock, productPrice, productStock]);

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
            {
                showMessage && (
                    <div className={style.message}>
                        {
                            product?.variation ? (
                                <p>✏️ El producto <b>{product?.name}</b> - <b>{product?.variation.name}</b> se ha actualizado correctamente</p>
                            ) : (
                                <p>✏️ El producto <b>{product?.name}</b> se ha actualizado correctamente</p>
                            )
                        }
                    </div>
                )
            }
            <div 
                className={style.product}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <div className={style.product__image}>
                    <img src={product?.images[0]} alt={product?.name} />
                </div>
                <div className={style.product__name}>
                    <Link href={`/back-plataform/edit-product/${product?.id}`}>
                        <h3>{product?.name}</h3>
                    </Link>
                    {
                        product?.variation && (
                            <p>{product?.variation.name}</p>
                        )
                    }
                </div>
                <div className={style.product__sku}>
                    {
                        product?.variation ? (
                            <p>{`${product?.id} - ${product?.variation.name}`}</p>
                        ) : (
                            <p>{product?.id}</p>
                        )
                    }
                </div>
                <div className={style.product__price}>
                    <p>
                        {
                            product?.variation ? (
                                <span>{formatPrice(product?.variation.price)}</span>
                            ) : (
                                <span>{formatPrice(product?.price)}</span>
                            )
                        }
                    </p>
                </div>
                <div className={style.product__stock}>
                    {
                        product?.variation ? (
                            <p>{product?.variation.stock}</p>
                        ) : (
                            <input ref={stockRef} type="number" name='stock' value={stock} onChange={handleStock}/>
                        )
                    }
                </div>
               
                {
                    showEditButton && (
                        <div className={style.edit__product}>
                            <button onClick={haldleEditProduct}>
                                <EditIcon width="25px" height="25px" />
                            </button>
                        </div>
                    )
                }
                {
                    isMouseOnTheDiv && (
                        <button className={style.deleteProductButton} onClick={handleOpenModal}>
                            <Trash width={25} />
                        </button>
                    )
                }
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