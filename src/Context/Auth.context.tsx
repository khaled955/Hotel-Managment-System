import { createContext, ReactNode, useCallback, useMemo, useState } from "react";
import { AuthContextType } from "../Interfaces/Context.interfaces";
import { jwtDecode } from "jwt-decode";
import { DecodedToken } from "../Interfaces/Hooks.inferfaces";
import { isAxiosError } from "axios";
import { UserAxiosInstance } from "../Services/AxiosInstance";
import { AUTH_URLS } from "../Services/URLS";
import Cookies from "js-cookie";

 // eslint-disable-next-line react-refresh/only-export-components
 export const AuthContext = createContext<AuthContextType | undefined>(undefined)

function AuthContextProvider({children}:{children:ReactNode}){
const [ token , setToken ] = useState< string | undefined>(()=> Cookies.get("HOTELCOOKIE"))

const [userInfo , setUserInfo] = useState()


 
const userId = useMemo( function(){
    if(!token) return ;
    return jwtDecode<DecodedToken>(token)._id
},[token])

// function to get user information
// toDo
 const getUserInformation = useCallback(  async function (){
    
    if(!userId) return ;
try {
    const {data} = await UserAxiosInstance(AUTH_URLS.GET_USER_PROFILE(userId))
 console.log(data)
} catch (error) {
    if(isAxiosError(error))
        console.log(error)
}


}

 ,[userId])

// function to update user information

// toDo

function updateUserInformation(){
    console.log("yes")
}




    return <AuthContext.Provider value={{token , setToken,getUserInformation,updateUserInformation}}>
        {children}
    </AuthContext.Provider>
}

















export { AuthContextProvider }