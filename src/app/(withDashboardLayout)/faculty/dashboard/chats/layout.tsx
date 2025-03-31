import ChatNavigation from "@/components/dashboard/chats/ChatNavigation"
import { getMyChats } from "@/services/Chat/intex"

export const dynamic = "force-dynamic"

const ChatLayout = async({children}:{children:React.ReactNode}) => {
    const {data:chats} = await getMyChats()
  return (
    <div className="px-4 py-12">

        <h1 className="md:text-[3vw] font-extralight text-[6vw] text-center">Chats</h1>
    <div className="flex gap-2  ">
        <div className="md:w-[25vw] w-full">
          
            <ChatNavigation chats={chats} />
        </div>
        <div className="bg-gray-300 md:block rounded-lg flex-1 max-h-[calc(100vh-250px)] overflow-y-auto hidden">
        {children}
        </div>
    </div>
    </div>
  )
}

export default ChatLayout