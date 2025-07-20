import { Alert, Box, Button, IconButton, TextField, Typography } from "@mui/material";
import { isAxiosError } from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { CREATE_ROOM_COMMENT, DELETE_COMMENT, GET_ROOM_COMMENTS, UPDATE_COMMENT } from "../../../../Services/URLS";
import { UserAxiosInstance } from "../../../../Services/AxiosInstance";
import { Comment } from "../../../../Interfaces/Comments.interfaces";
import useAuth from "../../../../Hooks/useAuth.hook";
import { jwtDecode } from "jwt-decode";
import { DecodedToken } from "../../../../Interfaces/Hooks.inferfaces";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';






export default function Cooments({roomId}:{roomId:string}) {
const [errorMessage , setErrorMessage] = useState(null)
const [userComment , setUserComment] = useState<Comment[]| []>([])
const [isLoading , setIsLoading] = useState(false)
const [submiteFormText , setSubmiteFormText] = useState("Comment")
const[commentId , setCommentId] = useState<string | null>(null)
const {register , handleSubmit,setValue ,formState:{errors,isSubmitting}} = useForm<{comment:string}>({mode:"onChange"})
const{token}= useAuth()





// fetch user Comment


const fetchUserComment = useCallback( async function(){
  if(!roomId) return ;


try {
    const {data} = await UserAxiosInstance.get(GET_ROOM_COMMENTS(roomId))
    if(data.success){
        setUserComment(data.data.roomComments)
    }
} catch (error) {
    if(isAxiosError(error))toast.error(error.response?.data.message || "Some thing Go Wrong !")
}




},[roomId])





const handleCreateComment = useCallback( async function(dataInfo:{comment:string}){

const toastId = toast.loading("Waiting.....")
try {
      setIsLoading(true)

const options = {
    url:CREATE_ROOM_COMMENT,
    method:"POST",
    data:{
roomId,
comment:dataInfo.comment
    }
}

const {data} = await UserAxiosInstance.request(options)
 toast.success(data.message || "Comment Created Successfully")
 fetchUserComment()
 setValue("comment","")
 setErrorMessage(null)
} catch (error) {
      setIsLoading(true)
    if(isAxiosError(error)){
        toast.error(error.response?.data.message || "Some thing Go Wrong !")
        setErrorMessage(error.response?.data.message || "Some thing Go Wrong !")
    }
}finally{
    toast.dismiss(toastId)
    setIsLoading(false)
}


},[roomId , fetchUserComment,setValue])



useEffect(()=>{
    fetchUserComment()
},[fetchUserComment])






const handleDeleteComment = useCallback( async function(commentId:string){
    if(!roomId) return;
    const toastId = toast.loading("Waiting")

    try {
        const options = {
            url:DELETE_COMMENT(commentId),
            method:"DELETE",
            data:{
                roomId,
            }
        }
        const{data} = await UserAxiosInstance.request(options)
        if(data.success){
            toast.success(data.message || "Comment Deleted Successfully")
            fetchUserComment()
        }


    } catch (error) {
         if(isAxiosError(error))toast.error(error.response?.data.message || "Some Thing Go Wrong")
    }finally{
        toast.dismiss(toastId)
    }





},[roomId,fetchUserComment])





const userCommentForRoom = useMemo( function(){
if(token){

    const userInfo = jwtDecode<DecodedToken>(token)
    return  userComment.filter((comment:Comment) => comment.user._id === userInfo._id)
}


},[token,userComment])
   





const handleUpdateComment = useCallback(async function(dataInfo:{comment:string},commentId:string){

const toastId = toast.loading("Updating Comment...")

try {
    
const options = {
    url:UPDATE_COMMENT(commentId),
    method: 'PATCH',
    data:{
    comment:dataInfo.comment
    }
}

const {data} = await UserAxiosInstance.request(options)
if(data.success){
    toast.success( data.message ||"Comment Updated Successfully")
    fetchUserComment()
    setCommentId(null)
    setSubmiteFormText("Comment")
    setValue("comment","")
}
} catch (error) {
    if(isAxiosError(error))toast.error(error.response?.data.message || "Some Thing Go Wrong")
}finally{
    toast.dismiss(toastId)
}

},[fetchUserComment,setValue])






  return (
    <Box component={"section"}>
      <Typography component={"h6"} mb={4}> Add Your Comment </Typography>

    <Box component={"form"} display={"flex"} flexDirection={"column"} onSubmit={handleSubmit((data)=>{
        if(!commentId) handleCreateComment(data)
            if(commentId) handleUpdateComment(data,commentId)
    })}>
   <TextField
   {...register("comment" , {required:"Comment Is Required" , pattern:{
    value:/^[a-zA-Z0-9\s]+$/ ,
    message:"Only Text Is Allowed"
   }})}
          id="rateMsg"
          multiline
          sx={{width:"80%"}}
           helperText={errors.comment?.message}
          maxRows={4}
          fullWidth
        />

        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
        <Button loading={isSubmitting} type="submit" sx={{my:"12px" , width:"fit-content"}} variant="contained">{submiteFormText}</Button>

       {userCommentForRoom && userCommentForRoom.length > 0 && userCommentForRoom.slice(0,2).map((comm:Comment)=> <Box my={2} border={1} key={comm._id} component={"footer"} borderRadius={3} p={2} display={"flex"} justifyContent={"space-between"} flexWrap={"wrap"} width={"90%"}>
    <Box>
        <Typography component={"p"} textTransform={"capitalize"} color="#39c">{comm.comment}</Typography>
        <Typography color="#e0e0e0">{new Date(comm.createdAt).toLocaleDateString()}</Typography>
    </Box>
    <Box>
        <IconButton  disabled={isLoading} onClick={()=>{handleDeleteComment(comm._id)}}> <DeleteIcon/></IconButton>
        <IconButton onClick={()=>{
            setCommentId(comm._id)
            setSubmiteFormText("Update Comment")
            setValue("comment",comm.comment)
        }}> <EditIcon/></IconButton>
    </Box>
</Box >)
}
    </Box>
    </Box>
  )
}
