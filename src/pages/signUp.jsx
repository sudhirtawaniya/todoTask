import { useNavigate } from 'react-router-dom'
import '../assets/styles/style.css'
import axios from 'axios'
import { useState } from 'react'
export default function SignUp() {
    const navigate=useNavigate()
    const [data,setData]=useState()
    const [message, setmessage] = useState("");
    const handleInputChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
      };
    const handleLogin=()=>{
navigate("/")
    }
    const handleTodo=async()=>{
        const respons = await axios.post(
            "http://localhost:8000/register",
           data,
          );
         
          if(respons.data.success)
         { localStorage.setItem("login",true)
             navigate("/todo");}
          else{
              setmessage(respons.data.data)
          }
            }
    return <>
    <div className="main-box">
    {message!=""&&    <div className="messagebox"><p>{message}</p><div className="cancle-btn" onClick={()=>setmessage("")}>X</div></div>}
    <div className="container">
        <div className="heading">
            Sign Up
        </div>
       <div className="input-container">
            
            <div className="input-box">
                <p>Full Name</p>
                <input type="text" name='fullName' onChange={handleInputChange} />
            </div>
            <div className="input-box">
                <p>Father Name</p>
                <input type="text" name='fatherName' onChange={handleInputChange}  />
            </div>
            <div className="input-box">
                <p>Email</p>
                <input type="text"name='email' onChange={handleInputChange}  />
            </div>
            <div className="input-box">
                <p>Phone Number</p>
                <div className="twi">
                <input type="number" className='lf'name='pre' onChange={handleInputChange}  />
                <input type="number" className='rf'name='mobile' onChange={handleInputChange}  />
                </div>
            </div>
            <div className="input-box">
                <p>Password</p>
                <input type="password" name='password' onChange={handleInputChange} />
            </div>
            <div className="btn-con">
                <button type="button" onClick={handleTodo}className='login-btn'>Sign Up</button>
            </div>
            </div>
           <p className='red-sign' onClick={handleLogin}>Already a member? Login</p>
        </div>
    </div>
    </>
}