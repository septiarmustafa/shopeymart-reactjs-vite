import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [mobilePhone, setMobilePhone] = useState("");
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const baseUrl = "http://localhost:8081/api/auth/customer/register";
  const navigate = useNavigate();

  const handleRegistration = async () => {
    const response = await axios.post(baseUrl, {
      username,
      password,
      email,
      mobilePhone,
      address,
      name,
    });
    navigate("/");
    console.log(response);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

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
      swal({
        title: "Registration Failed",
        text: "Failed to register. Please try again.",
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
              {/* {error && <p className="text-danger">{error}</p>} */}
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
                <label htmlFor="phone">Mobile Phone</label>
                <input
                  type="text"
                  className="form-control"
                  id="phone"
                  value={mobilePhone}
                  onChange={(e) => setMobilePhone(e.target.value)}
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
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
