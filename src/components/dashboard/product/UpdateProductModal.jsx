import React from "react";
import Modal from "react-modal";

export const UpdateProductModal = ({
  isOpen,
  onRequestClose,
  updatedProductData,
  setUpdatedProductData,
  handleSaveUpdate,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
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
        onClick={onRequestClose}
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
  );
};
