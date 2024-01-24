export const ListProduct = ({
  products,
  handleDelete,
  handleUpdate,
  handleViewDetail,
  handleAddProduct,
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
