"use client"
import { Upload } from "lucide-react";
import { Input } from "../ui/input";
import { Dispatch, SetStateAction  } from "react";
import { cn } from "@/lib/utils";

const FileInput = ({setFiles, className}:{setFiles: Dispatch<SetStateAction<File[]>>, className?:string}) => {

    const handleFileInput =(event: React.ChangeEvent<HTMLInputElement>)=>{
        const file = event.target.files?.[0];
        if(!file) return
            setFiles(prev=> [...prev, file] )
    }
  return (
    <div>
       
      <label
        htmlFor="file"
        className={cn("border-gray-300 border w-max cursor-pointer flex  items-center p-3 hover:bg-gray-100 duration-300 rounded-full", className)}
      >
        <Upload />
      </label>
      <Input
        type="file"
        id="file"
        accept=".ppt,.pdf,.docx,.doc,.pptx,.jpg,.jpeg,.png"
        className="hidden"
        onChange={handleFileInput}
      />
    </div>
  );
};

export default FileInput;
