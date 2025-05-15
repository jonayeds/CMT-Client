import AssignmentDetails from "@/components/classroom/classroomDetails/assignment/AssignmentDetails";
import { geASingleAssignment} from "@/services/assignment";

const AssignmentPage = async({params}:{params:Promise<{classroomId:string, assignmentId:string}>}) => {
    const { assignmentId } = await params;
    const {data:assignment} = await geASingleAssignment(assignmentId)
  return (
    <div>
        <AssignmentDetails   assignment={assignment} />
    </div>
  )
}

export default AssignmentPage