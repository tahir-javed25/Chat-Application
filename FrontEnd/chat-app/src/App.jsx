import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import AppLayout from './Pages/AppLayout'
import WelcomePage from './Pages/WelcomePage'
import Login from './Pages/Login.jsx'
import SignUp from './Pages/SignUp.jsx'
import Settings from './Pages/Settings.jsx'
import Profile from './Pages/Profile.jsx'
import Home from './Pages/Home.jsx'
import { Toaster } from 'react-hot-toast'
import { useAuthStore } from './store/useAuthStore.js'
import { useThemeStore } from './store/useThemeStore.js'
import { Loader } from 'lucide-react'
import { useEffect } from 'react'

function App() {
  const { authUser, isCheckingAuth, checkAuth } = useAuthStore();
  const {theme} = useThemeStore();

useEffect(()=>{
  checkAuth();
},[checkAuth])

  const router = createBrowserRouter([
    {path:"/", element:<AppLayout/>,
      children:[
        {path:"/",element:<WelcomePage/>},
        { path:"/signup", element:!authUser ? <SignUp/> : <Navigate to="/home" />} ,
        { path:"/login", element:!authUser ? <Login/> : <Navigate to="/home" /> } ,
        {path:"/home",element:authUser ? <Home/> : <Navigate to="/login"/>},
        {path:"/settings",element:<Settings/>},
        {path:"/profile",element: authUser ? <Profile/> : <Navigate to ="/login"/> },

      ]
    }
  ])

  if(isCheckingAuth && !authUser){
    return(
      <div className='flex justify-center items-center h-screen w-screen'>
        <Loader />
      </div>
    )
   }

  return (
    <>
    <div data-theme={theme}>
   <RouterProvider router={router}/>
   <Toaster/>
    </div>
    </>
  )
}

export default App
