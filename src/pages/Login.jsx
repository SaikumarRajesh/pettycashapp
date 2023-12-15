import { useState } from "react";
import { backendurl } from "../../config.js";

import { Navigate } from "react-router-dom";

function Login() {

  const initialFormData = {
    email: '',
    password: ''
  };



  const [formData, setFormData] = useState(initialFormData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };


  const handleUserLogin = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));

  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${backendurl}/user/userlogin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (response.status === 401) {
        alert("User not found , Please Register to login.");
      }
      else {
        alert("Login successfull")
        handleUserLogin(data);

      }
    } catch (error) {
      console.error('Error submitting data:', error);
    }
    setFormData(initialFormData);
  };

  if (localStorage.getItem('user') && JSON.parse(localStorage.getItem('user'))) {
    return <Navigate to={'/'} replace />;
  }

  return (

    <div>
      <div className='header'><h1>User Login</h1></div>
      <div className="box">
        <h1>user <i className="fa fa-user-circle" aria-hidden="true"></i></h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              placeholder="Enter Email"
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              placeholder='Enter password'
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit" >Login</button>
        </form>
        <br />
         <a href='/register'>Register</a> | <a href='/password'>Forget password</a> 
      </div>
    </div>
  );
}

export default Login;