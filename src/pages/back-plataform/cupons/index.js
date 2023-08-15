import { BackLayout } from "@/Layouts/BackLayout";
import { CreateCupon } from "@/components/BackPlataform/Pages/PageCupons/CreateCupon/CreateCupon";
import { CuponsList } from "@/components/BackPlataform/Pages/PageCupons/CuponsList/CuponsList";

const BackPlataform_Products = () => {
    return (
        <BackLayout>
            <div className="content__wrapper_big">
                <h1>Cupones</h1>
                <CreateCupon />
                <CuponsList />
            </div>
        </BackLayout>
    )
}

export default BackPlataform_Products