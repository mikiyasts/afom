import React from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import { Route, Routes } from "react-router-dom";
import Home from "../Home";
import BlogDetail from "./BlogDetail";
import CollectionDetail from "./CollectionDetail";
function Landingpage() {
  return <Home/>
}

export default Landingpage
