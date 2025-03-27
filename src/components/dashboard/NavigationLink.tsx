import Link from "next/link"
import { JSX } from "react"

const NavigationLink = ({href,Icon,text}:{href:string,Icon:JSX.ElementType, text:string}) => {
  return (
    <Link href={href} className="relative group">
        <Icon className="text-5xl rounded-full p-3 bg-white"/>
    <div className="absolute truncate opacity-0 scale-0 group-hover:scale-100 group-hover:opacity-100 top-[25%] rounded-md left-[120%] delay-200 duration-200 transition-all pointer-events-none text-xs bg-gray-500  px-2 py-1"> <p className="text-white">{text}</p></div>
  </Link>
  )
}

export default NavigationLink