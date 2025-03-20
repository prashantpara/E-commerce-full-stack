import React from "react";
// import { a } from 'react-router-dom'
// import "../App.css"

const Navbar = () => {
  return (
    <>
      <nav className=" navbar bg-secondary-subtle navbar-expand-sm " id="navbar">
        <div className="container-fluid">
          <a className="navbar-brand me-5" href="#" id="navlogo">
            <img src="https://static.vecteezy.com/system/resources/previews/006/547/178/original/creative-modern-abstract-ecommerce-logo-design-colorful-gradient-online-shopping-bag-logo-design-template-free-vector.jpg" style={{height:"45px", borderRadius:"50%"}}/>
          </a>
          <button
            className="navbar-toggler ms-auto"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mybtn"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse text-center fs-5" id="mybtn">
            <ul
              className="navbar-nav ms-5"
              style={{ display: "flex", gap: "30%" }}
            >
              <li className="nav-item">
                <a className="nav-link" href="">
                  Home
                </a>
              </li>

              <li className="nav-item">
                <a className="nav-link" href="">
                  Products
                </a>
              </li>

              <select
                className="nav-item text-center"
                style={{ backgroundColor: "transparent", border: "none" }}
              >
                <option>Category</option>
                <option></option>
                <option></option>
                <option></option>
              </select>
              <li className="nav-item">
                <a className="nav-link" href="practiceQuestion">
                  Contact
                </a>
              </li>
              
            </ul>
            <ul className="navbar-nav ms-auto">
              <button type="button" class="btn btn-outline-secondary fs-5">
                Logout
              </button>
              <li className="nav-item">
                <a className="nav-link mx-2" href="">
                  <i className="fa-solid fa-cart-shopping" />
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="">
                  <i class="fa-solid fa-user"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;