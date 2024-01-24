export const Menu = () => {
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
