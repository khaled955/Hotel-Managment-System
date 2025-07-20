import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { lazy, Suspense } from "react"
import { Toaster}from "react-hot-toast"
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';


// Shared Layouts and Guards
import AuthLayout from "./Modules/Shared/Components/AuthLayout/AuthLayout"
import MasterLayout from "./Modules/Shared/Components/MasterLayout/MasterLayout"
import ProtectedRoot from "./Modules/Shared/Components/ProtectedRoot/ProtectedRoot"
import Loading from "./Modules/Shared/Pages/Loading/Loading"
import ProtectedLayout from "./Modules/Shared/Components/ProtectedLayout/ProtectedLayout"
import GuestRoot from "./Modules/Shared/Components/GuestRoot/GuestRoot"
import { AuthContextProvider } from "./Context/Auth.context"
import { Box } from "@mui/material"
import RoomFormCard from "./Modules/AdminPortal/Components/RoomFormCard/RoomFormCard"
import UserRoomDetails from "./Modules/UserPortal/Pages/UserRoomDetails/UserRoomDetails"
import RoomContextProvider from "./Context/Rooms.context"
import CheckOut from "./Modules/UserPortal/Components/CheckOut/CheckOut"
import BookingListDetails from "./Modules/UserPortal/Pages/BookingList/BookingListDetails";
import FavouriteContextProvider from "./Context/Favourite.context";
import NotFound from "./Modules/Shared/Pages/NotFound/NotFound";

// Lazy-loaded Pages
const Home = lazy(() => import("./Modules/UserPortal/Pages/Home/Home"))
const Explore = lazy(() => import("./Modules/UserPortal/Pages/Explore/Explore"))
const Favourits = lazy(() => import("./Modules/UserPortal/Pages/Favourites/Favourits"))

const Dashboard = lazy(() => import("./Modules/AdminPortal/Pages/Dashboard/Dashboard"))
const Users = lazy(() => import("./Modules/AdminPortal/Pages/Users/Users"))
const Rooms = lazy(() => import("./Modules/AdminPortal/Pages/Rooms/Rooms"))
const Adds = lazy(() => import("./Modules/AdminPortal/Pages/Adds/Adds"))
const ListBooking = lazy(() => import("./Modules/AdminPortal/Pages/ListBooking/ListBooking"))
const Facilities = lazy(() => import("./Modules/AdminPortal/Pages/Facilities/Facilities"))

const Profile = lazy(() => import("./Modules/Shared/Pages/Profile/Profile"))
const ChangePassword = lazy(() => import("./Modules/Shared/Pages/ChangePassword/ChangePassword"))

const Login = lazy(() => import("./Modules/Authentication/Pages/Login/Login"))
const Register = lazy(() => import("./Modules/Authentication/Pages/Register/Register"))
const ForgetPassword = lazy(() => import("./Modules/Authentication/Pages/ForgetPassword/ForgetPassword"))
const ResetPassword = lazy(() => import("./Modules/Authentication/Pages/ResetPassword/ResetPassword"))



const stripePromise = loadStripe('pk_test_51OTjURBQWp069pqTmqhKZHNNd3kMf9TTynJtLJQIJDOSYcGM7xz3DabzCzE7bTxvuYMY0IX96OHBjsysHEKIrwCK006Mu7mKw8');

const routes = createBrowserRouter([
  {

    // general routes in master layout
    path: "/",
    element: <MasterLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "home", element: <Home /> },
      { path: "explore", element: <Explore /> },
      { path: "favourite-list", element: <Favourits/> },
      { path: "checkout", element:<CheckOut/> },
      { path: "booking-list", element:<BookingListDetails/>},
      { path: "room-details/:id", element:<UserRoomDetails/> },
       { path: "change-password", element:<ChangePassword /> },
       { path: "profile", element:<Profile /> },
       { path: "*", element:<NotFound/> },

      // protected routes in protected layout inside master layout
      { path:"dashboard" , element: <ProtectedRoot> <ProtectedLayout/></ProtectedRoot> , children:[
       {index:true , element:<Dashboard/>},
       { path: "dashboard", element:<Dashboard />},
       { path: "favourits", element:<Favourits /> },
       { path: "users", element:<Users /> },
       { path: "rooms", element:<Rooms /> },
       { path: "room-form", element:<RoomFormCard/> },
       { path: "ads", element:<Adds /> },
       { path: "list-booking", element:<ListBooking /> },
       { path: "facilities", element:<Facilities /> },
              { path: "*", element:<NotFound/> },

      ]},
   
    ]
  },

  // auth layout
  {
    path: "auth",
    element:  <GuestRoot> <AuthLayout /></GuestRoot>,
    children: [
      { index:true, element: <Login /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "forget-password", element: <ForgetPassword /> },
      { path: "reset-password", element: <ResetPassword /> },
    ]
  }
])

function App() {
  return (

 <>
 
    <AuthContextProvider>
          <RoomContextProvider>
            <FavouriteContextProvider>
             <Elements stripe={stripePromise}>
    <Suspense fallback={<Loading/>}>
      
      <RouterProvider router={routes} />
    </Suspense>
            </Elements>
            </FavouriteContextProvider>
            </RoomContextProvider>
          </AuthContextProvider>


 <Box sx={{zIndex:999999999999}}>
         <Toaster/>

    </Box>


 </>
  )
}

export default App
