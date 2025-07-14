import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../../../../Hooks/useAuth.hook";

export default function ProtectedRoot({children}:{children:ReactNode}) {
  const {token} = useAuth()
if(token){
  return children 
}else{
 return <Navigate to="/"/>
}


}
