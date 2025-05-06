import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { IAttendance } from "@/types/attendance"
import { IJwtDecodedUser, IUser } from "@/types/user"

const PeopleList = ({students, faculty, currentUser}:{students:IAttendance[], faculty:IUser, currentUser:IJwtDecodedUser}) => {
    return (
    <div className="md:max-w-[70vw] max-w-[90vw] mx-auto">
        <div className="mt-8">
            <h1 className="md:text-[3vw] lg:text-[2.5vw] px-4 uppercase font-light text-[8vw] sm:text-[6vw]">Faculty</h1>
        <hr  className="border-gray-200 my-4"/>
        <div className="flex items-center gap-3 px-4">
            <Avatar className="border border-gray-200">
                <AvatarImage src={faculty?.profileImage}/>
                <AvatarFallback>{faculty.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <p className=""> {faculty.name}  {(currentUser.role === "faculty") && <span className="text-xs tracking-wider ml-1">(you)</span>}</p>
        </div>
        </div>
        <div className="mt-16">
            <div className="flex items-center justify-between">

        <h1 className="md:text-[3vw] font-light text-[7vw] sm:text-[6vw] lg:text-[2.5vw] px-4 uppercase  ">{currentUser.role === "student"? "Classmates":"Students"}</h1>
        <p className="text-sm text-gray-500 truncate">{students.length} students</p>
            </div>
        <hr  className="border-gray-200 mt-4"/>
        <div className="divide-gray-200 divide-y ">

        {
            students.map(attendance=> <div key={attendance._id} className="flex justify-between items-center py-4 gap-3 px-4 ">
                <div className="flex gap-3 items-center ">

                <Avatar className="border border-gray-200">
                    <AvatarImage src={attendance.student?.profileImage}/>
                    <AvatarFallback>{attendance.student.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <p className="md:text-sm text-[3vw] truncate"><span className="">{attendance.student.name} </span> {(currentUser._id === attendance.student._id) && <span className="text-xs tracking-wider ml-1">(you)</span>}</p>
                </div>
                <div className="flex items-center md:gap-4 gap-2">
                    <span className="bg-green-100 px-2 py-1 text-xs rounded-lg md:flex hidden text-gray-600">Present: {attendance.present}</span>
                    <span className="bg-green-100 px-2 py-1 text-[2vw] rounded-lg md:hidden flex text-gray-600">P... {attendance.present}</span>
                    <span className="bg-red-100 px-2 py-1 text-xs rounded-lg md:flex hidden text-gray-600">Absent: {attendance.absent}</span>
                    <span className="bg-red-100 px-2 py-1 text-[2vw] rounded-lg md:hidden flex text-gray-600">A... {attendance.absent}</span>
                    <span className="bg-yellow-100 px-2 py-1 text-xs rounded-lg md:flex hidden text-gray-600">Late: {attendance.late}</span>
                    <span className="bg-yellow-100 px-2 py-1  rounded-lg text-[2vw] md:hidden flex text-gray-600">L... {attendance.late}</span>
                </div>
            </div>)
        }
        
        </div>
        </div>
    </div>
  )
}

export default PeopleList