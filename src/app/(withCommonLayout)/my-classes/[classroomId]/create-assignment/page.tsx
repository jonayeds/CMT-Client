import CreateAssignmentForm from "@/components/classroom/classroomDetails/create-assignment/CreateAssignmentForm"

const CreateAssignmentPage = async({params}:{params:Promise<{classroomId:string}>}) => {
    const { classroomId } = await params;

  return (
    <div>
        <CreateAssignmentForm classroomId={classroomId} />    
    </div>
  )
}

export default CreateAssignmentPage