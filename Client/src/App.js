import "./App.css";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import { Route, Routes } from "react-router-dom";
import BlogDetail from "./pages/BlogDetail";
import MoreBlog from "./pages/MoreBlog";
import MoreCollection from "./pages/MoreCollection";
import CollectionDetail from "./pages/CollectionDetail";
import Landingpage from "./pages/Landingpage";
import { FaArrowUp } from "react-icons/fa";
import { NavHashLink } from 'react-router-hash-link';
import { useEffect, useState } from "react";
import AdminAuth from "./pages/admin/AdminAuth";
import CollectionPost from "./pages/admin/CollectionPost";
import BlogPost from "./pages/admin/BlogPost";
import Notfound from "./pages/Notfound";
import Dashboard from "./pages/admin/Dashboard";
import Managepost from "./pages/admin/Managepost";
import Editcollection from "./pages/admin/Editcollection";
import EditBlog from "./pages/admin/EditBlog";
import Calendar from "./Components/Calendar";
import Appointment from "./pages/Appointment";
import MyAppointments from "./pages/admin/MyAppointments";
import Fitdate from "./pages/admin/Fitdate";
import { AdminContext } from "./Context/AuthContext";
import ProtectedRoute from "./Protected/ProtectedRoute";

function App() {


  const [isAuth, setIsAuth] = useState(false)
  let btnScrollToTop;

  const assign = () => {
    btnScrollToTop = document.getElementById('scrolltotop');
  };

  useEffect(() => {
    assign();
  }, []);

  window.addEventListener('scroll', (e) => {
    if (btnScrollToTop) {
      btnScrollToTop.style.display = window.scrollY > 706.56 ? 'flex' : 'none';
    }
  });

  return (
    <div className="App">
      <AdminContext.Provider value={{ isAuth, setIsAuth }}>
        <Navbar />
        {/* hero */}
        <Routes>
          <Route index element={<Landingpage />} />
          <Route path="/adminauth" element={<AdminAuth />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/postcollection" element={<CollectionPost />} />
            <Route path="/postblog" element={<BlogPost />} />
            <Route path="/myappointments" element={<MyAppointments />} />
            <Route path="/fitdate" element={<Fitdate />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/managepost/editcollection/:id" element={<Editcollection />} />
            <Route path="/managepost/editblog/:id" element={<EditBlog />} />
            <Route path="/managepost" element={<Managepost />} />
          </Route>

          <Route path="/appointment" element={<Appointment />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/collections/:id" element={<CollectionDetail />} />
          <Route path="/blogs/:id" element={<BlogDetail />} />
          <Route path="/moreblogs" element={<MoreBlog />} />
          <Route path="/morecollections" element={<MoreCollection />} />
          <Route path="/test/:id" element={<Landingpage />} />
          <Route path="*" element={<Notfound />} />
        </Routes>
        <NavHashLink to="/#Home">
          <div className="backtotop" id="scrolltotop">
            <FaArrowUp style={{ fontSize: "20px" }} />
          </div>
        </NavHashLink>
        <Footer />
      </AdminContext.Provider>
    </div>

  );
}

export default App;