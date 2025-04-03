import ChatMessages from '@/components/dashboard/chats/ChatMessages'
import { getChatMessages } from '@/services/Chat/intex'
import React from 'react'
 
export const dynamic = "force-dynamic"

const ChatMessagesPage = async({params}:{params:Promise<{chatId:string}>}) => {
  const {chatId} = await params
  const data = await getChatMessages(chatId) 
  const messages = data?.data

  return (
    <div className='w-full'>
      {
        messages ? <ChatMessages messages={messages} chatId={chatId} /> : <div className='w-full h-[calc(100vh-250px)] flex items-center justify-center'>Chat not found</div>
      }
      
    </div>
  )
}

export default ChatMessagesPage