import { BackLayout } from "@/Layouts/BackLayout";
import { MainBanner } from "@/components/BackPlataform/Pages/PageStore/MainBanner/MainBanner";

const BackPlataform_Products = () => {
    return (
        <BackLayout>
            <div className="content__wrapper_big">
                <h1>Tienda online</h1>
                <div>
                    <MainBanner />
                </div>
            </div>
        </BackLayout>
    )
}

export default BackPlataform_Products