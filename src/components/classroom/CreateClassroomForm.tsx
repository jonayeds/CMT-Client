"use client";
import { FormControl } from "../ui/form";
import { useFieldArray, useForm } from "react-hook-form";
import { SubmitHandler } from "react-hook-form";
import { useEffect, useState } from "react";
import { FormField, FormItem, FormLabel } from "../ui/form";
import { FieldValues } from "react-hook-form";
import { Form } from "../ui/form";
import { Input } from "../ui/input";
import { Loader2, PlusCircle } from "lucide-react";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { ClassHours, ClassMinutes, WeekDays } from "@/constants/classroom";
import { ScrollArea } from "../ui/scroll-area";
import { createClassroom } from "@/services/Classroom";

const CreateClassroomForm = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [days,setDays] = useState<{value:string}[]>([])
    const [isAddDisabled, setIsAddDisabled] = useState<boolean>(true)

  const router = useRouter();
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
      setLoading(true);
      data.classDays = data.classDays.map((day:{value:string}) => day.value)
      data.classDays = data.classDays.filter((day:string) => day !== "")
      data.startTime = data.startTime.hour + ":" + data.startTime.minute
      data.endTime = data.endTime.hour + ":" + data.endTime.minute
    const result = await createClassroom(data);
    if (result?.success) {
      toast.success(result?.message, {duration: 3000});
      router.push("/");
      setLoading(false);
    } else {
      toast.error(result?.message, {duration: 3000});
      setLoading(false);
    }
  };
  const form = useForm({
    defaultValues: {
      courseTitle: "",
      courseCode: "",
      classDays: [{ value: "" }],
      startTime: { hour: "", minute: "" },
      endTime: { hour: "", minute: "" },
    },
  });

  const {startTime, endTime, classDays} = form.watch()
  const { append: appendClassDay, fields: classDaysFields } = useFieldArray({
    control: form.control,
    name: "classDays",
  });
  const addClassDay = () => {
    appendClassDay({ value: "" });
  };

  const handleEndHourDisabled = (hour: string)=>{
    const hourNumber = Number(hour)
    const startTimeHourNumber = Number(startTime.hour)
    if(startTimeHourNumber <= hourNumber){
      return false
    }
    else{
      return true
    }
  }
  const handleEndMinuteDisabled = (minute: string)=>{
    const minuteNumber = Number(minute)
    const startTimeHourNumber = Number(startTime.hour)
    const endTimeHourNumber = Number(endTime.hour)
    const startTimeMinuteNumber = Number(startTime.minute)
    if(startTimeMinuteNumber < minuteNumber){
      return false
    }else if(startTimeMinuteNumber >= minuteNumber){
        if(startTimeHourNumber === endTimeHourNumber){
            return true
        }else{
            return false
        }
    }
}
  const handleClassDayDisabled = (classDay:string)=>{
    const  isDisabled = classDays.find(day => day.value === classDay)
    if(isDisabled){
        return true
    }else{
        return false
    }
  }
  useEffect(()=>{
    const days = classDays.filter(day => day.value !== "")
    if(classDaysFields.length >= 7){
        setIsAddDisabled(true)
    }else if(classDaysFields.length > days.length ){
        setIsAddDisabled(true)
    }else{
        setIsAddDisabled(false)
    }
  },[classDaysFields.length, classDays, days])
  const onChangeDay = ()=>{
    const days = classDays.filter(day => day.value !== "")
    setDays(days)
  }
 
  return loading ? (
    <div className="flex justify-center items-center h-screen">
      <Loader2 className="w-10 h-10 animate-spin" />
    </div>
  ) : (
    <div className="bg-white shadow-md border border-gray-100  py-4  px-8 rounded-2xl hover:shadow-xl hover:shadow-gray-200 duration-500">
      <h1 className="font-serif uppercase text-2xl text-center  text-[#4EAB60]">
        Create Classroom
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6 mt-6 items-center min-w-[80vw] md:min-w-xs"
        >
          <FormField
            control={form.control}
            name="courseTitle"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Course Title</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Data Structure"
                    {...field}
                    value={field.value || ""}
                    className="border-gray-400 placeholder:text-gray-300"
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="courseCode"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Course Code</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="CSE101.1"
                    {...field}
                    value={field.value || ""}
                    className="border-gray-400 placeholder:text-gray-300"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <hr className="w-full border-gray-200" />
          <div className="flex flex-col gap-3 w-full">

          <div className="flex items-center justify-between w-full ">
            <h1 className="text-lg font-semibold">Class Days</h1>
            <Button
            disabled={isAddDisabled}
              variant="outline"
              type="button"
              size="icon"
              onClick={addClassDay}
              className="disabled:text-gray-300"
              >
              <PlusCircle className="w-4 h-4" />
            </Button>
          </div>
          {classDaysFields.map((day, idx) => (
              <FormField
              key={idx}
              control={form.control}
              name={`classDays.${idx}.value`}
              render={({ field }) => (
                  <FormItem className="w-full duration-100">
                  <FormLabel></FormLabel>

                  <FormControl>
                    <Select
                      {...field}
                      value={field.value}
                      onValueChange={(e)=>{
                        field.onChange(e)
                        onChangeDay()
                      }}
                      
                      >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue
                            placeholder={`Select Class Day ${idx + 1}`}
                            />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-white border border-gray-200">
                        {
                            WeekDays.map((day)=>(
                                <SelectItem key={day} value={day} disabled={handleClassDayDisabled(day)}>{day}</SelectItem>
                            ))
                        }
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
              />
            ))}
            </div>
          <hr className="w-full border-gray-200" />
          <div className="flex flex-col gap-3 w-full">

          <h1 className="text-lg w-full font-semibold">Class Start time</h1>
          <div className="flex items-center justify-start gap-3 w-full">

          <FormField
            control={form.control}
            name={`startTime.hour`}
            render={({ field }) => (
                <FormItem className="w-full">
                <FormLabel></FormLabel>

                <FormControl>
                  <Select

                    {...field}
                    value={field.value}
                    onValueChange={field.onChange}
                    >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder={`Hour`} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-white border border-gray-200">
                      <ScrollArea className="h-[20vh]">
                        {ClassHours.map((hour, idx) => (
                            <SelectItem key={idx} value={hour}>
                            {hour}
                          </SelectItem>
                        ))}
                      </ScrollArea>
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
            />
          <FormField
            control={form.control}
            name={`startTime.minute`}
            render={({ field }) => (
                <FormItem className="w-full">
                <FormLabel></FormLabel>

                <FormControl>
                  <Select
                    {...field}
                    value={field.value}
                    onValueChange={field.onChange}
                    >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder={`Minute`} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-white border border-gray-200">
                      <ScrollArea className="h-[20vh]">
                        {ClassMinutes.map((hour, idx) => (
                            <SelectItem key={idx} value={hour}>
                            {hour}
                          </SelectItem>
                        ))}
                      </ScrollArea>
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
            />
            </div>
            </div>
          <div className="flex flex-col gap-3 w-full">

          <h1 className="text-lg w-full font-semibold">Class End time</h1>
          <div className="flex items-center justify-start gap-3 w-full">

          <FormField
            control={form.control}
            name={`endTime.hour`}
            render={({ field }) => (
                <FormItem className="w-full">
                <FormLabel></FormLabel>

                <FormControl>
                  <Select
                    disabled={startTime.hour && startTime.minute? false: true}
                    {...field}
                    value={field.value}
                    onValueChange={field.onChange}
                    >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder={`Hour`} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-white border border-gray-200">
                      <ScrollArea className="h-[20vh]">
                        {ClassHours.map((hour, idx) => (
                            <SelectItem key={idx} value={hour} disabled={handleEndHourDisabled(hour)}>
                            {hour}
                          </SelectItem>
                        ))}
                      </ScrollArea>
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
            />
            
          <FormField
            control={form.control}
            name={`endTime.minute`}
            render={({ field }) => (
                <FormItem className="w-full">
                <FormLabel></FormLabel>

                <FormControl>
                  <Select
                  disabled={startTime.hour && startTime.minute? false: true}
                    {...field}
                    value={field.value}
                    onValueChange={field.onChange}
                    >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder={`Minute`} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-white border border-gray-200">
                      <ScrollArea className="h-[20vh]">
                        {ClassMinutes.map((minute, idx) => (
                            <SelectItem key={idx} value={minute} disabled={handleEndMinuteDisabled(minute)}>
                            {minute}
                          </SelectItem>
                        ))}
                      </ScrollArea>
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
            />
            </div>
            </div>

          <div className="flex justify-center">
            <Button
              type="submit"
              disabled={classDays.length<1 || startTime.hour === "" || startTime.minute === "" || endTime.hour === "" || endTime.minute === ""}
              className="rounded-lg mt-4 from-[#58c38c] hover:to-[#58c38c] hover:from-[#4EAB60] bg-gradient-to-b  transition  to-[#4EAB60]  duration-700  text-white "
            >
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreateClassroomForm;
