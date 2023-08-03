import { Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import SignUp from "./pages/signUp";
import TodoList from "./pages/todolist";

export default function Router() {
    return <>
   <Routes>
    <Route element={<Login/>} path="/"/>
    <Route element={<SignUp/>} path="/signup"/>
    <Route element={<TodoList/>} path="/todo"/>
   </Routes>
    </>
}