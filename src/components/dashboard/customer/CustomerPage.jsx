import React from "react";
import ListCustomer from "./ListCustomer";

const CustomerPage = ({
  customers,
  handleDeleteCustomer,
  handleUpdateCustomer,
}) => {
  return (
    <>
      <div className="col-lg-8">
        <ListCustomer
          customers={customers}
          handleDeleteCustomer={handleDeleteCustomer}
          handleUpdateCustomer={handleUpdateCustomer}
        />
      </div>
      <div className="m-2">
        {/* <UpdateProductModal
          isOpen={showUpdateModal}
          onRequestClose={handleCloseModal}
          updatedProductData={updatedProductData}
          setUpdatedProductData={setUpdatedProductData}
          handleSaveUpdate={handleSaveUpdate}
        /> */}
      </div>
      <div className="m-2">
        {/* <AddProductModal
          isOpen={showAddModal}
          onRequestClose={handleCloseModal}
          newProductData={newProductData}
          setNewProductData={setNewProductData}
          handleSaveProduct={handleSaveProduct}
        /> */}
      </div>
    </>
  );
};

export default CustomerPage;
