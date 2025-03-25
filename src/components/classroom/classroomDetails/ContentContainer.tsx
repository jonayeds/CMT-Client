import { getClassroomContents } from "@/services/Content"
import { IClassroom } from "@/types/classroom"
import ContentCard from "./ContentCard"
import { IContent } from "@/types/content"
import { IJwtDecodedUser } from "@/types/user"

const ContentContainer = async({classroom, currentUser}:{classroom:IClassroom, currentUser:IJwtDecodedUser}) => {
    const {data:contents} = await getClassroomContents(classroom._id)

  return (
    <div className="w-full my-12 flex flex-col gap-4">
        {
            contents?.reverse().map((content:IContent) => <ContentCard faculty={classroom.faculty} currentUser={currentUser} content={content} key={content._id}/>)
        }
    </div>
  )
}

export default ContentContainer