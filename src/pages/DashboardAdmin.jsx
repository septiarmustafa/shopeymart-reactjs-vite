import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import http from "../config/httpConfig";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
Modal.setAppElement("#root");
const DashboardAdmin = () => {
  const [products, setProducts] = useState([]);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  const navigate = useNavigate();
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
  const [newProductData, setNewProductData] = useState({
    productName: "",
    desc: "",
    price: "",
    stock: 0,
    storeId: {
      id: "6e8b1086-e294-4d47-abe7-7faeaba3caca",
    },
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await http.get("/product");
      setProducts(response.data.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleSaveProduct = async () => {
    try {
      await http.post(`/product`, newProductData);
      setShowAddModal(false);
      fetchProducts();
    } catch (error) {
      console.error("Error added product:", error);
    }
  };

  const handleAddProduct = () => {
    setShowAddModal(true);

    setNewProductData({
      productName: newProductData.productName,
      desc: newProductData.desc,
      price: newProductData.price,
      stock: newProductData.stock,
      storeId: {
        id: "6e8b1086-e294-4d47-abe7-7faeaba3caca",
      },
    });
  };

  const handleUpdate = (productId) => {
    const productToUpdate = products.find(
      (product) => product.id === productId
    );
    setShowUpdateModal(true);

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

  const handleSaveUpdate = async () => {
    try {
      await http.put(`/product`, updatedProductData);
      setShowUpdateModal(false);
      fetchProducts();
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

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

  const handleViewDetail = (productId) => {
    navigate(`/product/${productId}`);
    console.log(`${productId}`);
  };

  const handleCloseModal = () => {
    setShowUpdateModal(false);
    setShowAddModal(false);
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
                      className="btn btn-success btn-sm mr-2 me-2"
                      onClick={() => handleAddProduct()}
                    >
                      Add
                    </button>
                    <button
                      className="btn btn-primary btn-sm mr-2 me-2"
                      onClick={() => {
                        handleUpdate(product.id);
                      }}
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-success btn-sm mr-2 me-2"
                      onClick={() => handleViewDetail(product.id)}
                    >
                      View
                    </button>
                    <button
                      className="btn btn-danger btn-sm mr-2 me-2"
                      onClick={() => handleDelete(product.id)}
                    >
                      Delete
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
          <div className="form-group mt-3">
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
          <div className="form-group mt-3">
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
          <div className="form-group mt-3">
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
          <div className="form-group mt-3">
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
            className="btn btn-secondary mt-5 me-2"
            onClick={handleCloseModal}
          >
            Close
          </button>
          <button
            type="button"
            className="btn btn-primary mt-5"
            onClick={() => handleSaveUpdate()}
          >
            Save changes
          </button>
        </Modal>
      </div>

      <div className="m-2">
        <Modal
          isOpen={showAddModal}
          onRequestClose={handleCloseModal}
          contentLabel="Add Product Modal"
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
          <h2>Add Product</h2>
          <div className="form-group mt-3">
            <label htmlFor="productName">Product Name</label>
            <input
              type="text"
              className="form-control"
              id="productName"
              value={newProductData.productName}
              onChange={(e) =>
                setNewProductData({
                  ...newProductData,
                  productName: e.target.value,
                })
              }
            />
          </div>
          <div className="form-group mt-3">
            <label htmlFor="desc">Description</label>
            <input
              type="text"
              className="form-control"
              id="desc"
              value={newProductData.desc}
              onChange={(e) =>
                setNewProductData({
                  ...newProductData,
                  desc: e.target.value,
                })
              }
            />
          </div>
          <div className="form-group mt-3">
            <label htmlFor="price">Price</label>
            <input
              type="number"
              className="form-control"
              id="price"
              value={newProductData.price}
              onChange={(e) =>
                setNewProductData({
                  ...newProductData,
                  price: e.target.value,
                })
              }
            />
          </div>
          <div className="form-group mt-3">
            <label htmlFor="stock">Stock</label>
            <input
              type="number"
              className="form-control"
              id="stock"
              value={newProductData.stock}
              onChange={(e) =>
                setNewProductData({
                  ...newProductData,
                  stock: Number(e.target.value),
                })
              }
            />
          </div>
          <button
            type="button"
            className="btn btn-secondary mt-5 me-2"
            onClick={handleCloseModal}
          >
            Close
          </button>
          <button
            type="button"
            className="btn btn-primary mt-5"
            onClick={() => handleSaveProduct()}
          >
            Add Product
          </button>
        </Modal>
      </div>

      <Footer />
    </>
  );
};

export default DashboardAdmin;
