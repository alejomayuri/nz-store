import { Layout } from "@/Layouts/Layout"
import { useAuth } from "@/context/AuthContext"
import { LoginForm } from "@/components/PageUser/LoginForm/LoginForm"
import { UserContent } from "@/components/PageUser/UserContent/UserContetn"

const User = () => {
    const { currentUser } = useAuth()
    
    return (
        <Layout>
            {currentUser ? (<UserContent />) : (<LoginForm />)}
        </Layout>
    )
}

export default User