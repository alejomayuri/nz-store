import { useState } from "react"

export default function useCreateProduct({getStorage} = {}) {
    const FORM_STATE = {
        name: null,
        description: null,
        image: null,
        currency: "PEN",
        price: null,
        comparisonPrice: null,
        stock: null,
        saleWithoutStock: false,
        options: null,
        variations: null,
        active: false,
        categories: null,
        subcategory: null
    }
    
    const [formProduct, setFormProduct] = useState(
        FORM_STATE 
    )
    const [prevImage, setPrevImage] = useState(FORM_STATE.image)

    const [showProgress, setShowProgress] = useState(false)
    const [uploatValue, setUploadValue] = useState(0)
    const [disabledButton, setDisabledButton] = useState(false)
    const [file, setFile] = useState('')

    const handleOnChange = (e) => setFormProduct({
        ...formProduct,
        [e.target.name]: e.target.value
    })

    const handleOnChangeImg = (e) => {
        const file = e.target.files[0]
        setFile(file)
        setShowProgress(true)
        setPrevImage('')
        const storageRef = getStorage().ref(`products/${file?.name}`)
        const task = storageRef.put(file)

        task.then(res => {
            // console.log(res)
            const imgUrl = res.ref.getDownloadURL()
            imgUrl.then(url => {
                setFormProduct((prevState) => ({
                    ...prevState,
                    image: url
                }))
                setPrevImage(url)
                setUploadValue(100)
                setDisabledButton(false)
                setShowProgress(false)
            })
        }).catch(err => console.log(err))

        task.on('state_changed', snapshot => {
            const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100) - 10
            setUploadValue(progress)
        })
    }

    const handleDeleteImg = () => {
        setPrevImage('')
        setFormProduct({
            ...formProduct,
            image: ''
        })
        if (file) {
            const storageRef = getStorage().ref(`products/${file.name}`)
            storageRef.delete()
        }
        setShowProgress(false)
        setUploadValue(0)
    }

    const handleSaleWithoutStock = (e) => {
        setFormProduct({
            ...formProduct,
            saleWithoutStock: e.target.checked
        })
    }

    const handleOptions = (options) => {
        setFormProduct({
            ...formProduct,
            options: options
        })
    }

    const handleVariations = (variations) => {
        setFormProduct({
            ...formProduct,
            variations: variations
        })
    }

    const handleOnChangeState = (boolean) => {
        setFormProduct({
            ...formProduct,
            active: boolean
        })
    }

    const handleCategories = (cat) => {
        setFormProduct({
            ...formProduct,
            categories: cat
        })
    }

    return {
        formProduct,
        showProgress,
        uploatValue,
        prevImage,
        disabledButton,
        setDisabledButton,
        handleOnChange,
        handleOnChangeImg,
        handleDeleteImg,
        handleSaleWithoutStock,
        handleOptions,
        handleVariations,
        handleOnChangeState,
        handleCategories
    }
}