import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../Utils";

const Home = () => {
  const [loggedInUser, setLoggedInUser] = useState("");
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("loggedInUser"); // ✅ spelling corrected
    setLoggedInUser(user);
  }, []);

  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    handleSuccess("User Logged Out");

    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  const fetchProduct = async () => {
    try {
      const url = "http://localhost:8080/products";
      const headers = {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      };
      const response = await fetch(url, headers);
      const result = await response.json();
      setProducts(result);
      console.log(result);
    } catch (err) {
      handleError(err);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <div>
      <h1>Welcome, {loggedInUser || "Guest"}!</h1>
      <button type="button" onClick={handleLogOut}>
        Logout
      </button>

      <div>
        {products.length === 0 ? (
          <p>Loading products...</p>
        ) : (
          products.map((item, index) => (
            <ul key={index}>
              <li>
                <span>{item.name} : {item.price}</span>
              </li>
            </ul>
          ))
        )}
      </div>

      <ToastContainer />
    </div>
  );
};

export default Home;
