import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getUser } from "@/services/AuthService"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"

const ProfilePage = async() => {
    const user = await getUser()
  return (
    <div className="min-h-screen flex relative flex-col justify-center items-center">
        <div className="absolute top-[7vh] left-[10vw] "><Link href={"/"} className="flex items-center gap-2"><ChevronLeft/> Home</Link></div>
        <div className="flex flex-col items-center justify-center bg-gray-100 p-8 rounded-xl my-10 hover:shadow-xl shadow-md duration-700">

        <Avatar className="size-32 border-5 border-white">
              <AvatarImage src={user?.profileImage} />
              <AvatarFallback>{`${user?.name.charAt(0)}`}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col items-center">
                <h1 className="mt-4 text-3xl uppercase text-gray-800">{user.name}</h1>
                <p className="text-xs text-gray-500 mt-2">{user.email}</p>
                <p className="text-sm text-gray-600 mt-2">ID: {user.id}</p>
                <p className={`text-sm text-gray-600 mt-2 px-4 py-1 rounded-lg ${user.role === "student"? 'bg-green-200': 'bg-yellow-200'}`}>{user.role}</p>

            </div>
        </div>
    </div>
  )
}

export default ProfilePage