
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
const App = () =>
{
return(
  <div className="bg-theme">
    <ToastContainer position="top-left"/>
    <UserContextProvider>
<Header/>
<Routes>
     <Route path="/" element={<Home/>}/>
      <Route path="/auth" element={<Sign/>}/>
      <Route path="/my-blogs" element= {<UserBlogs/>}/>
      <Route path="/add-blog" element={<AddBlog/>}/>
      
     </Routes>
    </UserContextProvider>

  </div>
  
)
}
export default App;