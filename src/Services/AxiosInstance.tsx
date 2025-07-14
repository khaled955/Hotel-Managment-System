import axios from "axios";
import Cookies from "js-cookie";

export const baseURL='https://upskilling-egypt.com:3000'
export const admineURL = '/api/v0/admin'
export const portalURL = '/api/v0/portal'



/********************* Admine *****************************/ 



export const AdmineAxiosInstance=axios.create({
    baseURL:`${baseURL}${admineURL}`,

})


AdmineAxiosInstance.interceptors.request.use(
    (config) => {
      const token = Cookies.get("HOTELCOOKIE");
      if (token) {
      config.headers["Authorization"] = `${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );



  /************************ UserPortal ***********************/ 


export const UserAxiosInstance=axios.create({
    baseURL:`${baseURL}${portalURL}`,

})


UserAxiosInstance.interceptors.request.use(
    (config) => {
      const token =Cookies.get("HOTELCOOKIE");
      if (token) {
      config.headers["Authorization"] = `${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );