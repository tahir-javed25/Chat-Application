import axios from "axios";
import {create} from "zustand"; 
import toast from "react-hot-toast";

export const useAuthStore = create((set)=>({
    authUser:null,
    isSigningUp:false,
    isLogingIn:false,
    isUpdatingProfile: false,
    isCheckingAuth:true,
    onlineUsers: [],

    checkAuth: async()=>{
        try {
           const res = await axios.get("http://localhost:3000/user/check", {withCredentials:true})

           set({authUser:res.data})
        } catch (error) {
            // console.log("error in checkAuth", error)
            set({authUser:null})    
        } finally{
            set({isCheckingAuth:false})
        }
    },

    signup: async(data)=>{
        set({isSigningUp:true});
        try {
            const res = await axios.post("http://localhost:3000/user/signup",data,{withCredentials:true})
            set({authUser:res.data})
            toast.success("Account Created Successfully")
        } catch (error) {
            toast.error(error.response.data.message)  
        }finally{
            set({isSigningUp:false})
        }

    },

    logout : async()=>{
        try {
            await axios.post("http://localhost:3000/user/logout",{},{withCredentials:true})
            set({ authUser: null });
            toast.success("Logged out successfully");
            // get().disconnectSocket();
          } catch (error) {
            toast.error(error.response.data.message);

          }
    },

    login: async (data) =>{
        
        set({isLogingIn:true});
        try {
            const res = await axios.post("http://localhost:3000/user/login",data, {withCredentials:true});
            set({authUser:res.data})
            toast.success("Logged in Successfully")
            return res
        } catch (error) {
            toast.error(error.response.data.message);   
        }finally{
            set({isLogingIn:false})
        }
    },


    updateProfile: async (data) => {
        // console.log(data)
        set({ isUpdatingProfile: true });
        try {
          const res = await axios.put("http://localhost:3000/user/update-profile", data, {withCredentials:true});
          set({ authUser: res.data });
          toast.success("Profile updated successfully");
        } catch (error) {
          console.log("error in update profile:", error);
          toast.error(error.response.data.message);
        } finally {
          set({ isUpdatingProfile: false });
        }
      },


}))