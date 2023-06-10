import { BackLayout } from "@/Layouts/BackLayout";
import { useEffect, useCallback } from "react";
import { getStorage } from "@/firebase/client";
import useCreateProduct from "@/hooks/useCreateProducts";
import { TitleAndDescription } from "@/components/BackPlataform/Pages/PageCreateProducts/TitleAndDescription/TitleAndDescription";
import { createProduct } from "@/firebase/client";
import { CreateButton } from "@/components/BackPlataform/Pages/PageCreateProducts/CreateButton/CreateButton";
import { Multimedia } from "@/components/BackPlataform/Pages/PageCreateProducts/Multimedia/Multimedia";
import { Price } from "@/components/BackPlataform/Pages/PageCreateProducts/Price/Price";

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
        handleCategories
    } = useCreateProduct({getStorage: getStorage})

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
                        />
                        <Price
                            onChange={handleOnChange}
                        />
                        {/* 
                        <Stock
                            onChange={handleOnChange}
                            handleSaleWithoutStock={handleSaleWithoutStock}
                        />
                        <Options
                            onChange={handleOptions}
                            create={true}
                        />
                        {
                            formProduct?.options?.length > 0 && (
                                <Variations
                                    options={formProduct?.options || []}
                                    onChange={handleVariations}
                                />  
                            )
                        }*/}
                    </div> 
                    <div>
                        {/* <State
                            onChange={handleOnChangeState}
                        />
                        <Organization
                            onChangeCats={handleCategories}
                            onChange={handleOnChange}
                        /> */}
                        <CreateButton
                            disabled={disabledButton}
                            handleRegisterProduct={createProduct}
                            formProduct={formProduct}
                        />
                    </div>
                </div>
            </div>
        </BackLayout>
    )
}

export default BackPlataform_CreateProducts