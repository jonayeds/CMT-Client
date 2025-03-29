import Link from "next/link"
import { JSX } from "react"

const NavigationLink = ({href,Icon,text, isActive}:{href:string,Icon:JSX.ElementType, text:string, isActive?:boolean}) => {
  return (
    <Link href={href} className="relative group">
        <Icon className={ `${isActive ? 'bg-gradient-to-br from-green-800  text-white to-green-900' : 'bg-white text-green-900'} gree text-5xl rounded-full p-3  `}/>
    <div className="absolute truncate opacity-0 scale-0 group-hover:scale-100 group-hover:opacity-100 z-10 top-[25%] rounded-md left-[120%] delay-200 duration-200 transition-all pointer-events-none text-xs bg-gray-500  px-2 py-1"> <p className="text-white">{text}</p></div>
  </Link>
  )
}

export default NavigationLink