import { useEffect, useState } from "react";
import "../assets/styles/style.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";



export default function TodoList() {
  const navigate=useNavigate()
 
    const Day=["Mon","Tue","Wed","Thur","Fri","Sat","Sun"]
    const [message, setmessage] = useState("");
    const [model, setmodel] = useState(false);
    const [edit_data,seteditData]=useState({content:"",id:''})
const[newData,setNewData]=useState("")

  let [data,setData]=useState([])
  let [api_data,api_setData]=useState([])
  const loadData=async()=>{
    const respons = await axios.get(
      "http://localhost:8000/todo",
   
    );
   
    if(respons.data.success)
    
  { setData(respons.data.data.reverse())
    api_setData(respons.data.data)
  }
    else{
        setmessage(respons.data.data)
    }
}

  
  useEffect(()=>{loadData()},[])
  const handleAdd=async()=>{
    if(newData==""){
        alert("Please Add somthing")
        return;
    }
    else{
        const newObj={
           content:newData,createdAt:Day[new Date().getDay()-1]+" "+new Date().getDate()+" "+" "+new Date().getFullYear()
        }
        const respons = await axios.post(
          "http://localhost:8000/todo",
         newObj,
        );
       
        if(respons.data.success)
       { setmessage("Data Added...")
      loadData()
      }
        else{
            setmessage(respons.data.data)
        }
    }
  }
  if( !localStorage.getItem("login")){
    navigate("/")
    return null
  }
  const handleDelete=async(id)=>{
    const respons = await axios.delete(
      "http://localhost:8000/todo/"+id
   
    );
   

        setmessage(respons.data.data)
    loadData()
 
  }
  const handleSearch=(e)=>{
const fillter=api_data.filter((Item)=>{return Item.content.includes(e.target.value)})
setData(fillter)
  }
  const handleEdit=(id)=>{
    const edit=api_data.filter((Item)=>{return Item._id==id})[0]
    seteditData({content:edit.content,createdAt:edit.createdAt,id:id})
    setmodel(true)
  }
  const handleEditData=async()=>{

   if(edit_data.content==""){
    setmessage("Please Add somthing")
    return;
   }
   const respons = await axios.patch(
    "http://localhost:8000/todo/"+edit_data.id,edit_data
 
  );
 

      setmessage(respons.data.data)
  loadData()
  }
  return (
    <>
   {model&& <div className="modal">


<div className="modal-content">
  <span className="close" onClick={()=>setmodel(false)}>&times;</span>
  <div className="container" style={{border:"none"}}>
          <div className="heading">Edit ToDo List</div>
          <div className="input-container">
            <div className="input-box">
              <p>Content</p>
              <input type="text" name="content" value={edit_data.content} onChange={(e)=>seteditData({...edit_data,content:e.target.value})} />
            </div>
           
            <div className="btn-con">
              <button type="button" className="login-btn" onClick={handleEditData}>
                Update
              </button>
            </div>
          </div>
         
        </div>
      </div>

</div>}
      <div className="todoContainer">
      {message!=""&&    <div className="messagebox"><p>{message}</p><div className="cancle-btn" onClick={()=>setmessage("")}>X</div></div>}
        <div className="todo-heading">
          <svg
            width="72"
            height="72"
            viewBox="0 0 72 72"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="72" height="72" rx="5" fill="#2ECA34" />
            <mask
              id="mask0_614_63"
              maskUnits="userSpaceOnUse"
              x="10"
              y="6"
              width="56"
              height="56"
            >
              <rect x="10" y="6" width="56" height="56" fill="#D9D9D9" />
            </mask>
            <g mask="url(#mask0_614_63)">
              <path
                d="M32.2833 48L18.9833 34.7L22.3083 31.375L32.2833 41.35L53.6917 19.9417L57.0167 23.2667L32.2833 48Z"
                fill="white"
              />
            </g>
          </svg>
          &nbsp; To Do’s
        </div>
        <div className="search">
          <input type="search" onChange={handleSearch} placeholder="Search" className="ser-inp" />
        </div>

        <div className="todo">
          {data.map((ele, i) => {
            return (
              <div className="coat" key={i}>
                <div className="todo-box">
                  <div className="content">
                    {ele.content}
                    <p>{ele.createdAt}</p>
                  </div>
                </div>

                <div className="action">
                  <svg
                  onClick={()=>handleDelete(ele._id)}
                    width="40px"
                    height="40px"
                    viewBox="0 0 1024 1024"
                    fill="#8171E6"
                    class="icon"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M512 897.6c-108 0-209.6-42.4-285.6-118.4-76-76-118.4-177.6-118.4-285.6 0-108 42.4-209.6 118.4-285.6 76-76 177.6-118.4 285.6-118.4 108 0 209.6 42.4 285.6 118.4 157.6 157.6 157.6 413.6 0 571.2-76 76-177.6 118.4-285.6 118.4z m0-760c-95.2 0-184.8 36.8-252 104-67.2 67.2-104 156.8-104 252s36.8 184.8 104 252c67.2 67.2 156.8 104 252 104 95.2 0 184.8-36.8 252-104 139.2-139.2 139.2-364.8 0-504-67.2-67.2-156.8-104-252-104z"
                      fill=""
                    />
                    <path
                      d="M707.872 329.392L348.096 689.16l-31.68-31.68 359.776-359.768z"
                      fill=""
                    />
                    <path d="M328 340.8l32-31.2 348 348-32 32z" fill="" />
                  </svg>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <svg
                   onClick={()=>handleEdit(ele._id)}
                    width="30px"
                    height="30px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M21.2799 6.40005L11.7399 15.94C10.7899 16.89 7.96987 17.33 7.33987 16.7C6.70987 16.07 7.13987 13.25 8.08987 12.3L17.6399 2.75002C17.8754 2.49308 18.1605 2.28654 18.4781 2.14284C18.7956 1.99914 19.139 1.92124 19.4875 1.9139C19.8359 1.90657 20.1823 1.96991 20.5056 2.10012C20.8289 2.23033 21.1225 2.42473 21.3686 2.67153C21.6147 2.91833 21.8083 3.21243 21.9376 3.53609C22.0669 3.85976 22.1294 4.20626 22.1211 4.55471C22.1128 4.90316 22.0339 5.24635 21.8894 5.5635C21.7448 5.88065 21.5375 6.16524 21.2799 6.40005V6.40005Z"
                      stroke="#8171E6"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M11 4H6C4.93913 4 3.92178 4.42142 3.17163 5.17157C2.42149 5.92172 2 6.93913 2 8V18C2 19.0609 2.42149 20.0783 3.17163 20.8284C3.92178 21.5786 4.93913 22 6 22H17C19.21 22 20 20.2 20 18V13"
                      stroke="#8171E6"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
              </div>
            );
          })}
        </div>
        <div className="search">
          <input type="text" placeholder="Add Item" onChange={(e)=>setNewData(e.target.value)} className="add" />
          <button className="btn-add" onClick={handleAdd}>+</button>
        </div>
      </div>
    </>
  );
}
