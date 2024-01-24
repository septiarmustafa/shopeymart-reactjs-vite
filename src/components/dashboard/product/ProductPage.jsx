import React from "react";
import { ListProduct } from "./ListProduct";
import { Menu } from "../Menu";
import { UpdateProductModal } from "./UpdateProductModal";
import { AddProductModal } from "./AddProductModal";

const ProductPage = ({
  products,
  handleDelete,
  handleUpdate,
  handleViewDetail,
  setShowUpdateModal,
  handleAddProduct,
  showUpdateModal,
  handleCloseModal,
  updatedProductData,
  setUpdatedProductData,
  handleSaveUpdate,
  showAddModal,
  newProductData,
  setNewProductData,
  handleSaveProduct,
}) => {
  return (
    <>
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
            handleAddProduct={handleAddProduct}
          />
        </div>
      </div>
      <div className="m-2">
        <UpdateProductModal
          isOpen={showUpdateModal}
          onRequestClose={handleCloseModal}
          updatedProductData={updatedProductData}
          setUpdatedProductData={setUpdatedProductData}
          handleSaveUpdate={handleSaveUpdate}
        />
      </div>

      <div className="m-2">
        <AddProductModal
          isOpen={showAddModal}
          onRequestClose={handleCloseModal}
          newProductData={newProductData}
          setNewProductData={setNewProductData}
          handleSaveProduct={handleSaveProduct}
        />
      </div>
    </>
  );
};

export default ProductPage;
