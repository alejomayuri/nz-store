import { BackLayout } from "@/Layouts/BackLayout";
import { Colections } from "@/components/BackPlataform/Pages/PageColections/Colections/Colections";
import { Subcategories } from "@/components/BackPlataform/Pages/PageColections/Subcategories/Subcategories";
import { useState } from "react";

const BackPlataform_Colections = () => {
    const [activeColection, setActiveColection] = useState(null)
    console.log(activeColection)
    return (
        <BackLayout>
            <div className="content__wrapper">
                <h1>Colecciones</h1>
                <div>
                    <Colections activeColection={activeColection} setActiveColection={setActiveColection} />
                    <Subcategories activeColection={activeColection} />
                </div>
            </div>
        </BackLayout>
    )
}

export default BackPlataform_Colections