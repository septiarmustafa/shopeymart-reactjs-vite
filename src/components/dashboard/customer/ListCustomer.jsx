import React from "react";

const ListCustomer = ({ customers, handleDeleteCustomer }) => {
  return (
    <>
      <div className="container my-3">
        <h2 className="text-left mb-4">List Customer</h2>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">No</th>
              <th scope="col">Customer Name</th>
              <th scope="col">Email</th>
              <th scope="col">Mobile Phone</th>
              <th scope="col">Address</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers &&
              customers.map((customer, index) => (
                <tr key={customer.id}>
                  <th scope="row">{index + 1}</th>
                  <td>{customer.name}</td>
                  <td>{customer.email}</td>
                  <td>{customer.mobilePhone}</td>
                  <td>{customer.address}</td>
                  <td>
                    {/* <button
                      className="btn btn-primary btn-sm mr-2 me-2"
                      onClick={() => handleUpdateCustomer(customer.id)}
                    >
                      Update
                    </button> */}
                    <button
                      className="btn btn-danger btn-sm mr-2 me-2"
                      onClick={() => handleDeleteCustomer(customer.id)}
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

export default ListCustomer;
