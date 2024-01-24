export const Menu = ({ handleMenuClick }) => {
  return (
    <>
      <div className="card m-4">
        <div className="card-body">
          <h4 className="card-title">Menu Dashboard</h4>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <a
                href="#"
                className="text-dark"
                onClick={() => handleMenuClick("products")}
              >
                Products
              </a>
            </li>
            <li
              className="list-group-item"
              onClick={() => handleMenuClick("customers")}
            >
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
