import { useContext } from "react";
import { AuthContext } from "../Context/Auth.context";
import {jwtDecode} from "jwt-decode"
import { DecodedToken } from "../Interfaces/Hooks.inferfaces";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function useAuth(){
   const navigate = useNavigate()
 const {token ,updateUserInformation ,getUserInformation,setToken} = useContext(AuthContext)!
 let decodedData;
 if(token){
    decodedData = jwtDecode<DecodedToken>(token);
 }
 
 const isUser = decodedData?.role === "user";


function logOut(){
    setToken(undefined)
    Cookies.remove("HOTELCOOKIE")
    navigate("/")
}



 return {isUser , token ,setToken,logOut ,updateUserInformation,getUserInformation}
}