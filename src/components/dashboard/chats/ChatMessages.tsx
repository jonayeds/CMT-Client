/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useUser } from "@/context/UserContext"
import { IMessage } from "@/types/chat"
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { FieldValues, SubmitErrorHandler, useForm } from "react-hook-form";
import { BsFillSendFill } from "react-icons/bs";
import {io} from 'socket.io-client'
import MessagesViewer from "./MessagesViewer";




const ChatMessages = ({messages,chatId}:{messages:IMessage[], chatId:string}) => {
  const socket = io('http://localhost:8000')
  const {user,isLoading} = useUser()
  const form = useForm()
  const [msgs, setMsgs] = useState(messages)


  useEffect(()=>{
    

    socket.on("connect",()=>{
      console.log("client connected", socket.id)
    })
    socket.emit("join-chat", chatId)
   socket.on('receiveMessage', (msg)=>{
    console.log("Message received")
    console.log(msg, msg.from , user?.role)

    if(msg.from !== user?.role){
      setMsgs((prev)=> [msg ,...prev])
    }
   })
   socket.emit("joinRoom", chatId )
   return ()=>{
    socket.off('receiveMessage')
   }
  },[user])

    const sendMessage : SubmitErrorHandler<FieldValues>= async(data)=>{
      if(!data?.message){
        return 
      }
      socket.emit('newMessage', {chat:chatId, message:data.message, from:user?.role})
      setMsgs((prev)=> [ {chat:chatId, message:data.message, from:user?.role} as unknown as IMessage, ...prev])
        form.reset()
    }
    const handleKeyDown =(e:any)=>{
        if(e.key === "Enter" && !e.shiftKey){
            e.preventDefault()
            form.handleSubmit(sendMessage)()
        }

    }
    if(isLoading){
      return <div className="h-[calc(100vh-250px)] w-full flex justify-center items-center"><Loader2 className="animate-spin duration-200 "/></div>
    }
  return (
    <div className="px-4 relative overflow-y-auto   max-w-3xl mx-auto ">
      <div className="absolute w-full  h-[50vh] pointer-events-none  bg-gradient-to-b via-transparent from-white to-transparent z-10 top-0 left-[0] rounded-lg"></div>
       <MessagesViewer msgs={msgs} user={user}/>


        <Form {...form}>

        <form onSubmit={form.handleSubmit(sendMessage)} className="mb-4 mt-2  pt-4 flex gap-4 border-t border-gray-200 items-center" >
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Textarea
                    onKeyDown={handleKeyDown}
                      placeholder="Type here..."
                      {...field}
                      value={field.value || ""}
                      className="border md:ax-h-1 md:h-1 h-0.5 max-h-0.5 border-gray-200 
                      "
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <button type="submit">
                <BsFillSendFill className="text-2xl"/>
                </button>
        </form>
        </Form>
    </div>
  )
}

export default ChatMessages