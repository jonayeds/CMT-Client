import { BookOpen, Home, Info, Mail, Menu, Plus, PlusCircle } from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import Link from "next/link";
import { IUser } from "@/types/user";

const MobileNavigation = ({path, user}: {path: string, user: IUser}) => {
    const activeNav = "from-[#58c38c] bg-gradient-to-b  to-[#4EAB60] text-white"
    const inactiveNav = "duration-300 text-gray-700 hover:text-[#4EAB60]"
  return (
    <Drawer direction="left">
      <DrawerTrigger>
        <Menu />
      </DrawerTrigger>
      <DrawerContent className="sm:w-[60vw] w-[70vw] sm:px-[10vw] px-[2vw] gap-4 bg-white border-gray-100">
        <DrawerHeader>
          <DrawerTitle className="text-3xl logo text-center">Classroom</DrawerTitle>
          <DrawerDescription className="text-center"></DrawerDescription>
        </DrawerHeader>
        <div className="flex flex-col gap-6 sm:text-sm text-xs">
          <Link href={"/"} className={`${path === "/" ? activeNav : inactiveNav} flex items-center gap-2 py-2 px-4 rounded-lg `}><Home className="h-6 w-6 " /> Home</Link>
          
             <Link href={"/my-classes"} className={`${path === "/my-classes" ? activeNav : inactiveNav} flex items-center gap-2 py-2 px-4 rounded-lg `}>{user?  <BookOpen className="h-6 w-6 "/> : <Info className="h-6 w-6 "/>} {user ? "My Classes" : "About"}</Link> 
          

          {
            user ? (user?.role === "student") ? <Link href={"/join-classroom"} className={`${path === "/join-classroom" ? activeNav : inactiveNav} flex items-center gap-2 py-2 px-4 rounded-lg `}><Plus className="h-6 w-6 "/> Join Classroom</Link>: <Link href={"/create-classroom"} className={`${path === "/create-classroom" ? activeNav : inactiveNav} flex items-center gap-2 py-2 px-4 rounded-lg `}><PlusCircle className="h-6 w-6 "/> Create Classroom</Link> : <Link href={"/contact"} className={`${path === "/contact" ? activeNav : inactiveNav} flex items-center gap-2 py-2 px-4 rounded-lg `}><Mail className=" h-6 w-6 "/> Contact</Link>
          }
          
          
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default MobileNavigation;
