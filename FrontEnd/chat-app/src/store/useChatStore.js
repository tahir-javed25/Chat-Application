import axios from "axios";
import toast from "react-hot-toast";
import {create} from "zustand";

export const useChatStore = create((set,get)=>({
    messages: [],
    users: [],
    selectedUser: null,
    isUserLoading: false,
    isMessagesLoading: false,

    getUsers: async()=>{
        set({isUserLoading:true})
        try {
            const res = await axios.get("http://localhost:3000/messages/users",{withCredentials:true})
            // console.log(res.data.users);
            set({users:res.data.users});
        } catch (error) {
            
            toast.error(error.response.data.message);
        } finally{
            set({isUserLoading:false})
        }
    },

    getMessages: async (userId) => {
        set({ isMessagesLoading: true });
        try {
          const res = await axios.get(`http://localhost:3000/messages/${userId}`,{withCredentials:true})
          console.log(res.data.result)
          set({ messages: res.data.result });
        } catch (error) {
          toast.error(error.response.data.message);
        } finally {
          set({ isMessagesLoading: false });
        }
      },

      sendMessage: async (messageData)=>{
       set({ isMessagesLoading:true});
       console.log(messageData)

       const {selectedUser, messages} = get();
       try {
        const res = await axios.post(`http://localhost:3000/messages/send/${selectedUser._id}`,messageData,{withCredentials:true})
        console.log(res.data.result)
        set({messages: [...messages, res.data.result]})
        console.log(messages)
       } catch (error) {
        console.log(error.response.data.message)
        toast.error(error.response.data.message);
       }finally{
        set({ isMessagesLoading:false });
       }

      },



    setSelectedUser: async(selectedUser)=> set({selectedUser})
    
}))