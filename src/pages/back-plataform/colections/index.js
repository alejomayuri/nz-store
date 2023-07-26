import { BackLayout } from "@/Layouts/BackLayout";
import { Colections } from "@/components/BackPlataform/Pages/PageColections/Colections/Colections";

const BackPlataform_Colections = () => {
    return (
        <BackLayout>
            <div className="content__wrapper_big">
                <h1>Colecciones</h1>
                <div>
                    <Colections />
                </div>
            </div>
        </BackLayout>
    )
}

export default BackPlataform_Colections