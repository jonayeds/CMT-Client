import ClassroomCard from "@/components/classroom/ClassroomCard"
import { getMyClasses } from "@/services/Classroom"
import { IClassroom } from "@/types/classroom"

const MyClassesPage = async() => {
    const myClasses = await getMyClasses()
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6  px-4 container mx-auto mt-12">
        <h1 className="font-serif uppercase text-2xl text-center md:col-span-2 col-span-1 lg:hidden  text-[#4EAB60]">
          My Classes
        </h1>
        {
            myClasses?.data?.map((classroom:IClassroom)=>(
                <ClassroomCard key={classroom._id} classroom={classroom}/>
            ))
        }
    </div>
  )
}

export default MyClassesPage