import { useState } from "react"

export default function useCreateSecondaryBanner({getStorage} = {}) {
    const FORM_STATE = {
        image: null,
        url: null
    }

    const [formSecondaryBanner, setFormSecondaryBanner] = useState(
        FORM_STATE 
    )
    const [prevImage, setPrevImage] = useState(FORM_STATE.image)
    const [showProgress, setShowProgress] = useState(false)
    const [uploatValue, setUploadValue] = useState(0)
    const [file, setFile] = useState('')
    const [disabledButton, setDisabledButton] = useState(true)

    const handleOnChange = (e) => setFormSecondaryBanner({
        ...formSecondaryBanner,
        [e.target.name]: e.target.value
    })

    const handleOnChangeImg = (e) => {
        const file = e.target.files[0]
        setFile(file)
        setShowProgress(true)
        setPrevImage('')
        const storageRef = getStorage().ref(`banners/${file?.name}`)
        const task = storageRef.put(file)

        task.then(res => {
            // console.log(res)
            const imgUrl = res.ref.getDownloadURL()
            imgUrl.then(url => {
                setFormSecondaryBanner((prevState) => ({
                    ...prevState,
                    image: url
                }))
                setPrevImage(url)
                setUploadValue(100)
                // setDisabledButton(false)
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
        setFormSecondaryBanner({
            ...formSecondaryBanner,
            image: ''
        })
        if (file) {
            const storageRef = getStorage().ref(`banners/${file.name}`)
            storageRef.delete()
        }
        setShowProgress(false)
        setUploadValue(0)
    }

    return {
        formSecondaryBanner,
        handleOnChange,
        showProgress,
        uploatValue,
        prevImage,
        handleOnChangeImg,
        handleDeleteImg,
        setFormSecondaryBanner,
        setPrevImage,
        disabledButton,
        setDisabledButton
    }
}