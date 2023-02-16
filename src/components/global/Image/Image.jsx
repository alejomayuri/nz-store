const Image = ({ src, alt, refElement }) => {
    let showImage = null;
    let lazyObject = {};

    if (src) {
        lazyObject = {
            loading: "lazy",
        }

        showImage = (
            <picture>
                <img
                    {...lazyObject}
                    src={src}
                    alt={alt}
                    ref={refElement}
                    width="100%"
                    height="100%"
                />
            </picture>
        )
    }

    return (
        <>
            {showImage}
        </>
    );
}

export { Image }