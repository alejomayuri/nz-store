import { useState } from "react"

export default function useCreateProduct({getStorage} = {}) {
    const FORM_STATE = {
        name: null,
        description: null,
        image: null,
        images: [],
        currency: "PEN",
        price: 0,
        comparisonPrice: null,
        stock: 0,
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

    const handleAddImages = (e) => {
        const files = e.target.files
        const images = []
        for (let i = 0; i < files.length; i++) {
            images.push(files[i])
        }
        setFormProduct({
            ...formProduct,
            images: images
        })
    }

    const resizeImage = (file, maxWidth, maxHeight, callback) => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            const reader = new FileReader();
        
            reader.onload = function (e) {
              img.onload = function () {
                const canvas = document.createElement("canvas");
                let width = img.width;
                let height = img.height;
        
                if (width > maxWidth) {
                  height *= maxWidth / width;
                  width = maxWidth;
                }
        
                if (height > maxHeight) {
                  width *= maxHeight / height;
                  height = maxHeight;
                }
        
                canvas.width = width;
                canvas.height = height;
        
                const ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0, width, height);
        
                canvas.toBlob((blob) => {
                  const resizedFile = new File([blob], file.name, { type: file.type });
                  resolve(resizedFile); // Resolvemos la promesa con el archivo redimensionado
                }, file.type);
              };
        
              img.src = e.target.result;
            };
        
            reader.readAsDataURL(file);
        });
    };
      

    const handleOnChangeImg = async  (e) => {
        const files = e.target.files;
        const maxWidth = 600; // Tamaño máximo deseado
        const maxHeight = 600;
        const storageRef = getStorage().ref("products"); // Ruta de almacenamiento en Firebase Storage

        const storageRefPromises = [];
        const totalFiles = files.length;
        let uploadedFiles = 0;

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
        
            try {
              // Redimensionar cada imagen antes de subirla
                const resizedFile = await resizeImage(file, maxWidth, maxHeight);
                const storageChildRef = storageRef.child(resizedFile.name);
            
                const task = storageChildRef.put(resizedFile);
            
                const promise = new Promise((resolve, reject) => {
                    task.then((snapshot) => {
                        snapshot.ref.getDownloadURL().then((url) => {
                            resolve(url);
                        });
                    }).catch((err) => reject(err));
            
                    task.on("state_changed", (snapshot) => {
                        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100) - 10
                        setUploadValue(progress)
                        setShowProgress(true)
                        if (progress === 100) {
                            uploadedFiles++;
                          }
                    });

                    task.then(() => {
                        // Cuando todos los archivos se hayan subido, actualizamos el estado y ocultamos la barra de carga
                        if (uploadedFiles === files.length) {
                          setUploadValue(100);
                          setDisabledButton(false);
                          setShowProgress(false);
                        }
                      });
                });
            
                storageRefPromises.push(promise);
            } catch (err) {
                console.log(err);
            }
        }

        // Esperar a que se suban todas las imágenes y actualizar el estado con las URL de las imágenes
        Promise.all(storageRefPromises)
            .then((urls) => {
            setFormProduct((prevState) => ({
                ...prevState,
                images: [...prevState.images, ...urls],
            }));
            setUploadValue(100);
            setDisabledButton(false);
            setShowProgress(false);
            })
            .catch((err) => console.log(err));
    }

    const handleDeleteImg = (url) => {
        const imageIndex = formProduct.images.findIndex(img => img === url);

        if (imageIndex !== -1) {
            const updatedImages = formProduct.images.filter(img => img !== url)
            console.log(updatedImages)
            setFormProduct({
                ...formProduct,
                images: updatedImages
            });

            if (file) {
                // Elimina el archivo correspondiente al índice de la imagen
                const extractFileName = (url) => {
                    const parts = url.split("/");
                    const encodedFileName = parts[parts.length - 1].split("?")[0];
                    const fileName = decodeURIComponent(encodedFileName);
                    return fileName;
                };
                const imageName = extractFileName(url);
                console.log(imageName)
                const storageRef = getStorage().ref(`${imageName}`);
                storageRef.delete();
                setFile('');
            }
        }

        setShowProgress(false);
        setUploadValue(0);
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

    const handleSubcategories = (subcat) => {
        setFormProduct({
            ...formProduct,
            subcategory: subcat
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
        handleCategories,
        handleSubcategories,
        handleAddImages
    }
}