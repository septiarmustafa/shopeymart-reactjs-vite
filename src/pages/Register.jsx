import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { BASE_URL } from "../config/baseUrl";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [mobilePhone, setMobilePhone] = useState("");
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [role, setRole] = useState("customer");

  const handleRegistration = async () => {
    const registerUrl =
      role === "admin"
        ? BASE_URL + "/api/auth/admin/register"
        : BASE_URL + "/api/auth/customer/register";

    const response = await axios.post(
      registerUrl,
      role !== "admin"
        ? { username, password, email, mobilePhone, address, name }
        : { username, password, mobilePhone, name },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    navigate("/login");
    console.log(response);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (role !== "admin") {
      if (
        !username ||
        !password ||
        !email ||
        !mobilePhone ||
        !address ||
        !name
      ) {
        swal({
          title: "All Field are required",
          text: "Please fill in all fields.",
          icon: "error",
          button: "OK",
        });
        return;
      }
    } else {
      if (!username || !password || !mobilePhone || !name) {
        swal({
          title: "All Field are required",
          text: "Please fill in all fields.",
          icon: "error",
          button: "OK",
        });
        return;
      }
    }

    try {
      setLoading(true);
      await handleRegistration();
      swal({
        title: "Registration Successful!",
        text: "You have successfully registered",
        icon: "success",
        showConfirmButton: false,
        timer: 2500,
      });
    } catch (error) {
      console.error("Error during registration:", error);
      const errorMessage =
        error.response?.data?.message ||
        "Failed to register. Please try again.";
      swal({
        title: "Registration Failed",
        text: errorMessage,
        icon: "error",
        button: "OK",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="container my-3 py-3">
        <h1 className="text-center">Register</h1>
        <hr />
        <div className="row my-4 h-100">
          <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
            <form method="post">
              <div className="my-3">
                <div className="my-3">
                  <label htmlFor="role">Role</label>
                  <select
                    className="form-control"
                    id="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value="customer">Customer</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
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
              <div className="my-3">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="my-3">
                <label htmlFor="phone">Mobile Phone</label>
                <input
                  type="text"
                  className="form-control"
                  id="phone"
                  value={mobilePhone}
                  onChange={(e) => setMobilePhone(e.target.value)}
                />
              </div>
              {role === "customer" && (
                <>
                  <div className="my-3">
                    <label htmlFor="email">Email</label>
                    <input
                      type="text"
                      className="form-control"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="my-3">
                    <label htmlFor="address">Address</label>
                    <input
                      type="text"
                      className="form-control"
                      id="address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                </>
              )}

              <div className="text-center">
                <button
                  className="my-2 mx-auto btn btn-dark"
                  type="submit"
                  onClick={handleSubmit}
                  formMethod="post"
                >
                  {loading ? "Loading..." : "Register"}
                </button>
              </div>
            </form>

            <div className="my-3 text-center">
              <p>
                Have an Account?{" "}
                <Link
                  to="/login"
                  className="text-decoration-underline text-info"
                >
                  Login
                </Link>{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
