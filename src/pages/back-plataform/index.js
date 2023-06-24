import { LoginForm } from "@/components/BackPlataform/Login/Login";
import { BackLayout } from "@/Layouts/BackLayout";
import { BackHome } from "@/components/BackPlataform/Home/Home";
import { useAdmin } from "@/hooks/useAdmin";

const BackPlataform = () => {
    const { isAdmin, isLoading } = useAdmin()

    if (isLoading) {
      return <div>Cargando...</div>;
    }
    
    if (isAdmin) {
        return (
            <BackLayout>
                <BackHome />
            </BackLayout>
        )
    }

    return <LoginForm />
}

export default BackPlataform