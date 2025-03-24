import ClassroomBanner from "@/components/classroom/classroomDetails/ClassroomBanner";
import UploadContentForm from "@/components/classroom/classroomDetails/UploadContentForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getASingleClassroom } from "@/services/Classroom";

const ClassroomDetailPage = async ({
  params,
}: {
  params: { classroomId: string };
}) => {
  const { classroomId } = await params;
  const { data: classroom } = await getASingleClassroom(classroomId);
  const tabTrigger = "data-[state=active]:shadow-none data-[state=active]:text-green-600 data-[state=active]:border-b-2 duration-300 data-[state=active]:text-lg transition-all  data-[state=active]:border-green-500 border-0 rounded-none py-5 "
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
        <TabsList className="flex relative gap-8 ">
          <TabsTrigger
            value="class-content"
            className={tabTrigger}
          >
            Class Materials
          </TabsTrigger>
          <TabsTrigger className={tabTrigger} value="upload">Upload</TabsTrigger>
          <TabsTrigger className={tabTrigger} value="people">People</TabsTrigger>
        </TabsList>
        <hr className="border-gray-200 border mb-4 -mt-2   w-full " />

        <TabsContent value="class-content">
          <ClassroomBanner classroom={await classroom} />
        </TabsContent>
        <TabsContent value="upload">
          <UploadContentForm classroomId={classroom._id.toString()}/>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ClassroomDetailPage;
