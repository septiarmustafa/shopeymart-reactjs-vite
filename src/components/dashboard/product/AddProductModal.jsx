import React from "react";
import Modal from "react-modal";

export const AddProductModal = ({
  isOpen,
  onRequestClose,
  newProductData,
  setNewProductData,
  handleSaveProduct,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
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
        onClick={onRequestClose}
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
  );
};
