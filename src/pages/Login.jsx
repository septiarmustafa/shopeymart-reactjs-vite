import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../config/baseUrl";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await axios.post(
        BASE_URL + "/api/auth/login",
        {
          username,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log(response);
      if (response.data.status == 200) {
        localStorage.setItem("token", response.data.data.token);
        localStorage.setItem("role", response.data.data.role);
        navigate("/");
      } else {
        setError("Invalid username or password. Please try again.");
      }
    } catch (error) {
      setError("Invalid username or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container my-3 py-3">
      <h1 className="text-center">Login</h1>
      <hr />
      <div className="row my-4 h-100">
        <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
          <form method="post">
            <div className="my-3">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                className="form-control"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="my-3">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && <p className="text-danger">{error}</p>}
            <div className="my-3">
              <p>
                Don't Have an Account?{" "}
                <Link
                  to="/register"
                  className="text-decoration-underline text-info"
                >
                  Register
                </Link>{" "}
              </p>
            </div>
            <div className="text-center">
              <button
                className="my-2 mx-auto btn btn-dark"
                type="submit"
                onClick={handleLogin}
                formMethod="post"
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
