import { BackLayout } from "@/Layouts/BackLayout";
import { useEffect, useCallback } from "react";
import { getStorage } from "@/firebase/client";
import useCreateProduct from "@/hooks/useCreateProducts";
import { TitleAndDescription } from "@/components/BackPlataform/Pages/PageCreateProducts/TitleAndDescription/TitleAndDescription";
import { createProduct } from "@/firebase/client";
import { CreateButton } from "@/components/BackPlataform/Pages/PageCreateProducts/CreateButton/CreateButton";
import { Multimedia } from "@/components/BackPlataform/Pages/PageCreateProducts/Multimedia/Multimedia";
import { Price } from "@/components/BackPlataform/Pages/PageCreateProducts/Price/Price";
import { Stock } from "@/components/BackPlataform/Pages/PageCreateProducts/Stock/Stock";
import { Options } from "@/components/BackPlataform/Pages/PageCreateProducts/Options/Options";
import { Variations } from "@/components/BackPlataform/Pages/PageCreateProducts/Variations/Variations";
import { State } from "@/components/BackPlataform/Pages/PageCreateProducts/State/State";
import { Organization } from "@/components/BackPlataform/Pages/PageCreateProducts/Organization/Organization";
import { useRouter } from "next/router";

const BackPlataform_CreateProducts = () => {
    const {
        formProduct,
        showProgress,
        uploatValue,
        prevImage,
        disabledButton,
        setDisabledButton,
        handleOnChange,
        handleOnChangeImg,
        handleDeleteImg,
        handleSaleWithoutStock,
        handleOptions,
        handleVariations,
        handleOnChangeState,
        handleCategories,
        handleAddImages
    } = useCreateProduct({getStorage: getStorage})
    console.log(formProduct)
    const variationWithoutPricek = useCallback(() => {
        if (formProduct.variations && formProduct.variations.length > 0) {
                for (let i = 0; i < formProduct.variations.length; i++) {
                    if (formProduct.variations[i].price === '0') {
                        return false
                    }
                }
            }
        return true
    }, [formProduct.variations])

    const router = useRouter()

    const handleCreate = useCallback(() => {
        createProduct(formProduct)
            .then(() => {
                router.push('/back-plataform/products');
            })
    }, [router, formProduct]);

    useEffect(() => {
        if (formProduct?.name && formProduct?.name !== "" &&
            formProduct?.description && formProduct?.description !== "" &&
            // formProduct?.image && formProduct?.image !== "" &&
            formProduct?.images && formProduct?.images.length > 0 &&
            formProduct?.currency && formProduct?.currency !== "" &&
            formProduct?.active !== "" &&
            formProduct?.categories && formProduct?.categories.length > 0 && formProduct?.categories[0] !== ""
            // formProduct?.subcategory && formProduct?.subcategory !== "" 
            // formProduct?.keywords && formProduct?.keywords !== ""
        ) {
            if (
                // formProduct?.stock && formProduct?.stock !== "" &&
                formProduct?.price && formProduct?.price !== ""
            ) {
                setDisabledButton(false)
            } else {
                if (formProduct?.options && formProduct?.options.length > 0 &&
                    formProduct?.options[0].name !== "" && formProduct.options[0].values[0] !== "" &&
                    formProduct?.variations && formProduct?.variations.length > 0 &&
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
        formProduct,
        setDisabledButton,
        variationWithoutPricek
    ])

    return (
        <BackLayout>
            <div className="content__wrapper">
                <h1>Agregar producto</h1>
                <div>
                    <div>
                        <TitleAndDescription
                            onChange={handleOnChange}
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
                        />
                        
                        <Stock
                            onChange={handleOnChange}
                            handleSaleWithoutStock={handleSaleWithoutStock}
                        />
                        
                        <Options
                            onChange={handleOptions}
                            create={true}
                            clearVariations={handleVariations}
                        />
                        {
                            formProduct?.options?.length > 0 && (
                                <Variations
                                    options={formProduct?.options || []}
                                    onChange={handleVariations}
                                />  
                            )
                        }
                    </div> 
                    <div>
                        <State
                            onChange={handleOnChangeState}
                        />
                        <Organization
                            onChangeCats={handleCategories}
                            onChange={handleOnChange}
                        />
                        <CreateButton
                            disabled={disabledButton}
                            text="Crear producto"
                            onClick={handleCreate}
                        />
                    </div>
                </div>
            </div>
        </BackLayout>
    )
}

export default BackPlataform_CreateProducts