import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { IAttendance } from "@/types/attendance"
import { IUser } from "@/types/user"

const PeopleList = ({students, faculty,role}:{students:IAttendance[], faculty:IUser, role:string}) => {
    return (
    <div className="max-w-[70vw] mx-auto">
        <div className="mt-8">
            <h1 className="md:text-[4vw] lg:text-[3vw] px-4 uppercase font-serif text-[6vw]">Faculty</h1>
        <hr  className="border-gray-200 my-4"/>
        <div className="flex items-center gap-3 px-4">
            <Avatar className="border border-gray-200">
                <AvatarImage src={faculty?.profileImage}/>
                <AvatarFallback>{faculty.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <p className=""> {faculty.name}</p>
        </div>
        </div>
        <div className="mt-16">
        <h1 className="md:text-[4vw] lg:text-[3vw] px-4 uppercase font-serif text-[6vw]">{role === "students"? "Classmates":"Students"}</h1>
        <hr  className="border-gray-200 my-4"/>
        <div className="divide-gray-200 divide-y ">

        {
            students.map(attendance=> <div key={attendance._id} className="flex items-center py-4 gap-3 px-4 ">
                <Avatar className="border border-gray-200">
                    <AvatarImage src={attendance.student?.profileImage}/>
                    <AvatarFallback>{attendance.student.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <p className="">{attendance.student.name}</p>
            </div>)
        }
        {
            students.map(attendance=> <div key={attendance._id} className="flex items-center  gap-3 py-4 px-4">
                <Avatar className="border border-gray-200">
                    <AvatarImage src={attendance.student?.profileImage}/>
                    <AvatarFallback>{attendance.student.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <p className="">{attendance.student.name}</p>
            </div>)
        }
        </div>
        </div>
    </div>
  )
}

export default PeopleList