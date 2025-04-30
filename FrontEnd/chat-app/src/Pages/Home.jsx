import { useChatStore } from "../store/useChatStore";

import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";

const HomePage = () => {
  const { selectedUser } = useChatStore();

  return (
    <>
    {/* <div  className="h-screen  bg-red-200">
      <div className="flex h-60 justify-center items-center bg-green-300 pt-20 px-4"> 
        <div className="bg-gray-100 h-50 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)">
          <div className="flex h-full rounded-lg overflow-hidden bg-slate-400">

          </div>

        </div>
      </div>

    </div> */}


    <div className="h-screen w-screen flex justify-center items-center  bg-base-200 pt-20 px-4">
        <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-7rem)]">
          <div className="flex h-full rounded-lg overflow-hidden">
            <Sidebar />

            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      
    </div>
    </>

  );
};
export default HomePage;
