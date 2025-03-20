import React from "react";
const Signup = () => {
  return (
    <div className="login-page d-flex justify-content-center align-items-center 100-w vh-100 bg-primary">
      <div className="form-container bg-white p-5 rounded">
        <form>
          <h3 className="text-center">Sign Up</h3>

          <div className="mb-2">
            <label htmlFor="fname">fName</label>
            <input
              type="text"
              placeholder="Enter First Name"
              className="form-control"
              id="fname"
            />
          </div>

          <div className="mb-2">
            <label htmlFor="lname">lName</label>
            <input
              type="text"
              placeholder="Enter last Name"
              className="form-control"
              id="lname"
            />
          </div>

          <div className="mb-2">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Enter Your Email"
              className="form-control"
              id="email"
            />
          </div>

          <div className="mb-2">
            <label htmlFor="profilePic">Profile Pic</label>
            <input
              type="file"
              className="form-control"
              id="profilePic"
            />
          </div>

          <div className="mb-2">
            <label htmlFor="phoneNo">Phone No</label>
            <input
              type="tel"
              placeholder="Entem Your Phone No"
              className="form-control"
              id="phoneNo"
            />
          </div>

          <div className="mb-2">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Enter Your Password"
              className="form-control"
              id="password"
            />
          </div>

          <div className="mb-2">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              placeholder="Enter Your Address"
              className="form-control"
              id="address"
            />
          </div>

          <div className="d-grid">
            <button className="btn btn-primary ">Sign Up</button>
          </div>
          <p className="text-end mt-2">
            Already Registered<a href="#"> Sign In </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
