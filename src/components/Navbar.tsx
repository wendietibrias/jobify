import React, { useState,useEffect } from 'react';
import { HiMenuAlt1 } from 'react-icons/hi';
import { FaUserCircle } from "react-icons/fa";
import { AiOutlineLogout } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import APIAuth from '../api/APIAuth';
import axios from 'axios';
import useAuthStore from '../store/useAuthStore';

const Navbar = () => {
  const { token,removeToken,name } : any = useAuthStore();

  const [openDropdown,setOpendropdown] = useState<boolean>(false);

  const navigate = useNavigate(); 
   
  const logoutHandler = async () => {
      try {
        const { data } = await axios.delete('http://localhost:8080/api/auth/logout', {
           headers: {
              Authorization:`Bearer ${token}`
           }
        });

        if(data && data.statusCode === 200) {
            removeToken();
            localStorage.setItem("jobify_token" , JSON.stringify(null));
            setOpendropdown(false);
            navigate("/auth/login");
        } 

      } catch(err) {
         return err;
      }
  }

  useEffect(() => {
  },[])

  return (
    <nav className='navbar'>
        <button className="burger-menu">
            <HiMenuAlt1/>
        </button>
        <h4>Dashboard</h4>
        <button onClick={() => setOpendropdown(!openDropdown)} className="dropdown-user-button">
            <FaUserCircle/>
            <span>{name}</span>
        </button>

        {openDropdown && (
           <div className='dropdown'>
              <button onClick={logoutHandler}>
                <AiOutlineLogout/>
                <span>Logout</span>
              </button>
           </div>
        )}
    </nav>
  )
}

export default Navbar