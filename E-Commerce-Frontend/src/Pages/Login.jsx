import React from 'react'

const Login = () => {
    return (
        <div className="login-page d-flex justify-content-center align-items-center 100-w vh-100 bg-primary">
          <div className="form-container bg-white p-5 rounded">
            <form>
              <h3 className="text-center">Login In</h3>
              <div className="mb-2 ">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  placeholder="Enter Email"
                  className="form-control"
                  id="email"
                />
              </div>
              <div className="mb-2 ">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  placeholder="Enter password"
                  className="form-control"
                  id="password"
                />
              </div>
              <div className="d-grid">
                {
                  <button type="submit" className="btn btn-primary ">
                    Sign In
                  </button>
                }
              </div>
              <p className="text-end mt-2">
                <a href="/signup">Register </a>
                before Signing In
              </p>
            </form>
          </div>
        </div>
      );
}

export default Login
