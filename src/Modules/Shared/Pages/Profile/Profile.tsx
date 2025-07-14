import { useEffect } from "react"
import useAuth from "../../../../Hooks/useAuth.hook"
import { useNavigate } from "react-router-dom"

export default function Profile() {
const{token} = useAuth()
const navigate = useNavigate()

useEffect(()=>{
if(!token){
  navigate("/")
return ;

}

},[token , navigate])




  return (
    <div>
      Profile
    </div>
  )
}
