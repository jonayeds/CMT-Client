"use client"
import { Upload } from "lucide-react";
import { Input } from "../ui/input";
import { Dispatch, SetStateAction, useState } from "react";

const FileInput = ({setFiles}:{setFiles: Dispatch<SetStateAction<{
    name: string;
    url: string;
    type: string;
}[]>>}) => {
    
    // const [fileType, setFileType] = useState<string | null>(null);

    const handleFileInput =(event: React.ChangeEvent<HTMLInputElement>)=>{
        const file = event.target.files?.[0];
        if(!file) return
        const fileReader = new FileReader()
        fileReader.onloadend =() =>{
            setFiles(prev=> [...prev,{
                name:file.name,
                url:fileReader.result as string,
                type:file.type.split("/")[1]
            }] )
        }
        fileReader.readAsDataURL(file)
    }
  return (
    <div>
       
      <label
        htmlFor="file"
        className="border-gray-300 border w-max cursor-pointer flex  items-center p-3 hover:bg-gray-100 duration-300 rounded-full"
      >
        <Upload />
      </label>
      <Input
        type="file"
        id="file"
        accept=".ppt,.pdf,.docx,.doc,.pptx"
        className="hidden"
        onChange={handleFileInput}
      />
    </div>
  );
};

export default FileInput;
