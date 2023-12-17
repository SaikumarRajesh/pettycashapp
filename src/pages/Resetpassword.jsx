
import { useState} from 'react';

import { backendurl } from '../../config.js';

function Password() {

  const initialFormData = {
    email:"",
    newpassword: '',
    confirmpassword: ''
  }
  const [formData, setFormData] = useState(initialFormData);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { newpassword, confirmpassword, email } = formData;

      if (newpassword === confirmpassword) {
        const response = await fetch(`${backendurl}/user/password`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            newpassword,
            confirmpassword,
             email
          })
        });
       alert('password changed successfully')
       setFormData(initialFormData)
        const data = await response.json();
        console.log(data); 
      } else {
       alert('Passwords do not match');
      }
    } catch (err) {
      console.error('Error occurred while changing password:', err);
    }
  };
  
  return (
    <div>
      <div className='header'> <h1><b>Mycash</b></h1></div>
    <div className="box">
      <h1>Set password <i className="fa fa-unlock-alt" aria-hidden="true"></i></h1>
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
          <label htmlFor="newpassword">New Password</label>
          <input
            placeholder="Enter password"
            type="password"
            id="newpassword"
            name="newpassword"
            value={formData.newpassword}
            onChange={handleInputChange}
            required
          />
          <label htmlFor="confirmpassword">Confirm Password</label>
          <input
            placeholder="Confirm password"
            type="password"
            id="confirmpassword"
            name="confirmpassword"
            value={formData.confirmpassword}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      <br/>
        <a href='/'>If Passsword changed, Go to loginpage!</a>
    </div>
    </div>
  )
}

export default Password;