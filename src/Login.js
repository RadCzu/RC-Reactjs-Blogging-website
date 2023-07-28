import { useState } from "react";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch, useSelector } from 'react-redux';

import Navbar from "./Navbar";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginFail, setLoginFail] = useState(false);

  const history = useHistory();
  const dispatch = useDispatch();

  const serverUrl = useSelector((state => state.serverUrl));

  const handleLogin = async (e) => {
    e.preventDefault(); // stop from submission

    try {
      const response = await fetch(`${serverUrl}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
  
      if (response.ok) {
        const data = await response.json();
        const id = data.id;
        setUsername(data.user);
        setPassword("");
        dispatch({ type: 'LOGIN', payload: {userName: username, userId: id } });
        console.log(`logged in as ${username} with id: ${id}`);
        history.push("/");
      } else {
        console.log("Login failed");
        setLoginFail(true);
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }

  }

  const handleLogout = () => {
    setUsername('');
    setPassword('');
  };
  
  return ( 
  <div className = "login">
      {loginFail && <p className = "login-fail">Incorrect username or password</p>}
      <form onSubmit = {handleLogin}>
        <label>Login</label>
        <input
        type = "text" 
        required
        value = {username}
        onChange={(e) => setUsername(e.target.value)}>
        </input>
        <label>
          Password
        </label>
        <input 
        required
        value = {password}
        onChange={(e) => setPassword(e.target.value)}> 
        </input>
        <button>Login</button>
        <p>Don't have an account? - <Link to = "/new-account">Sign up!</Link></p>

      </form>
    </div> 
   );
}
 
export default Login;