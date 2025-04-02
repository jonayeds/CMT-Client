/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useUser } from "@/context/UserContext"
import { IMessage } from "@/types/chat"
import { useEffect, useState } from "react";
import { FieldValues, SubmitErrorHandler, useForm } from "react-hook-form";
import { BsFillSendFill } from "react-icons/bs";
import {io} from 'socket.io-client'




const ChatMessages = ({messages,chatId}:{messages:IMessage[], chatId:string}) => {
  const socket = io('http://localhost:8000')
  const {user} = useUser()
  const form = useForm()
  const [msgs, setMsgs] = useState(messages)

  useEffect(()=>{

    socket.on("connect",()=>{
      console.log("client connected", socket.id)
    })
    socket.emit("join-chat", chatId)
   socket.on('receiveMessage', (msg)=>{
    console.log("Message received")
      setMsgs((prev)=> [...prev, msg])
   })
   socket.emit("joinRoom", chatId )
   return ()=>{
    socket.off('receiveMessage')
   }
  },[])


    const sendMessage : SubmitErrorHandler<FieldValues>= (data)=>{
      console.log(data)
      socket.emit('newMessage', {
        from:user?.role,
        chat:chatId,
        message:data.message
      })
        form.reset()
    }
    const handleKeyDown =(e:any)=>{
        if(e.key === "Enter" && !e.shiftKey){
            e.preventDefault()
            form.handleSubmit(sendMessage)()
        }

    }
  return (
    <div className="px-4  max-w-3xl mx-auto">
        <div>

        {
            msgs.map((message,idx)=>(
                <div key={idx} className={ `flex mt-3 w-full ${message.from === user?.role ? 'justify-end  text-white ': 'justify-start  text-gray-700'}`}>

                <p className={ `px-4 py-1  w-max ${message.from === user?.role ? '  text-white bg-green-600 rounded-l-full rounded-tr-full': ' bg-gray-200 rounded-r-full rounded-tl-full text-gray-700'}`}>{message.message}</p>
                </div>
            ))
        }
        </div>
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
                      className="border max-h-1 h-1 border-gray-200 
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