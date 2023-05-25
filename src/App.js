
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from "./components/Header";
import { UserContextProvider } from "./context/context";
import Sign from "./pages/Sign";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Landing";
import UserBlogs from "./pages/MyBlogs";
import AddBlog from "./pages/AddBlog";
import ViewBlog from "./pages/ViewBlog";
import Footer from "./components/Footer";
import { Container } from "reactstrap";
import AuthPvtRoute from "./Routes/PrivateRoute";
const App = () =>
{
return(
  <Container fluid className="px-0">
 <ToastContainer position="top-right"/>
    <UserContextProvider>
      <div className="bg-theme pb-3">
      <Header/>
<Routes>
     <Route path="/" element={<Home/>}/>
      <Route path="/auth" element={<Sign/>}/>

      <Route path="/my-blogs" element= {<AuthPvtRoute>
        <UserBlogs/>
      </AuthPvtRoute>}/>
      <Route path="/add-blog" element={<AuthPvtRoute>
        <AddBlog/>
      </AuthPvtRoute>}/>
      <Route path="/blog-details/:blogid" element={<ViewBlog/>}/>
      
     </Routes>
      </div>

     <Footer/>
    </UserContextProvider>
  </Container>
)
}
export default App;