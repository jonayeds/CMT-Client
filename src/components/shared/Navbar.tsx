"use client";
import Link from "next/link";
import { Button } from "../ui/button";
import {
  BookOpen,
  Contact,
  Home,
  Info,
  LayoutDashboard,
  LogOut,
  Plus,
  PlusCircle,
  User2,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Skeleton } from "../ui/skeleton";
import { logoutUser } from "@/services/AuthService";
import MobileNavigation from "./MobileNavigation";
import { IUser } from "@/types/user";
const Navbar = () => {
  const path = usePathname();
  const { user, isLoading, setUser } = useUser();
  const router = useRouter()
  const activeNav = "from-[#58c38c] bg-gradient-to-b  to-[#4EAB60] text-white";
  const inactiveNav = "duration-300 hover:text-[#4EAB60]";
  const handleLogout = async()=>{
    await logoutUser()
    setUser(null)
    router.push("/")
  }
  
  return isLoading? <div className="flex   justify-between items-center px-[4vw]  py-8">
    <Skeleton className="w-[10vw] h-8  rounded-full"  />
    <Skeleton className="w-[30vw] h-8 rounded-full" />
    <Skeleton className="w-[5vw] h-8 rounded-full" />
  </div> : (
    <div className="flex justify-between items-center px-[4vw]  py-6">
      <div className="flex items-center gap-4">
        <div className="lg:hidden">
        <MobileNavigation path={path} user={user as IUser} />
        </div>
        <Link href={"/"} className="logo text-4xl ">
          Classroom
        </Link>
      </div>
      <div className="lg:flex gap-12 text-black bg-[#f4f4f4] px-0 rounded-full py-0 hidden">
        <Link
          href={"/"}
          className={`${
            path === "/" ? activeNav : inactiveNav
          } py-2 px-4 rounded-full flex items-center gap-1 `}
        >
          <Home className="w-6" /> Home
        </Link>
        <Link
          href={ user ? "/my-classes" : "/about"}
          className={`${ 
            path === "/about" || path === "/my-classes" ? activeNav : inactiveNav
          } py-2 px-4 rounded-full flex items-center gap-1 `}
        >
          {user ? <BookOpen /> :  <Info />}
          { user ? "My Classes" : "About"}
        </Link>
        {
          user ? <Link
          href={user.role === "student" ? "/join-classroom" : "/create-classroom"}
          className={`${
             ["/contact", "/create-classroom", "/join-classroom"].includes(path) ? activeNav : inactiveNav
          } py-2 px-4 rounded-full flex items-center gap-1 `}
        >
          {user.role === "student" ? <Plus /> : <PlusCircle />}
          {user.role === "student" ? "Join Class" : "Create Class"}
        </Link> :  <Link
          href={"/contact"}
          className={`${
            path === "/contact" ? activeNav : inactiveNav
          } py-2 px-4 rounded-full flex items-center gap-1 `}
        >
          <Contact />
          Contact
        </Link>
        }
        
      </div>
      { user ? (
        <DropdownMenu>
          <DropdownMenuTrigger className="cursor-pointer outline-none ">
            <Avatar className="size-12 border-2 border-green-500">
              <AvatarImage src={user?.profileImage} />
              <AvatarFallback>{`${user.name.charAt(0)}`}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="border-gray-200 bg-white">
            <DropdownMenuItem>
              <Link href={"/profile"} className="flex items-center gap-2 w-full">
              <User2 />
              Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
            <Link href={"/profile"} className="flex items-center gap-2 w-full">
              <LayoutDashboard />
              Dashboard
            </Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogout} className="cursor-pointer" >
              <LogOut />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <div className="flex gap-2">
          <Link href={"/login"}>
            <Button>Login</Button>
          </Link>
          <Link href={"/register"}>
            <Button variant={"fill"}>Register</Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
