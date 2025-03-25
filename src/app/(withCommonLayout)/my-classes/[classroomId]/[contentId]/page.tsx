import { getUserFromCookies } from "@/services/AuthService"
import { getASingleClassroom } from "@/services/Classroom"
import { getASingleContent } from "@/services/Content"
import { IClassroom } from "@/types/classroom"
import { IContent } from "@/types/content"
import {  ChevronLeft, Dot, NotebookIcon } from "lucide-react"
import moment from "moment"
import Link from "next/link"

const ContentDetailsPage = async({params}:{params:{contentId:string, classroomId:string}}) => {
    const {contentId,classroomId} = await params
    const {data:content}:{data:IContent}  = await getASingleContent(contentId)
    const {data:classroom}:{data:IClassroom} = await getASingleClassroom(classroomId)
    const user = await getUserFromCookies()
    const uploadedAt = moment(content.createdAt)
  return (
    <div className="container mx-auto mt-0 px-2 ">
        <div className="mb-6 flex items-center hover:text-green-600 duration-300 w-max">
            <ChevronLeft/>
            <Link href={`/my-classes/${classroomId}`}>Back</Link>
        </div>
        <div className="flex items-center gap-4 ">
            <NotebookIcon className="size-12 text-white p-3 rounded-full bg-green-600"/>
        <div>

        <h1 className="md:text-[3vw] text-[5vw] font-extralight md:leading-[5vh] leading-[3vh] truncate">{content.title}</h1>
        <div className="flex items-center gap-2 sm:text-sm text-xs text-gray-500">
            {
                (user?.role === "student" ) && <p className="flex items-center">{classroom.faculty.name} <Dot className="ml-2"/></p>
            }
            
            <p className="">{uploadedAt.fromNow()}</p>
        </div>
        </div>
        </div>
            <p className="my-6 text-gray-500 text-sm">{content.description}</p>
        <hr  className="border-gray-200 my-4 "/>
        <div className="grid md:grid-cols-2 grid-cols-1 md:max-w-[70vw] max-w-[90vw] gap-6 mx-auto">
            {
                content.contentFiles.map((file,idx) => <a href={file} target="#" key={idx} className="border-gray-300 truncate group rounded-lg px-6 border py-3 ">
                    <p  className=" group-hover:text-green-600" >{file.split("/").pop()?.split("?")[0]}</p>
                    <p className="text-sm text-gray-500">{file.split("/").pop()?.split("?")[0].split(".").pop()} File</p>
                </a>)
            }
        </div>
        <hr  className="border-gray-200 my-8 max-w-[80vw]  mx-auto"/>
        <div className="grid md:grid-cols-2 grid-cols-1 md:max-w-[70vw] max-w-[90vw]  gap-6 mx-auto">
            {
                content.contentLinks.map((link,idx) => <a href={link}  target="#" key={idx} className="border-gray-300 truncate rounded-lg px-6 border py-5 hover:text-green-600 duration-300 ">
                    <p  className="truncate " >{link}</p>
                </a>)
            }
        </div>
    </div>
  )
}

export default ContentDetailsPage