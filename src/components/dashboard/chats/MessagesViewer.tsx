import { IMessage } from "@/types/chat";
import { IUser } from "@/types/user";
import { useEffect, useRef } from "react";

const MessagesViewer = ({msgs, user}:{msgs:IMessage[], user:IUser | null}) => {
      const scrollRef = useRef<HTMLDivElement>(null);
      useEffect(()=>{
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
          }
      },[msgs])
      console.log(msgs)
  return (
    <div  ref={scrollRef} className= "  md:h-[calc(100vh-355px)] h-[calc(100vh-200px)]  overflow-y-auto scrollbar-hidden">
      <div className="flex flex-col justify-end min-h-full ">

    <div className=" flex flex-col-reverse  ">

    {
      msgs.map((message,idx)=>(
        <div key={idx} className={ `flex overflow-scroll mt-3 w-full ${message.from === user?.role ? 'justify-end  text-white ': 'justify-start  text-gray-700'}`}>

            <p className={ `px-4 py-1  w-max ${message.from === user?.role ? '  text-white bg-green-600 rounded-l-full rounded-tr-full': ' bg-gray-200 rounded-r-full rounded-tl-full text-gray-700'}`}>{message.message}</p>
            </div>
        ))
      }
    </div>
      </div>
    </div>
  )
}

export default MessagesViewer