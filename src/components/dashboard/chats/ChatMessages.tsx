"use client"
import { useUser } from "@/context/UserContext"
import { IMessage } from "@/types/chat"

const ChatMessages = ({messages}:{messages:IMessage[]}) => {
    const {user} = useUser()
  return (
    <div className="px-4  w-full">
        {
            messages.map(message=>(
                <div key={message._id} className={ `flex w-full ${message.from === user?.role ? 'justify-end  text-white ': 'justify-start  text-gray-700'}`}>

                <p className={ `px-4 py-1  w-max ${message.from === user?.role ? '  text-white bg-green-600 rounded-l-full rounded-tr-full': ' bg-gray-200 rounded-r-full rounded-tl-full text-gray-700'}`}>{message.message}</p>
                </div>
            ))
        }
    </div>
  )
}

export default ChatMessages