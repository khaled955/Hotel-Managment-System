

/***************** AUTHENTICATION_URLS*********************/

import { baseURL } from "./AxiosInstance"

export const AUTH_URLS={
  LOGIN:'/users/login',
  REGISTER:'/users/',
  CHANGE_PASSWORD: '/users/change-password',
  RESET_PASSWORD:'/users/reset-password',
  FORGET_PASSWORD:'/users/forgot-password',
  GET_ALL_USERS :  '/users',
  GET_USER_PROFILE : (id:string) => `users/${id}`,
  GOOGLE_LOGIN:`/users/auth/google`,
}




/******************* Admine Urls ****************************/ 
export const ADMINE_AUTH_URLS = {
ADMINE_CHANGE_PASSWORD :`/users/change-password`


}





/******************** Get All Users By Admine*******************************/ 
export const GET_ALL_USERS_BY_ADMINE= (pageSize:number , pageNumber:number)=>`/users?page=${pageNumber}&size=${pageSize}`




//Rooms_URLS
export const ROOMS_URLS={
  CREATE_ROOM:'/rooms',
  UPDATE_ROOM:(id:string)=>`/rooms/${id}`,
  GET_ROOMS: '/rooms',
  DELETE_ROOMS:(id:string)=>`/rooms/${id}`,
  GET_ROOM:(id:string)=>`/rooms/${id}`,
  GET_FACILITIES_ROOM:'/room-facilities',
  GET_ALL_ROOMS_FILTERED:(pageNumber:1 , pageSize:number)=>`/rooms?page=${pageNumber}&size=${pageSize}`,
}





//room-facilities-url
export const FACILITES_URLS={
  GET_FACILITES:"/room-facilities",
  ADD_FACILITES:"/room-facilities",
 DELETE_FACILITES:(id:string)=>`/room-facilities/${id}`,
 EDIT_FACILITES:(id:string)=>`/room-facilities/${id}`,
}





export const ADS_URLS={
  GET_ALL_ADS:'/ads',
  CREATE_NEW_ADS:'/ads',
  GET_ADS_DETAILS_BY_ID:(id:number)=>`/ads/${id}`,
  EDIT_ADS:(id:string)=>`/ads/${id}`,
  DELETE_ADS:(id:string)=>`/ads/${id}`,
}




export const DASHBOARD_URLS={
  CHART:'/dashboard'
}


// Admine booking_URLS
export const ADMIN_BOOKINGS_URLS={
  GET_ALL_BOOKINGS : (pageSize:number , pageNumber:number)=>`/booking?page=${pageNumber}&size=${pageSize}`,
  GET_BOOKING_DETAILS : (id:number) => `booking/${id}`,
  DELETE_BOOKING : (id:number) => `booking/${id}`,
}







//  Portal Favorite_Url
export const FAVORITE_ROOMS={
  GET_ALL:"favorite-rooms",
  ADD_Fav:"favorite-rooms",
  DELETE_Fav:(id:string)=>`favorite-rooms/${id}`,
}

// Ads_Url
export const Ads_Url={
  GET_ALL:"ads",
  
}
// room details portal

export const PORTAL_URLS_Details={
  GET_ALL_ROOMS:`/rooms/available`,
  GET_ROOM_DETAILS:(id:number)=>`/rooms/${id}`,
  CREATE_REVIEW:`/room-reviews`,
  CREATE_COMMENT:`/room-comments`
}


export const ALL_EXPLORE_ROOMS_URLS={
  GET_ALL_ROOMS:'/rooms/available',
  GET_ALL_ROOMS_FILTER:(pageNumber:number,pageSize:number,startDate:string,endDate:string ,capacity:number)=>`${baseURL}/api/v0/portal/rooms/available?page=${pageNumber}&size=${pageSize}${startDate &&`&startDate=${startDate}`}${endDate &&`&endDate=${endDate}`}${capacity &&`&capacity=${capacity}`}`
  
}

// Portal booking and payment

export const PORTAL_BOOKING_ROOM = `${baseURL}/api/v0/portal/booking`
export const PORTAL_PAYMENT_URL = (paymentId:string)=>`${baseURL}/api/v0/portal/booking/${paymentId}/pay`
export const PORTAL_BOOKING_LIST = `${baseURL}/api/v0/portal/booking/my`
export const GET_ROOM_REVIEWS = (roomId:string)=>`${baseURL}/api/v0/portal/room-reviews/${roomId}`
export const CREATE_ROOM_RATING= `${baseURL}/api/v0/portal/room-reviews`
export const CREATE_ROOM_COMMENT = `${baseURL}/api/v0/portal/room-comments`
export const GET_ROOM_COMMENTS = (roomId:string)=>`${baseURL}/api/v0/portal/room-comments/${roomId}`
export const DELETE_COMMENT = (commentId:string)=>`${baseURL}/api/v0/portal/room-comments/${commentId}`
export const UPDATE_COMMENT = (commentId:string)=>`${baseURL}/api/v0/portal/room-comments/${commentId}`

