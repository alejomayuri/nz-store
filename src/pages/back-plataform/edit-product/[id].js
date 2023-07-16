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

    if (formProduct && formProduct.image && prevImage === '') {
        setPrevImage(formProduct.image)
    }
    
    useEffect(() => {
        if (product) {
            setEditFormProduct(product[0])
            setFormProduct(product[0])
        }
    }, [product])

    const handleDeleteImg = () => {
        setPrevImage('')
        setFormProduct({
            ...product[0],
            image: ''
        })

        if (file) {
        const storageRef = getStorage().ref(`products/${file.name}`)
        storageRef.delete()
        }
        setShowProgress(false)
        setUploadValue(0)
    }

    const handleOnChange = (e) => {
        const { name, value } = e.target
        setEditFormProduct({
            ...editFormProduct,
            [name]: value
        })
    }

    const handleOnChangeImg = (e) => {
        const file = e.target.files[0]
        setFile(file)
        setShowProgress(true)
        setPrevImage('')
        const storageRef = getStorage().ref(`products/${file?.name}`)
        const task = storageRef.put(file)

        task.then(res => {
            const imgUrl = res.ref.getDownloadURL()
            imgUrl.then(url => {
                setEditFormProduct((prevState) => ({
                    ...prevState,
                    image: url
                }))
                setPrevImage(url)
                setUploadValue(100)
            })
        }).catch(err => console.log(err))

        task.on('state_changed', snapshot => {
            const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100) - 10
            setUploadValue(progress)
        })
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
        setEditFormProduct({
            ...editFormProduct,
            options: options
        })
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
        if (editFormProduct?.name && editFormProduct?.name !== "" &&
            editFormProduct?.description && editFormProduct?.description !== "" &&
            editFormProduct?.image && editFormProduct?.image !== "" &&
            editFormProduct?.currency && editFormProduct?.currency !== "" &&
            editFormProduct?.active !== "" &&
            editFormProduct?.categories && editFormProduct?.categories.length > 0 && editFormProduct?.categories[0] !== "" &&
            editFormProduct?.subcategory && editFormProduct?.subcategory !== ""
            // editFormProduct?.keywords && editFormProduct?.keywords !== ""
        ) {
            if (
                // editFormProduct?.stock && editFormProduct?.stock !== "" &&
                editFormProduct?.price && editFormProduct?.price !== ""
            ) {
                setDisabledButton(false)
            } else {
                if (editFormProduct?.options && editFormProduct?.options.length > 0 &&
                    editFormProduct?.options[0].name !== "" && editFormProduct.options[0].values[0] !== "" &&
                    editFormProduct?.variations && editFormProduct?.variations.length > 0 &&
                    variationWithoutPricek()
                ) {
                    setDisabledButton(false)
                } else {
                    setDisabledButton(true)
                }
            }
        } else {
            setDisabledButton(true)
        }
    }, [
        editFormProduct,
        setDisabledButton,
        variationWithoutPricek
    ])

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
                        <State
                            onChange={handleOnChangeState}
                            productState={formProduct?.active}
                        />
                        <Organization
                            onChangeCats={handleCategories}
                            onChange={handleOnChange}
                            categories={formProduct?.categories}
                            subcat={formProduct?.subcategory}
                            keywords={formProduct?.keywords}
                        />
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