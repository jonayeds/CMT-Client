import ChatMessages from '@/components/dashboard/chats/ChatMessages'
import { getChatMessages } from '@/services/Chat/intex'
import React from 'react'

export const dynamic = "force-dynamic"

const ChatMessagesPage = async({params}:{params:Promise<{chatId:string}>}) => {
  const {chatId} = await params
    const {data:messages} = await getChatMessages(chatId) 
  return (
    <div >
      <ChatMessages messages={messages} chatId={chatId}  />
    </div>
  )
}

export default ChatMessagesPage