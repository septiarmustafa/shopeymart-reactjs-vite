export const formatProductForCart = (product) => {
  // Cek apakah product memiliki properti productPrice
  if (product.productPrice) {
    return {
      id: product.productId || product.id,
      name: product.productName || product.name,
      price: product.productPrice[0].price,
      stock: product.productPrice[0].stock,
      image: product.image,
      desc: product.description || product.desc,
    };
  } else {
    // Format dari ProductDetailPage
    return {
      id: product.productId || product.id,
      name: product.productName || product.name,
      price: product.price,
      image: product.image,
      desc: product.desc,
      stock: product.stock,
    };
  }
};
