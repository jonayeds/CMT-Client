"use client";
import Link from "next/link";
import { Button } from "../ui/button";
import {
  Contact,
  File,
  Home,
  LayoutDashboard,
  LogOut,
  User2,
} from "lucide-react";
import { usePathname } from "next/navigation";
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
const Navbar = () => {
  const path = usePathname();
  const { user, isLoading, setUser } = useUser();
  const activeNav = "from-[#58c38c] bg-gradient-to-b  to-[#4EAB60] text-white";
  const inactiveNav = "duration-300 hover:text-[#4EAB60]";
  const handleLogout = async()=>{
    await logoutUser()
    setUser(null)
  }
  
  return isLoading? <div className="flex justify-between items-center px-[4vw]  py-6">
    <Skeleton className="w-[10vw] h-12 rounded-full"  />
    <Skeleton className="w-[30vw] h-12 rounded-full" />
    <Skeleton className="w-[20vw] h-12 rounded-full" />
  </div> : (
    <div className="flex justify-between items-center px-[4vw]  py-6">
      <div>
        <Link href={"/"} className="logo text-4xl ">
          Classroom
        </Link>
      </div>
      <div className="flex gap-12 text-black bg-[#f4f4f4] px-0 rounded-full py-0">
        <Link
          href={"/"}
          className={`${
            path === "/" ? activeNav : inactiveNav
          } py-2 px-4 rounded-full flex items-center gap-1 `}
        >
          <Home className="w-6" /> Home
        </Link>
        <Link
          href={"/about"}
          className={`${
            path === "/about" ? activeNav : inactiveNav
          } py-2 px-4 rounded-full flex items-center gap-1 `}
        >
          <File />
          About
        </Link>
        <Link
          href={"/contact"}
          className={`${
            path === "/contact" ? activeNav : inactiveNav
          } py-2 px-4 rounded-full flex items-center gap-1 `}
        >
          <Contact />
          Contact
        </Link>
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
              <User2 />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              <LayoutDashboard />
              Dashboard
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogout} >
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
