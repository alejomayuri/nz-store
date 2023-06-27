import { BackLayout } from "@/Layouts/BackLayout";
import { CreateCupon } from "@/components/BackPlataform/Pages/PageCupons/CreateCupon/CreateCupon";

const BackPlataform_Products = () => {
    return (
        <BackLayout>
            <div className="content__wrapper_big">
                <h1>Cupones</h1>
                <CreateCupon />
            </div>
        </BackLayout>
    )
}

export default BackPlataform_Products