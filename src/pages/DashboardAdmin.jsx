import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import http from "../config/httpConfig";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import ProductPage from "../components/dashboard/product/ProductPage";
import { Menu } from "../components/dashboard/Menu";
import CustomerPage from "../components/dashboard/customer/CustomerPage";
Modal.setAppElement("#root");

const DashboardAdmin = () => {
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [content, setContent] = useState("products");

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
    fetchCustomers();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await http.get("/product");

      if (Array.isArray(response.data.data)) {
        setProducts(response.data.data);
      } else {
        console.log("Data is not array:" + response.data.data);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchCustomers = async () => {
    try {
      const response = await http.get("/customer");
      console.log(response);

      const customersData = response.data;

      if (customersData !== undefined) {
        if (Array.isArray(customersData)) {
          setCustomers(customersData);
        } else {
          console.log("Data is not array:", customersData);
        }
      } else {
        console.log("Data is undefined");
      }
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  const handleUpdateCustomer = (customerId) => {};

  const handleDeleteCustomer = async (customerId) => {
    try {
      await http.delete(`/customer/${customerId}`);
      setCustomers((prevCustomers) =>
        prevCustomers.filter((customer) => customer.id !== customerId)
      );
    } catch (error) {
      console.error("Error deleting customer:", error);
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

  const handleMenuClick = (menuItem) => {
    setContent(menuItem);
  };

  return (
    <>
      <Navbar />
      <div className="row">
        <div className="col-lg-3">
          {" "}
          <Menu handleMenuClick={handleMenuClick} />
        </div>
        {content === "products" && (
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
        )}
        {content === "customers" && (
          <CustomerPage
            customers={customers}
            handleDeleteCustomer={handleDeleteCustomer}
            handleUpdateCustomer={handleUpdateCustomer}
          />
        )}
      </div>

      <Footer />
    </>
  );
};

export default DashboardAdmin;
