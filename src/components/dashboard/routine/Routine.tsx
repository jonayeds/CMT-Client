import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { WeekDays } from "@/constants/classroom";
import { IClassroom } from "@/types/classroom";
import CountDown from "./CountDown";
import { MdArrowDropDown } from "react-icons/md";

import moment from "moment";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const Routine = ({ classes }: { classes: IClassroom[] }) => {
  const today = moment().format("dddd")
  console.log(today)
  const sortClassTime =(a:IClassroom,b:IClassroom)=>{
    const aStartTime = a.startTime.split(":")
    const aStartMinutes = Number(aStartTime[0]) * 60 + Number(aStartTime[1])
    const bStartTime = b.startTime.split(":")
    const bStartMinutes = Number(bStartTime[0]) * 60 + Number(bStartTime[1])
    return aStartMinutes -bStartMinutes
  }
  return (
    <div className="py-12 px-4">
      <h1 className="md:text-[4vw] font-extralight text-[7vw] text-center">
        Class Routine
      </h1>
      <div className="mt-8 overflow-auto">
        <Tabs className=""  defaultValue={today}>
          <TabsList className="w-full md:flex justify-around hidden">
            {WeekDays.map((day) => (
              <TabsTrigger key={day} value={day}>
                {day}
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsList className="md:hidden flex  mx-auto">
            <DropdownMenu >
            <DropdownMenuTrigger  className="border-none cursor-pointer  flex justify-center px-4 py-2 border border-gray-300 rounded-lg outline-none ">
        <p className=" border  border-gray-300 px-3 py-1 rounded-md   flex items-center  gap-1">Open <MdArrowDropDown/></p>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {
          WeekDays.map((day) => (
            <DropdownMenuItem key={day}>
              <TabsTrigger  value={day}>
              {day}
            </TabsTrigger>
            </DropdownMenuItem>
          ))
        }
      </DropdownMenuContent>
            </DropdownMenu>
          </TabsList>
          {
            WeekDays.map(day=><TabsContent key={day} value={day} className="px-[10vw] mt-16 ">
              <div className="grid grid-cols-3  text-green-700 font-semibold text-lg gap-2">
                <p className="truncate">Couse Title</p>
                <p className="flex justify-center">Schedule</p>
                <p className="flex justify-end "><span className="truncate">Time remaining</span></p>
              </div>
              <hr className="w-full border border-gray-100 my-2"/>
              <div className="">
                {
                  classes.sort(sortClassTime).map((classroom:IClassroom)=><div key={classroom._id}>
                    {
                      classroom.classDays.includes(day) && <div className="mt-4  grid grid-cols-3 items-center gap-2">
                            
                            <p className="text-sm truncate">{classroom.courseTitle}</p>
                            <p className="flex justify-center text-sm "><span className="truncate">{classroom.startTime} - {classroom.endTime}</span></p>
                            {
                              today === day ? <CountDown startTime={classroom.startTime} endTime={classroom.endTime}/> : <span className="flex justify-end">...</span>
                            }
                            

                      </div> 
                    }
                  </div>)
                }

              </div>
            </TabsContent>)
          }
        </Tabs>
      </div>
    </div>
  );
};

export default Routine;
