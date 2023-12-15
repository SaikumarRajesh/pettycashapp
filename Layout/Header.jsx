import "./Header.css"
import { useNavigate } from "react-router-dom";
import  { useEffect, useState } from 'react';



function Header (){
    
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');

    useEffect(() => {
        const storedUser = localStorage.getItem('user'); 
        if (storedUser) {
          const userObj = JSON.parse(storedUser);
          if (userObj && userObj.Name) {
            setUserName(userObj.Name);
          }
        }
      }, []);
  

    return(
        <>
        <div className="Header">
        <div className="header__title">Mycash</div>
        <button className="header__logout" onClick={() => {
            localStorage.removeItem('user');
             navigate('/login')
          }}>Logout</button>
      </div>
         <div className="header-container">
         <h1 className="heading">Hi,{userName}</h1>
         <p className="header-content">
           Welcome back to your
           <span className="money-manager-text"> Money Manager</span>
         </p>
       </div>
       </>
    )
}

export default Header;