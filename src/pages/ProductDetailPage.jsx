import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import React, { useEffect, useState } from "react";
import http from "../config/httpConfig";
import { formatProductForCart } from "../util/FormatProductCart";

const ProductDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState({});
  const [loadingAddToCart, setLoadingAddToCart] = useState(false);

  const addProduct = (product) => {
    dispatch(addCart(product));
  };

  const handleAddToCart = (product) => {
    setLoadingAddToCart(true);

    setTimeout(() => {
      const formattedProduct = formatProductForCart(product);
      addProduct(formattedProduct);
      setLoadingAddToCart(false);
    }, 2000);
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await http.get(`/product/${id}`);
        setProduct(response.data.data);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchProduct();
  }, [id]);

  const ShowProduct = () => {
    return (
      <>
        <div className="container my-5 py-2">
          <div className="row">
            <div className="col-md-6 col-sm-12 py-3">
              <img
                className="img-fluid"
                src={product.image}
                alt={product.productName}
                width="400px"
                height="400px"
              />
            </div>
            <div className="col-md-6 col-md-6 py-5">
              <h4 className="text-uppercase text-muted"></h4>
              <h1 className="display-5">{product.productName}</h1>

              <h3 className="display-6  my-4">Rp {product.price}</h3>
              <p className="lead">
                {product.desc || "No description available"}
              </p>
              <button
                className="btn btn-dark m-1"
                onClick={() => handleAddToCart(product)}
                disabled={loadingAddToCart}
              >
                {loadingAddToCart ? "Loading..." : "Add to Cart"}
              </button>
              <Link to="/cart" className="btn btn-dark mx-3">
                Go to Cart
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  };
  return (
    <>
      <Navbar />
      <div className="container">
        <div className="row">{<ShowProduct />}</div>
      </div>
      <Footer />
    </>
  );
};

export default ProductDetailPage;
