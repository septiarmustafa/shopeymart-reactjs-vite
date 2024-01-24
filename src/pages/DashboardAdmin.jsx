import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import http from "../config/httpConfig";
import Modal from "react-modal";
Modal.setAppElement("#root");
const DashboardAdmin = () => {
  const [products, setProducts] = useState([]);
  const [productId, setProductId] = useState("");
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updatedProductData, setUpdatedProductData] = useState({
    productId: "",
    productName: "",
    desc: "",
    price: 0,
    stock: 0,
    storeId: {
      id: "6e8b1086-e294-4d47-abe7-7faeaba3caca",
    },
  });
  const fetchProducts = async () => {
    try {
      const response = await http.get("/product");
      setProducts(response.data.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (productId) => {
    try {
      await http.delete(`/product/${productId}`);
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== productId)
      );
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleUpdate = (productId) => {
    const productToUpdate = products.find(
      (product) => product.id === productId
    );
    setShowUpdateModal(true);
    setProductId(productId);

    setUpdatedProductData({
      productId: productId,
      productName: productToUpdate.productName,
      desc: productToUpdate.desc,
      price: productToUpdate.productPrice[0].price,
      stock: productToUpdate.productPrice[0].stock,
      storeId: {
        id: "6e8b1086-e294-4d47-abe7-7faeaba3caca",
      },
    });
  };

  const handleCloseModal = () => {
    setShowUpdateModal(false);
  };

  const handleSaveUpdate = async () => {
    try {
      await http.put(`/product`, updatedProductData);
      setShowUpdateModal(false);
      fetchProducts();
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleViewDetail = (productId) => {
    console.log(`View details for product with ID: ${productId}`);
  };

  const Menu = () => {
    return (
      <>
        <div className="card m-4">
          <div className="card-body">
            <h4 className="card-title">Menu Dashboard</h4>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <a href="#" className="text-dark">
                  Products
                </a>
              </li>
              <li className="list-group-item">
                <a href="#" className="text-dark">
                  Customers
                </a>
              </li>
              <li className="list-group-item">
                <a href="#" className="text-dark">
                  Order
                </a>
              </li>
            </ul>
          </div>
        </div>
      </>
    );
  };
  const ListProduct = ({
    products,
    handleDelete,
    handleUpdate,
    handleViewDetail,
  }) => {
    return (
      <>
        <div className="container my-3">
          <h2 className="text-left mb-4">List Product</h2>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th scope="col">No</th>
                <th scope="col">Product Name</th>
                <th scope="col">Description</th>
                <th scope="col">Price</th>
                <th scope="col">Stock</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={product.id}>
                  <th scope="row">{index + 1}</th>
                  <td>{product.name}</td>
                  <td>{product.description || "No description available"}</td>
                  <td>Rp {product.productPrice[0].price}</td>
                  <td>{product.productPrice[0].stock}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm mr-2"
                      onClick={() => handleDelete(product.id)}
                    >
                      Delete
                    </button>
                    <button
                      className="btn btn-primary btn-sm mr-2"
                      onClick={() => {
                        handleUpdate(product.id);
                      }}
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-success btn-sm"
                      onClick={() => handleViewDetail(product.id)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    );
  };
  return (
    <>
      <Navbar />
      <div className="row">
        <div className="col-lg-3">
          {" "}
          <Menu />
        </div>
        <div className="col-lg-8">
          <ListProduct
            products={products}
            handleDelete={handleDelete}
            handleUpdate={handleUpdate}
            handleViewDetail={handleViewDetail}
            setShowUpdateModal={setShowUpdateModal}
          />
        </div>
      </div>
      <div className="m-2">
        <Modal
          isOpen={showUpdateModal}
          onRequestClose={handleCloseModal}
          contentLabel="Update Product Modal"
          style={{
            content: {
              justifyContent: "center",
              alignContent: "center",
              marginBlockStart: "100px",
              marginInline: "500px",
              width: "50%",
              height: "60%",
            },
          }}
        >
          <h2>Update Product</h2>
          <div className="form-group">
            <label htmlFor="productName">Product Name</label>
            <input
              type="text"
              className="form-control"
              id="productName"
              value={updatedProductData.productName}
              onChange={(e) =>
                setUpdatedProductData({
                  ...updatedProductData,
                  productName: e.target.value,
                })
              }
            />
          </div>
          <div className="form-group">
            <label htmlFor="desc">Description</label>
            <input
              type="text"
              className="form-control"
              id="desc"
              value={updatedProductData.desc}
              onChange={(e) =>
                setUpdatedProductData({
                  ...updatedProductData,
                  desc: e.target.value,
                })
              }
            />
          </div>
          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input
              type="number"
              className="form-control"
              id="price"
              value={updatedProductData.price}
              onChange={(e) =>
                setUpdatedProductData({
                  ...updatedProductData,
                  price: e.target.value,
                })
              }
            />
          </div>
          <div className="form-group">
            <label htmlFor="stock">Stock</label>
            <input
              type="number"
              className="form-control"
              id="stock"
              value={updatedProductData.stock}
              onChange={(e) =>
                setUpdatedProductData({
                  ...updatedProductData,
                  stock: Number(e.target.value),
                })
              }
            />
          </div>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleCloseModal}
          >
            Close
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => handleSaveUpdate()}
          >
            Save changes
          </button>
        </Modal>
      </div>

      <Footer />
    </>
  );
};

export default DashboardAdmin;
