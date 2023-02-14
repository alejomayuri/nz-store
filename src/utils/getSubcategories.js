const getSubcategories = (products) => {
    let subcategories = [];

    products.forEach(product => {
        if (product.subcategory) {
            if (product.subcategory.split(', ').length > 1) {
                subcategories = [...subcategories, ...product.subcategory.split(', ')]
            } else {
                subcategories.push(product.subcategory)
            }
        }
    });
    
    const getUniqueSubcats = [...new Set(subcategories)];

    return getUniqueSubcats;
}

export default getSubcategories;