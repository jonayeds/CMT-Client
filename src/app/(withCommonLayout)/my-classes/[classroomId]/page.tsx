import ClassroomBanner from "@/components/classroom/classroomDetails/ClassroomBanner";
import ContentContainer from "@/components/classroom/classroomDetails/ContentContainer";
import MarkAttendance from "@/components/classroom/attendance/MarkAttendance";
import PeopleList from "@/components/classroom/classroomDetails/PeopleList";
import UploadContentForm from "@/components/classroom/classroomDetails/UploadContentForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getUserFromCookies } from "@/services/AuthService";
import { getASingleClassroom, getClassStudents } from "@/services/Classroom";
import { IJwtDecodedUser } from "@/types/user";

const ClassroomDetailPage = async ({params}:{params:Promise<{classroomId:string}>}) => {
  const { classroomId } = await params;
  const user = await getUserFromCookies();
  const role = user?.role;
  const { data: classroom } = await getASingleClassroom(classroomId);
  const { data: students } = await getClassStudents(classroomId);
  const tabTrigger =
    "data-[state=active]:shadow-none data-[state=active]:text-green-600 data-[state=active]:border-b-2 duration-300 md:data-[state=active]:text-lg data-[state=active]:text-[4vw] transition-all md:text-sm text-[3vw]  data-[state=active]:border-green-500 border-0 rounded-none py-5 ";
  if (!classroom) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-96px)]">
        <p>Classroom Not found !</p>
      </div>
    );
  }
  return (
    <div className="container mx-auto px-4 mt-10">
      <Tabs defaultValue="class-content" className="">
        <TabsList className="flex relative md:gap-8 min-h-12 gap-[1vw]  max-w-[90vw] overflow-x-auto overflow-y-hidden">
          <TabsTrigger value="class-content" className={tabTrigger}>
            Class Materials
          </TabsTrigger>
          {role === "faculty" ? (
            <TabsTrigger className={tabTrigger} value="upload">
              Upload
            </TabsTrigger>
          ) : (
            <TabsTrigger className={tabTrigger} value="attendance">
              Mark Attendance
            </TabsTrigger>
          )}

          <TabsTrigger className={tabTrigger} value="people">
            People
          </TabsTrigger>
        </TabsList>
        <hr className="border-gray-200 border mb-4 -mt-2   w-full " />

        <TabsContent value="class-content">
          <ClassroomBanner role={role as string} classroom={await classroom} />
          <ContentContainer
            currentUser={user as IJwtDecodedUser}
            classroom={classroom}
          />
        </TabsContent>
        {role === "faculty" ? (
          <TabsContent value="upload">
            <UploadContentForm classroomId={classroom._id.toString()} />
          </TabsContent>
        ) : (
          <TabsContent value="attendance">
            <MarkAttendance classroom={classroom} />
          </TabsContent>
        )}
        <TabsContent value="people">
          <PeopleList
            students={students}
            faculty={classroom.faculty}
            currentUser={user as IJwtDecodedUser}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ClassroomDetailPage;
