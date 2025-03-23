import ClassroomBanner from "@/components/classroom/classroomDetails/ClassroomBanner"
import { getASingleClassroom } from "@/services/Classroom"

const ClassroomDetailPage = async({params}:{params:{classroomId:string}}) => {
  const {classroomId} = await params
  const {data:classroom} = await getASingleClassroom(classroomId)
  if(!classroom){
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-96px)]">
        <p>Classroom Not found !</p>
        </div>
    )
  }
  return (
    <div className="container mx-auto px-4 mt-10">
      <ClassroomBanner classroom={ await classroom}/>
    </div>
  )
}

export default ClassroomDetailPage