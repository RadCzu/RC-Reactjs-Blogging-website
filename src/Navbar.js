import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const Navbar = () => {

  const loggedIn = useSelector((state => state.isLoggedIn));
  const account = useSelector((state => state.userName));
  const index = useSelector((state => state.userId));

  const dispatch = useDispatch();
  
  function logOut () {
    dispatch({type: "LOGOUT"});
  }

  return (  
    <nav className = "navbar">
      <h1>      
        Blogging Website
      </h1>
      <div className = "links">
        <Link to = "/">Home </Link>
        <Link to = "/create" style = {{
          color: "white",
          backgroundColor: "#f1356d",
          borderRadius: "8px"
        }}>New Blog </Link>
        {!loggedIn && <Link to = "/login" style = {{
          color: "white",
          backgroundColor: "#f1356d",
          borderRadius: "8px"
        }}>Login</Link>}
        {loggedIn && <button onClick = {() => logOut()}>Logout</button>}
        {loggedIn && <Link to = { `/users/${index}`}>{account}</Link>}
        
      </div>
    </nav>
  );
}
 
export default Navbar;