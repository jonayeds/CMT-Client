import { IContent } from "@/types/content"
import { IJwtDecodedUser, IUser } from "@/types/user"
import { BellRing, Notebook } from "lucide-react"

const ContentCard = ({content, faculty, currentUser }:{content:IContent, faculty:IUser, currentUser:IJwtDecodedUser}) => {
  return (
    <div className="py-4 px-6 border border-gray-300 rounded-xl flex items-center gap-2 cursor-pointer">
        <p className="text-green-700">

        {
            (content.contentFiles.length + content.contentLinks.length >0) ? <Notebook/>:<BellRing/>
        }
        </p>
        <p>{faculty._id === currentUser._id ? "You": faculty.name} uploaded new material : {content.title}</p>
    </div>
  )
}

export default ContentCard