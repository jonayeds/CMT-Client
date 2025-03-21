"use client"
import Image from "next/image"
import { Input } from "../ui/input"
import { User, X } from "lucide-react"

const ImageInput = ({image, setImage}: {image: string, setImage: (image: string) => void}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleClearImage = ()=>{
    setImage("")
  }
  return (
    <div className="flex flex-col items-center gap-4">
        <div className="w-24 h-24 rounded-2xl relative bg-gray-100 flex items-center justify-center overflow-hidden ">
            {image ? (
              <div className="relative h-full w-full">
                <div onClick={handleClearImage} className="absolute h-6 rounded-full z-10 top-1 right-1 cursor-pointer w-6 bg-white backdrop-blur-sm opacity-70  flex items-center justify-center"><X className="w-4 h-4 text-red-500"/></div>
                <Image src={image} alt="user" className="w-full h-full" width={20} height={20} />
              </div>
            ) : (
                <div className="text-gray-500 w-full h-full items-center justify-center flex"><User className="w-10 h-10"/></div>
            )}

        <label htmlFor="image" className="absolute w-full h-full cursor-pointer"></label>
        <Input onChange={handleChange}  id="image" className="hidden" type="file" accept=".png .jpg .jpeg .webp" />
        </div>
    </div>
  )
}

export default ImageInput