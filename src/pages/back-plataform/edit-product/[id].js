import { useRouter } from "next/router"
import { useEffect, useState, useCallback } from "react"
import { useSingleProduct } from "@/hooks/useSingleProducts"
import { BackLayout } from "@/Layouts/BackLayout";
import { TitleAndDescription } from "@/components/BackPlataform/Pages/PageCreateProducts/TitleAndDescription/TitleAndDescription";
import { CreateButton } from "@/components/BackPlataform/Pages/PageCreateProducts/CreateButton/CreateButton";
import { Multimedia } from "@/components/BackPlataform/Pages/PageCreateProducts/Multimedia/Multimedia";
import { Price } from "@/components/BackPlataform/Pages/PageCreateProducts/Price/Price";
import { Stock } from "@/components/BackPlataform/Pages/PageCreateProducts/Stock/Stock";
import { Options } from "@/components/BackPlataform/Pages/PageCreateProducts/Options/Options";
import { Variations } from "@/components/BackPlataform/Pages/PageCreateProducts/Variations/Variations";
import { State } from "@/components/BackPlataform/Pages/PageCreateProducts/State/State";
import { Organization } from "@/components/BackPlataform/Pages/PageCreateProducts/Organization/Organization";
import { getStorage } from "@/firebase/client";
import { editFormProductFunction } from "@/firebase/client";

const BackPlataform_EditProduct = () => {
    const router = useRouter()
    const { id } = router.query
    const { product, loading } = useSingleProduct({ id })
    const [formProduct, setFormProduct] = useState({})
    const [editFormProduct, setEditFormProduct] = useState({})
    const [showProgress, setShowProgress] = useState(false)
    const [prevImage, setPrevImage] = useState('')
    const [uploatValue, setUploadValue] = useState(0)
    const [file, setFile] = useState('')
    const [disabledButton, setDisabledButton] = useState(true)
    console.log("editFormProduct", editFormProduct)
    console.log("formProduct", formProduct)
    console.log("product", product)
    if (editFormProduct && editFormProduct.image && prevImage === '') {
        setPrevImage(formProduct.image)
    }
    
    useEffect(() => {
        if (product) {
            setEditFormProduct(product[0])
            setFormProduct(product[0])
        }
    }, [product])

    const handleOnChange = (e) => {
        const { name, value } = e.target
        setEditFormProduct({
            ...editFormProduct,
            [name]: value
        })
    }

    const resizeImage = (file, maxWidth, maxHeight, callback) => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            const reader = new FileReader();
        
            reader.onload = function (e) {
              img.onload = function () {
                const canvas = document.createElement("canvas");
                let width = img.width;
                let height = img.height;
        
                if (width > maxWidth) {
                  height *= maxWidth / width;
                  width = maxWidth;
                }
        
                if (height > maxHeight) {
                  width *= maxHeight / height;
                  height = maxHeight;
                }
        
                canvas.width = width;
                canvas.height = height;
        
                const ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0, width, height);
        
                canvas.toBlob((blob) => {
                  const resizedFile = new File([blob], file.name, { type: file.type });
                  resolve(resizedFile); // Resolvemos la promesa con el archivo redimensionado
                }, file.type);
              };
        
              img.src = e.target.result;
            };
        
            reader.readAsDataURL(file);
        });
    };

    const handleOnChangeImg = async  (e) => {
        const files = e.target.files;
        const maxWidth = 600; // Tamaño máximo deseado
        const maxHeight = 600;
        const storageRef = getStorage().ref("products"); // Ruta de almacenamiento en Firebase Storage

        const storageRefPromises = [];
        const totalFiles = files.length;
        let uploadedFiles = 0;

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
        
            try {
              // Redimensionar cada imagen antes de subirla
                const resizedFile = await resizeImage(file, maxWidth, maxHeight);
                const storageChildRef = storageRef.child(resizedFile.name);
            
                const task = storageChildRef.put(resizedFile);
            
                const promise = new Promise((resolve, reject) => {
                    task.then((snapshot) => {
                        snapshot.ref.getDownloadURL().then((url) => {
                            resolve(url);
                        });
                    }).catch((err) => reject(err));
            
                    task.on("state_changed", (snapshot) => {
                        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100) - 10
                        setUploadValue(progress)
                        setShowProgress(true)
                        if (progress === 100) {
                            uploadedFiles++;
                          }
                    });

                    task.then(() => {
                        // Cuando todos los archivos se hayan subido, actualizamos el estado y ocultamos la barra de carga
                        if (uploadedFiles === files.length) {
                          setUploadValue(100);
                          setDisabledButton(false);
                          setShowProgress(false);
                        }
                      });
                });
            
                storageRefPromises.push(promise);
            } catch (err) {
                console.log(err);
            }
        }

        // Esperar a que se suban todas las imágenes y actualizar el estado con las URL de las imágenes
        Promise.all(storageRefPromises)
            .then((urls) => {
            setEditFormProduct((prevState) => ({
                ...prevState,
                images: [...prevState.images, ...urls],
            }));
            setUploadValue(100);
            setDisabledButton(false);
            setShowProgress(false);
            })
            .catch((err) => console.log(err));
    }

    const handleDeleteImg = (url) => {
        const imageIndex = formProduct.images.findIndex(img => img === url);

        if (imageIndex !== -1) {
            const updatedImages = formProduct.images.filter(img => img !== url)
            setEditFormProduct({
                ...formProduct,
                images: updatedImages
            });

            if (file) {
                // Elimina el archivo correspondiente al índice de la imagen
                const extractFileName = (url) => {
                    const parts = url.split("/");
                    const encodedFileName = parts[parts.length - 1].split("?")[0];
                    const fileName = decodeURIComponent(encodedFileName);
                    return fileName;
                };
                const imageName = extractFileName(url);
                const storageRef = getStorage().ref(`${imageName}`);
                storageRef.delete();
                setFile('');
            }
        }

        setShowProgress(false);
        setUploadValue(0);
    }

    const handleSaleWithoutStock = (e) => {
        setEditFormProduct({
            ...editFormProduct,
            saleWithoutStock: e.target.checked
        })
    }

    const handleOnChangeState = (boolean) => {
        setEditFormProduct({
            ...editFormProduct,
            active: boolean
        })
    }

    const handleCategories = (cat) => {
        setEditFormProduct({
            ...editFormProduct,
            categories: cat
        })
    }

    const handleOptions = (options) => {
        if (editFormProduct) {
            setEditFormProduct({
                ...editFormProduct,
                options: options,
            })
        }
    }

    const handleVariations = (variations) => {
        setEditFormProduct({
            ...editFormProduct,
            variations: variations
        })
    }

    const handleEdit = useCallback(() => {
        editFormProductFunction(id, editFormProduct)
            .then(() => {
                router.push('/back-plataform/products');
            })
    }, [router, editFormProduct, id]);

    const variationWithoutPricek = useCallback(() => {
        if (editFormProduct?.variations && editFormProduct?.variations.length > 0) {
                for (let i = 0; i < editFormProduct?.variations.length; i++) {
                    if (editFormProduct?.variations[i].price === '0') {
                        return false
                    }
                }
            }
        return true
    }, [editFormProduct?.variations])

    useEffect(() => {
        if (formProduct?.name && formProduct?.name !== "" &&
            formProduct?.description && formProduct?.description !== "" &&
            formProduct?.images && formProduct?.images.length > 0 &&
            formProduct?.price && formProduct?.price !== "" &&
            formProduct?.stock && formProduct?.stock !== "") {
            setDisabledButton(false)
        } else {
            setDisabledButton(true)
        }
    }, [formProduct, product])

    // useEffect(() => {
    //     if (editFormProduct?.name && editFormProduct?.name !== "" &&
    //         editFormProduct?.description && editFormProduct?.description !== "" &&
    //         editFormProduct?.image && editFormProduct?.image !== "" &&
    //         editFormProduct?.currency && editFormProduct?.currency !== "" &&
    //         editFormProduct?.active !== "" &&
    //         editFormProduct?.categories && editFormProduct?.categories.length > 0 && editFormProduct?.categories[0] !== "" &&
    //         editFormProduct?.subcategory && editFormProduct?.subcategory !== ""
    //         // editFormProduct?.keywords && editFormProduct?.keywords !== ""
    //     ) {
    //         if (
    //             // editFormProduct?.stock && editFormProduct?.stock !== "" &&
    //             editFormProduct?.price && editFormProduct?.price !== ""
    //         ) {
    //             setDisabledButton(false)
    //         } else {
    //             if (editFormProduct?.options && editFormProduct?.options.length > 0 &&
    //                 editFormProduct?.options[0].name !== "" && editFormProduct.options[0].values[0] !== "" &&
    //                 editFormProduct?.variations && editFormProduct?.variations.length > 0 &&
    //                 variationWithoutPricek()
    //             ) {
    //                 setDisabledButton(false)
    //             } else {
    //                 setDisabledButton(true)
    //             }
    //         }
    //     } else {
    //         setDisabledButton(true)
    //     }
    // }, [
    //     editFormProduct,
    //     setDisabledButton,
    //     variationWithoutPricek
    // ])

    return (
        <BackLayout>
            <div className="content__wrapper">
                <h1>Editar producto</h1>
                <div>
                    <div>
                        <TitleAndDescription
                            onChange={handleOnChange}
                            name={formProduct?.name}
                            description={formProduct?.description}
                        />
                        <Multimedia
                            onChange={handleOnChangeImg}
                            prevImage={prevImage}
                            showProgress={showProgress}
                            uploatValue={uploatValue}
                            handleDeleteImg={handleDeleteImg}
                            images={formProduct?.images || []}
                        />
                        <Price
                            onChange={handleOnChange}
                            price={formProduct?.price}
                            comparisonPrice={formProduct?.comparisonPrice}
                        />
                        <Stock
                            onChange={handleOnChange}
                            handleSaleWithoutStock={handleSaleWithoutStock}
                            stock={formProduct?.stock}
                            saleWithoutStock={formProduct?.saleWithoutStock}
                        />
                        <Options
                            onChange={handleOptions}
                            productOptions={formProduct?.options}
                            create={formProduct?.options !== editFormProduct?.options}
                            clearVariations={handleVariations}
                        />
                        {
                            formProduct?.options?.length > 0 && (
                                <Variations
                                    options={editFormProduct?.options || []}
                                    onChange={handleVariations}
                                    productVariations={formProduct?.variations}
                                />  
                            )
                        }
                    </div>
                    <div>
                        {/* <State
                            onChange={handleOnChangeState}
                            productState={formProduct?.active}
                        />
                        <Organization
                            onChangeCats={handleCategories}
                            onChange={handleOnChange}
                            categories={formProduct?.categories}
                            subcat={formProduct?.subcategory}
                            keywords={formProduct?.keywords}
                        /> */}
                        <CreateButton
                            disabled={disabledButton}
                            text="Editar producto"
                            onClick={handleEdit}
                        />
                    </div>
                </div>
            </div>
        </BackLayout>
    )
}

export default BackPlataform_EditProduct