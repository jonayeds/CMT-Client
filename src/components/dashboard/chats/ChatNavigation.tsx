"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { useUser } from "@/context/UserContext";
import { IChat } from "@/types/chat";
import { IUser } from "@/types/user";
import { Loader2Icon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const ChatNavigation = ({ chats }: { chats: IChat[] }) => {
  const { user, isLoading } = useUser();
  const path = usePathname().split("/");
  const [search, setSearch] = useState(chats);
  const [isMobile, setIsMobile] = useState(false);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const filteredChats = chats.filter((chat) =>
      chat.student.name
        .toLocaleLowerCase()
        .includes(e.target.value.toLocaleLowerCase())
    );
    setSearch(filteredChats);
  };
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  if (isLoading) {
    return (
      <div className="px-4 h-[calc(100vh-302px)] flex w-full items-center justify-center">
        <Loader2Icon className="animate-spin " />
      </div>
    );
  }
  return (
    <div className={`${path[4] && "md:grid hidden"}`}>
      <Input
        type="text"
        className="border border-gray-300 mb-4 shadow-sm duration-200 focus:shadow-lg shadow-gray-200"
        placeholder="Search..."
        onChange={handleSearch}
      />
      <div
        className={`grid grid-cols-1 border border-gray-200  divide-gray-200 divide-y  rounded-lg overflow-hidden    max-h-[calc(100vh-302px)] overflow-y-auto `}
      >
        {search.map((chat) => (<ChatNavigationCard chat={chat} user={user} isMobile={isMobile} path={path}  key={chat._id} />
        ))}
      </div>
    </div>
  );
};


const ChatNavigationCard =({chat, user, isMobile, path}:{chat:IChat, user:IUser |null, isMobile:boolean, path:string[]})=>{

  return (
    <Link
    href={`${
      isMobile
        ? `/${user?.role}/dashboard/messages/${chat._id}`
        : `/${user?.role}/dashboard/chats/${chat._id}`
    } `}
    className={`py-2  px-3 ${
      path[4] === chat._id ? "bg-gray-200" : "hover:bg-gray-50"
    }  `}
  >
    <div className="flex items-center gap-2 ">
      {
        user?.role === "student" ? <Avatar className="bg-white border-green-500 border size-10">
        <AvatarImage src={chat.classroom.faculty.profileImage} />
        <AvatarFallback>{chat.classroom.faculty.name.charAt(0)}</AvatarFallback>
      </Avatar> : <Avatar className="bg-white border-green-500 border size-10">
        <AvatarImage src={chat.student.profileImage} />
        <AvatarFallback>{chat.student.name.charAt(0)}</AvatarFallback>
      </Avatar>
      }
      

      <div className=" md:max-w-[15vw] max-w-[80vw] truncate">
        <p className="text-lg leading-6 truncate">
          {user?.role ==="faculty" ? chat.student.name : chat.classroom.faculty.name}
        </p>
        <p className="text-sm text-gray-500 mt-1 truncate">
          {chat.classroom.courseTitle}
        </p>
        <p className="text-xs text-gray-500 mt-1">
          {chat.classroom.courseCode}
        </p>
      </div>
    </div>

  </Link>
  )
}


export default ChatNavigation;
