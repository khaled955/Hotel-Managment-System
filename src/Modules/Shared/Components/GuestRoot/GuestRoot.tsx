import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../../../../Hooks/useAuth.hook";
export default function GuestRoot({children}:{children:ReactNode}) {
const{token,isUser} = useAuth()
 if(!token){
  return children 
}else{
  // check if admin navigate to dashboard  if user navigate to home
if(isUser){
   return <Navigate to="/"/>

}else{
   return <Navigate to="/dashboard"/>

}


}

}
