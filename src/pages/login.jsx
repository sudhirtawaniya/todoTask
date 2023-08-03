import { useNavigate } from "react-router-dom";
import "../assets/styles/style.css";
import { useState } from "react";
import axios from "axios";
export default function Login() {
  const navigate = useNavigate();
  const [message, setmessage] = useState("");
  const [data, setData] = useState({ username: "", password: "" });
  const handleSignUp = () => {
    navigate("/signup");
  };
  const handleTodo = async () => {
    const respons = await axios.post(
      "http://localhost:8000/login",
     data,
    );
    console.log(respons);
    if(respons.data.success)
   {
    localStorage.setItem("login",true)
    navigate("/todo");}
    else{
       
        setmessage(respons.data.data)
    }
  };
  const handleInputChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  return (
    <>
      <div className="main-box">
    {message!=""&&    <div className="messagebox"><p>{message}</p><div className="cancle-btn" onClick={()=>setmessage("")}>X</div></div>}
        <div className="container">
          <div className="heading">Login</div>
          <div className="input-container">
            <div className="input-box">
              <p>Email/Mobile</p>
              <input type="text" name="username" onChange={handleInputChange} />
            </div>
            <div className="input-box">
              <p>Password</p>
              <input type="text" name="password" onChange={handleInputChange} />
            </div>
            <div className="btn-con">
              <button type="button" onClick={handleTodo} className="login-btn">
                Login
              </button>
            </div>
          </div>
          <p className="red-sign" onClick={handleSignUp}>
            Not a member? SignUp
          </p>
        </div>
      </div>
    </>
  );
}
