import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import http from "../config/httpConfig";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import ProductPage from "../components/dashboard/product/ProductPage";
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

  return (
    <>
      <Navbar />
      <ProductPage
        products={products}
        handleDelete={handleDelete}
        handleUpdate={handleUpdate}
        handleViewDetail={handleViewDetail}
        setShowUpdateModal={setShowUpdateModal}
        handleAddProduct={handleAddProduct}
        showUpdateModal={showUpdateModal}
        handleCloseModal={handleCloseModal}
        updatedProductData={updatedProductData}
        setUpdatedProductData={setUpdatedProductData}
        handleSaveUpdate={handleSaveUpdate}
        showAddModal={showAddModal}
        newProductData={newProductData}
        setNewProductData={setNewProductData}
        handleSaveProduct={handleSaveProduct}
      />
      <Footer />
    </>
  );
};

export default DashboardAdmin;
