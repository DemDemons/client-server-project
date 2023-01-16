
import React from 'react';
import './App.css';
import Login from './component/login.js';
import { Routes, Route } from "react-router-dom"
import UserInfo from "./component/userInfo.js";
import { UserNameProvider } from './component/context/userName';
import Register from './component/register.js';

function App() {

  return (
    <UserNameProvider>
       <Routes>
         <Route path="/" element={<Login />} />
         <Route path="/userInfo" element={<UserInfo />} />
         <Route path="/register" element={<Register />} />

       </Routes>
    </UserNameProvider>


  );
}

export default App;
