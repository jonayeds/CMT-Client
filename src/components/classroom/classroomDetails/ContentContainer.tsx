import { getClassroomContents } from "@/services/Content"
import { IClassroom } from "@/types/classroom"
import ContentCard from "./ContentCard"
import { IContent } from "@/types/content"
import { IJwtDecodedUser } from "@/types/user"
import { getClassroomAssignments } from "@/services/assignment"
import { IAssignment } from "@/types/assignment"
import AssignmentCard from "./assignment/AssignmentCard"

const ContentContainer = async({classroom, currentUser}:{classroom:IClassroom, currentUser:IJwtDecodedUser}) => {
    const {data:contents} = await getClassroomContents(classroom._id)
    const {data:assignments} = await getClassroomAssignments(classroom._id)
    const allContents = [...contents, ...assignments]
    allContents.sort((a:IContent|IAssignment , b:IContent | IAssignment) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

  return (
    <div className="w-full my-12 flex flex-col gap-4">
        {
            allContents?.map((content:IContent | IAssignment) => <div key={content._id} >
            {
              Object.keys(content).includes('totalMarks') ? <AssignmentCard classroom={classroom} assignment={content as IAssignment} /> :<ContentCard faculty={classroom.faculty} currentUser={currentUser} content={content as IContent} /> 
            }
            </div>)
        }
    </div>
  )
}

export default ContentContainer