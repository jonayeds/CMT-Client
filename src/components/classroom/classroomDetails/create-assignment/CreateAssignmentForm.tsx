/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"    
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ClassHours, ClassMinutes } from "@/constants/classroom"
import { createAssignment } from "@/services/assignment"
import { PopoverClose } from "@radix-ui/react-popover"
import { format } from "date-fns"
import { useRouter } from "next/navigation"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import { FaCalendarDays } from "react-icons/fa6"
import { toast } from "sonner"

const CreateAssignmentForm = ({classroomId}:{classroomId:string}) => {
    const form = useForm()
    const router = useRouter()
    const onSubmit:SubmitHandler<FieldValues> =async (data)=>{
      const id = toast.loading("Creating assignment...")  
      try {
        const assignment = {
            title:data.title,
            description:data.description,
            deadline:new Date(data.date.setHours(Number(data.hour), Number(data.minute),0,0)),
            totalMarks:Number(data.totalMarks),
            classroom:classroomId
        }
        const result = await createAssignment(assignment)
        console.log(result)
        if(result.success){
          toast.success(result.message, {id})
          router.push(`/my-classes/${classroomId}`)
        }else{
          toast.error(result.message, {id, description: "Please try again"})  
        }
      } catch (error) {
        toast.error( "Something went wrong", {id, description: "Please try again"}) 
      }
        

    }
  return (
    <div className="bg-white mt-8 shadow-none border mx-[5vw] border-gray-100  py-4  px-8 rounded-2xl  duration-500">
      <h1 className="font-serif uppercase text-2xl text-center  text-[#4EAB60]">
        Create Assignment
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6 mt-6 items-center min-w-[70vw] md:min-w-xs"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Textarea
                  required
                    placeholder="type here..."
                    {...field}
                    value={field.value || ""}
                    className=" bg-gray-50  placeholder:text-gray-300 border-x-0 border-t-0 rounded-md shadow-none border-b border-b-gray-300"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="describe..."
                    {...field}
                    value={field.value || ""}
                    className=" bg-gray-50 min-h-[20vh]  placeholder:text-gray-300 border-x-0 border-t-0 rounded-md shadow-none border-b border-b-gray-300"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <hr className="border-gray-100 border my-4    w-full " />
          <div className="w-full flex md:flex-row flex-col justify-between md:items-end gap-4">
            <h1 className="text-gray-500 text-center text-xl">
              Set Deadline
            </h1>

                  <div className="grid  md:grid-cols-3 grid-cols-1 gap-4 gap-y-4">
                          <FormField
                          control={form.control}
                          name="date"
                          render={({field})=>(
                              <FormItem>
                                  <FormLabel>Date</FormLabel>
                                  <Popover>
                                      <PopoverTrigger asChild>
                                          <FormControl>
                                              <Button  className="rounded-lg border-gray-400  w-full">
                                                  {
                                                      field.value? (
                                                          format(field.value, "PPP")
                                                        ) : <span>Pick a date</span>
                                                    }
                                                  <FaCalendarDays/>
                                              </Button>
                                          </FormControl>
                                      </PopoverTrigger>
                                      <PopoverContent  className="bg-white border-none">
                                          <PopoverClose asChild>
          
                                          <Calendar
                                          className=""
                                          selected={field.value}
                                          onSelect={field.onChange}
                                          initialFocus
                                          required
                                          disabled={(date)=> {
                                              const today = new Date()
                                              today.setHours(0,0,0,0)
                                              return date<today
                                            } }
                                            mode="single"
                                            />
                                          </PopoverClose>
                                      </PopoverContent>
                                  </Popover>
                              </FormItem>
                          )}
                          />
          
          <FormField
                      control={form.control}
                      name={`hour`}
                      render={({ field }) => (
                          <FormItem className="w-full">
                          <FormLabel>Hour</FormLabel>
          
                          <FormControl>
                            <Select
                            required
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
                                      <SelectItem  key={idx} value={hour} >
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
                      name={`minute`}
                      render={({ field }) => (
                          <FormItem className="w-full">
                          <FormLabel>Minute</FormLabel>
          
                          <FormControl>
                            <Select
                            required
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
                                      <SelectItem
                                      key={idx} value={minute} >
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
                      <hr className="border-gray-100 border my-4    w-full " />
          <div className="w-full flex justify-between md:flex-row flex-col gap-y-4 items-center ">
                <FormField
            control={form.control}
            name="totalMarks"
            render={({ field }) => (
              <FormItem className="md:w-[20vw] w-full">   
                <FormLabel>Total Marks</FormLabel>
                <FormControl>
                  <Input required type="number" {...field} value={field.value || ""} />
                </FormControl>
              </FormItem>
            )}
          />
              <Button
                type="submit"
                className="rounded-lg  mt-4 from-[#58c38c] hover:to-[#58c38c] hover:from-[#4EAB60] bg-gradient-to-b   transition  to-[#4EAB60]  duration-700  text-white "
              >
                Create
              </Button>
            </div>
        </form>
      </Form>
    </div>
  )
}

export default CreateAssignmentForm