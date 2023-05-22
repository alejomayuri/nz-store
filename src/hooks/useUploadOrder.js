import { useState } from "react"
import { uploadOrder } from "@/firebase/client"
import { useRouter } from "next/router"

export const useUploadOrder = ({order} = {order: null}) => {
    const [error, setError] = useState(null)
    const [uploadLoading, setUploadLoading] = useState(false)

    const router = useRouter()

    const handleUploadOrder = () => {
        setUploadLoading(true)
        uploadOrder(order)
            .then((id) => {
                setUploadLoading(false)
                router.replace(`/order/${id}`)
                
            })
            .catch((error) => setError('Server error'));
    }

    return {
        error,
        uploadLoading,
        handleUploadOrder
    };
}