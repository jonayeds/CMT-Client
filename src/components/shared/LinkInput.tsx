"use client"
import { DialogTrigger } from "@radix-ui/react-dialog";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "../ui/dialog";
import { Link } from "lucide-react";
import { Input } from "../ui/input";
import { useState } from "react";

const LinkInput = () => {
    const [link,setLink] = useState("")
  return (
    <Dialog>
      <DialogTrigger className="border-gray-200 border rounded-full p-3 cursor-pointer hover:bg-gray-100 duration-300">
        <Link />
      </DialogTrigger>

      <DialogContent className="bg-white min-w-xs border-gray-100">
        <DialogTitle className="font-light ">Upload Link</DialogTitle>
        <DialogDescription>
          <Input
            type="text"
            placeholder="paste link here..."
            className="border-gray-300 mt-2"
            onChange={(e)=>setLink(e.target.value)}
          />
        </DialogDescription>
        <div className="flex justify-end gap-3">
          <DialogClose  className=" text-green-600 cursor-pointer">
            Cancel
          </DialogClose>
          <DialogClose disabled={link?false :true} className="text-green-600 cursor-pointer disabled:text-gray-400">
            Add Link
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LinkInput;
