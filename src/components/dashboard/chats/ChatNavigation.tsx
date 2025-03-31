"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { useUser } from "@/context/UserContext"
import { IChat } from "@/types/chat"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

const ChatNavigation = ({chats}:{chats:IChat[]}) => {
    const {user} = useUser()
    const path = usePathname().split("/")
    const [search, setSearch] =useState(chats)

    const handleSearch= (e:React.ChangeEvent<HTMLInputElement>)=>{
        const filteredChats = chats.filter(chat=> chat.student.name.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase()))
        setSearch(filteredChats)
    }


  return (
    <div className={``}>
            <Input type="text" className="border border-gray-300 mb-4 shadow-sm duration-200 focus:shadow-lg shadow-gray-200" placeholder="Search..." onChange={handleSearch} />
    <div className={`grid grid-cols-1 border border-gray-200  divide-gray-200 divide-y  rounded-lg overflow-hidden    max-h-[calc(100vh-302px)] overflow-y-auto ${path[4] && 'md:grid hidden' }`}>
        {
            search.map(chat=><Link href={`/${user?.role}/dashboard/chats/${chat._id}`} className={`py-2  px-3 ${(path[4] === chat._id ) ? 'bg-gray-200': 'hover:bg-gray-50'}  `} key={chat._id}>
                <div className="flex items-center gap-2 ">
                <Avatar className="bg-white border-green-500 border size-10">
                    <AvatarImage src={chat.student.profileImage}/>
                    <AvatarFallback >{chat.student.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className=" md:max-w-[15vw] max-w-[80vw] truncate">
                <p className="text-lg leading-6 truncate" >{chat.student.name}</p>
                <p className="text-sm text-gray-500 mt-1 truncate" >{chat.classroom.courseTitle}</p>
                <p className="text-xs text-gray-500 mt-1" >{chat.classroom.courseCode}</p>
                </div>
                </div>
            </Link>)
        }
    </div>
        </div>
  )
}

export default ChatNavigation