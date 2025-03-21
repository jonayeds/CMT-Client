"use client";
import Link from "next/link";
import { Button } from "../ui/button";
import { Contact, File, Home, LayoutDashboard, LogOut } from "lucide-react";
import { usePathname } from "next/navigation";
import { useUser } from "@/context/UserContext";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";

const Navbar = () => {
  const path = usePathname();
  const { user, isLoading } = useUser();
  const activeNav = "from-[#58c38c] bg-gradient-to-b  to-[#4EAB60] text-white";
  const inactiveNav = "duration-300 hover:text-[#4EAB60]";
  return (
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
      {isLoading ? (
        <div>Loading...</div>
      ) : user ? (
       <DropdownMenu>
        <DropdownMenuTrigger className="cursor-pointer outline-none ">
          <Avatar className="size-12 border-2 border-green-500">
            <AvatarImage  src={user?.profileImage} />
            <AvatarFallback>{`${user.name.charAt(0)}`}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="border-gray-200">
          <DropdownMenuItem>
            <LayoutDashboard/>
            Dashboard
          </DropdownMenuItem>
          <DropdownMenuItem>
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
