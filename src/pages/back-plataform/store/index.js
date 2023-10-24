import { BackLayout } from "@/Layouts/BackLayout";
import { MainBanner } from "@/components/BackPlataform/Pages/PageStore/MainBanner/MainBanner";
import { HomeImages } from "@/components/BackPlataform/Pages/PageStore/HomeImages/HomeImages";
import { SecondaryBanner } from "@/components/BackPlataform/Pages/PageStore/SecondaryBanner/SecondaryBanner";
import { PopUp } from "@/components/BackPlataform/Pages/PageStore/PopUp/PopUp";

const BackPlataform_Products = () => {
    return (
        <BackLayout>
            <div className="content__wrapper_big">
                <h1>Tienda online</h1>
                <div>
                    <MainBanner />
                    <HomeImages />
                    <SecondaryBanner />
                    <PopUp />
                </div>
            </div>
        </BackLayout>
    )
}

export default BackPlataform_Products