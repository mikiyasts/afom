import "./App.css";
import logo from "./assets/Logo.png";
import Hero from "./Components/Hero";
import Navbar from "./Components/Navbar";
import About_us from "./Components/About_us";
import Collections from "./Components/Collections";
import Collections_Card from "./Components/Collections_Card";
import Blog from "./Components/Blog";
import Faq from "./Components/Faq";
import Footer from "./Components/Footer";
import Contact from "./Components/Contact";
import { Route, Routes } from "react-router-dom";
import BlogDetail from "./pages/BlogDetail";
import Fixed_bg from "./Components/Fixed_bg";
function Home() {
  return (
    <div className='Home'>
      <Hero />
      {/*about us*/}
      <About_us />
      {/* fixed bg */}
      <Fixed_bg/>
      {/* Collections */}
      <Collections />
      {/* {blog card} */}
      <Blog />
      {/*Faq*/}
      <Faq />
      {/* Contact us */}
      <Contact />
    </div>
  )
}

export default Home
