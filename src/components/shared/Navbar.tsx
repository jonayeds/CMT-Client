import Link from "next/link";
import { Button } from "../ui/button";
import { Contact, File, Home } from "lucide-react";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center px-[4vw]  py-6">
      <div>
        <Link href={"/"} className="logo text-4xl ">Classroom</Link>
      </div>
      <div className="flex gap-12 bg-[#f4f4f4] px-6 rounded-full py-2">
        <Link
          href={"/"}
          className="flex items-center gap-1 duration-300 hover:text-[#4EAB60]"
        >
          <Home className="w-6" /> Home
        </Link>
        <Link
          href={"/about"}
          className="flex items-center gap-1 duration-300 hover:text-[#4EAB60]"
        >
          <File />
          About
        </Link>
        <Link
          href={"/contact"}
          className="flex items-center gap-1 duration-300 hover:text-[#4EAB60]"
        >
          <Contact />
          Contact
        </Link>
      </div>
      <div className="flex gap-2">
        <Link href={"/login"}>
          <Button>Login</Button>
        </Link>
        <Link href={"/login"}>
          <Button variant={"fill"}>Register</Button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
