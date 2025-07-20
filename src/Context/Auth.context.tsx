import { createContext, ReactNode, useCallback, useMemo, useState } from "react";
import { AuthContextType } from "../Interfaces/Context.interfaces";
import { jwtDecode } from "jwt-decode";
import { DecodedToken } from "../Interfaces/Hooks.inferfaces";
import { isAxiosError } from "axios";
import { UserAxiosInstance } from "../Services/AxiosInstance";
import { AUTH_URLS } from "../Services/URLS";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { UserProfile } from "../Interfaces/Authentication.interfaces";

 // eslint-disable-next-line react-refresh/only-export-components
 export const AuthContext = createContext<AuthContextType | undefined>(undefined)

function AuthContextProvider({children}:{children:ReactNode}){
const [ token , setToken ] = useState< string | undefined>(()=> Cookies.get("HOTELCOOKIE"))

const [userInfo , setUserInfo] = useState<UserProfile | null>(null)


 
const userId = useMemo( function(){
    if(!token) return ;
    return jwtDecode<DecodedToken>(token)._id
},[token])

// function to get user information

 const getUserInformation = useCallback(  async function (){
    
    if(!userId) return ;
try {
    const {data} = await UserAxiosInstance(AUTH_URLS.GET_USER_PROFILE(userId))
    setUserInfo(data.data.user)
} catch (error) {
    if(isAxiosError(error))toast.error(error.response?.data.message || "Some Thing Go Wrong")
}


}

 ,[userId])





    return <AuthContext.Provider value={{token , setToken,getUserInformation , userInfo}}>
        {children}
    </AuthContext.Provider>
}

















export { AuthContextProvider }