import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addCart } from "../redux/action";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import React, { useState } from "react";

const ProductDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector((state) =>
    state.product.find((product) => product.id === parseInt(id))
  );
  const [loadingAddToCart, setLoadingAddToCart] = useState(false);

  const addProduct = (product) => {
    dispatch(addCart(product));
  };

  const handleAddToCart = (product) => {
    setLoadingAddToCart(true);

    setTimeout(() => {
      addProduct(product);
      setLoadingAddToCart(false);
    }, 2000);
  };

  const ShowProduct = () => {
    return (
      <>
        <div className="container my-5 py-2">
          <div className="row">
            <div className="col-md-6 col-sm-12 py-3">
              <img
                className="img-fluid"
                src={product.image}
                alt={product.title}
                width="400px"
                height="400px"
              />
            </div>
            <div className="col-md-6 col-md-6 py-5">
              <h4 className="text-uppercase text-muted">{product.category}</h4>
              <h1 className="display-5">{product.title}</h1>
              <p className="lead">
                <i className="bi bi-star-fill me-2"></i>
                {product.rating && product.rating.rate}{" "}
              </p>
              <h3 className="display-6  my-4">Rp {product.price}</h3>
              <p className="lead">{product.description}</p>
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
