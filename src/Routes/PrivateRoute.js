import { Navigate } from "react-router-dom";
import { useUserRecord } from "../context/context";



export default function AuthPvtRoute ({children}) {
  const {user} = useUserRecord();
    return user ? children : <Navigate to='/auth' />
}