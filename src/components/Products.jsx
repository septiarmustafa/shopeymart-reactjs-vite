import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";
import { useNavigate } from "react-router-dom";
import http from "../config/httpConfig";
import { formatProductForCart } from "../util/FormatProductCart";

const Products = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState(data);
  const [loadingBuy, setLoadingBuy] = useState({});
  const [loadingAddToCart, setLoadingAddToCart] = useState({});
  const navigate = useNavigate();

  const addProduct = (product) => {
    dispatch(addCart(product));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await http.get("/product");
        console.log(response.data.data);
        setData(response.data.data);
        setFilter(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  // const filterProduct = (cat) => {
  //   const updatedList = data.filter((item) => item.category === cat);
  //   setFilter(updatedList);
  // };

  const handleBuyNow = async (productId) => {
    setLoadingBuy((prev) => ({ ...prev, [productId]: true }));

    await new Promise((resolve) => setTimeout(resolve, 2000));

    setLoadingBuy((prev) => ({ ...prev, [productId]: false }));
    navigate(`/product/${productId}`);
  };

  const handleAddToCart = (product) => {
    setLoadingAddToCart((prev) => ({ ...prev, [product.id]: true }));

    setTimeout(() => {
      const formattedProduct = formatProductForCart(product);
      addProduct(formattedProduct);
      setLoadingAddToCart((prev) => ({ ...prev, [product.id]: false }));
    }, 2000);
  };

  const ShowProducts = () => {
    return (
      <>
        {/* <div className="buttons text-center py-5">
          <button
            className="btn btn-outline-dark btn-sm m-2"
            onClick={() => setFilter(data)}
          >
            All
          </button>
          <button
            className="btn btn-outline-dark btn-sm m-2"
            onClick={() => filterProduct("men's clothing")}
          >
            Men's Clothing
          </button>
          <button
            className="btn btn-outline-dark btn-sm m-2"
            onClick={() => filterProduct("women's clothing")}
          >
            Women's Clothing
          </button>
          <button
            className="btn btn-outline-dark btn-sm m-2"
            onClick={() => filterProduct("jewelery")}
          >
            Jewelery
          </button>
          <button
            className="btn btn-outline-dark btn-sm m-2"
            onClick={() => filterProduct("electronics")}
          >
            Electronics
          </button>
        </div> */}

        {filter.map((product) => {
          const isBuyNowLoading = loadingBuy[product.id] || false;
          const isAddToCartLoading = loadingAddToCart[product.id] || false;
          return (
            <div
              id={product.id}
              key={product.id}
              className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4"
            >
              <div className="card text-center h-100" key={product.id}>
                <img
                  className="card-img-top p-3"
                  src={product.image}
                  alt="Card"
                  height={300}
                />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">
                    {product.description || "No description available"}
                  </p>
                </div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item lead">
                    Rp {product.productPrice[0].price}
                  </li>
                </ul>
                <div className="card-body">
                  <button
                    className="btn btn-dark m-1"
                    onClick={() => handleBuyNow(product.id)}
                    disabled={isBuyNowLoading}
                  >
                    {isBuyNowLoading ? "Loading..." : "Buy Now"}
                  </button>
                  <button
                    className="btn btn-dark m-1"
                    onClick={() => handleAddToCart(product)}
                    disabled={isAddToCartLoading}
                  >
                    {isAddToCartLoading ? "Adding..." : "Add to Cart"}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </>
    );
  };
  return (
    <>
      <div className="container my-3 py-3">
        <div className="row">
          <div className="col-12">
            <h2 className="display-5 text-center">Latest Products</h2>
            <hr />
          </div>
        </div>
        <div className="row justify-content-center">{<ShowProducts />}</div>
      </div>
    </>
  );
};

export default Products;
