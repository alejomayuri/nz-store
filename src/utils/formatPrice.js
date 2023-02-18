let formatPriceContract = new Intl.NumberFormat("es-PE", {
    style: "currency",
    currency: "PEN",
  });

export const formatPrice = (price) => {
    return formatPriceContract.format(price);
};