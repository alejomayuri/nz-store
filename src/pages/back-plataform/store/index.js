import { BackLayout } from "@/Layouts/BackLayout";
import { MainBanner } from "@/components/BackPlataform/Pages/PageStore/MainBanner/MainBanner";
import { HomeImages } from "@/components/BackPlataform/Pages/PageStore/HomeImages/HomeImages";

const BackPlataform_Products = () => {
    return (
        <BackLayout>
            <div className="content__wrapper_big">
                <h1>Tienda online</h1>
                <div>
                    <MainBanner />
                    <HomeImages />
                </div>
            </div>
        </BackLayout>
    )
}

export default BackPlataform_Products