import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useContext, createContext, useState, useEffect } from "react";
import { auth, database } from "../Firebase";
import { useNavigate } from "react-router-dom";
import { StoreUser } from "../Config/StoreData";
import {  get, ref } from "firebase/database";
import { toast } from "react-toastify";

const userContext = createContext();

export function useUserRecord() {
  return useContext(userContext);
}

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const[blogs, setBlogs] =useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("token");
    if (auth) {
      setToken(JSON.parse(auth));
    }
  }, []);

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", JSON.stringify(token));
    }
  }, [token]);

  const login = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        const { user } = res;
        setToken(user.uid);
        if (user.uid) {
          loadUserData(user.uid);
          navigate("/");
          toast("Login Successful", { type: "success" });
        }
      })
      .catch((error) => {
        toast(error.message, { type: "error" });
      });
  };

  const register =  (email, password, name) => {
     createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        const { user } = res;
        setToken(user.uid);
         StoreUser(user.uid, name, user.email);
        setUser({ username: name, email: user.email });
        navigate("/");
        toast("Registration Successful", { type: "success" });
      })
      .catch((error) => {
        toast(error.message, { type: "error" });
      });
  };

  const logout = () => {
    setToken(null);
    localStorage.clear();
    toast("You have been logged out!", { type: "error" });
  };

  useEffect(() => {
    if (token ) {
        // StoreUser(token, user.username, user.email);
      loadUserData(token);
    }
  }, [token]);


async function loadUserData (uid) {
    const dataRef = ref(database, `/users/${uid}`);
    await get(dataRef)
      .then((snapshot) => {
        setUser(snapshot.val());
      })
      .catch((error) => {
        toast(error.message, { type: "error" });
      });
  };
// function loader () {
//     return (
//         <div>
//             {isLoading && (
//                 <div className="spinner-border" role="status">
//                 <span className="visually-hidden">Loading...</span>
//               </div>
//             )}
//         </div>
//     )
// }

async function displayBlog () {
const dataRef = ref(database, '/blogs');
await get(dataRef)
.then((snapshot)=> {
const data = snapshot.val();
setBlogs(Object.entries(data))
})
.catch((error) => {
    console.log(error)
    toast(error.message, { type: "error" }); 
})
}

useEffect(()=> {
    displayBlog();
},[token])
  const value = {
    login,
    register,
    user,
    token,
    //isLoading,
    logout,
    setUser,
    blogs, 
    displayBlog
    //loader
  };

  return (
    <userContext.Provider value={value}>{children}</userContext.Provider>
  );
}
