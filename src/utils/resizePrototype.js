function resizePrototype() {
}

resizePrototype.prototype.resize = (srcImage, width, height) => {
    let imgResizeUrl = null;
    if (srcImage && srcImage.includes('https://firebasestorage.googleapis.com')) {
            imgResizeUrl = `https://firebasestorage.googleapis.com/${srcImage.replace('https://firebasestorage.googleapis.com/', '')}&width=${width}&height=${height}`
    }  else {
        imgResizeUrl = srcImage;
    }
    return imgResizeUrl;
}


export default resizePrototype;
