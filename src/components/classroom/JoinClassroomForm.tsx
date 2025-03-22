"use client"

import { useForm } from "react-hook-form";
import { SubmitHandler } from "react-hook-form";

import { FieldValues } from "react-hook-form";


import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useUser } from "@/context/UserContext";
import { joinClassroom } from "@/services/Classroom";
const JoinClassroomForm = () => {
    const {isLoading, setIsLoading} = useUser()
    const router = useRouter()
    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        setIsLoading(true)
      const result = await joinClassroom(data)
          if(result?.success){
            toast.success(result?.message)
            setIsLoading(false)
            router.push("/")
          }else{
            toast.error(result?.message)
            setIsLoading(false)
          }
    };
    const form = useForm();
  
    return  (

      <div className="bg-white shadow-lg border border-gray-100  py-4  px-8 rounded-2xl hover:shadow-md hover:shadow-gray-200 duration-500 relative overflow-hidden" >
        {
            isLoading && <div className="bg-white absolute top-0 left-0  w-full h-full flex items-center justify-center">
            <div className="flex justify-center items-center h-screen"><Loader2 className="w-10 h-10 animate-spin" /></div>
            </div>
        }
        
        <h1 className="font-serif uppercase text-2xl text-center  text-[#4EAB60]">
          Join Classroom
        </h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-6 mt-6 items-center min-w-[80vw] md:min-w-xs"
          >
            <FormField
              control={form.control}
              name="joiningCode"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Joining Code</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="****"
                      {...field}
                      value={field.value || ""}
                      className="border-gray-400 placeholder:text-gray-300"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
  
            
            <div className="flex justify-center">
              <Button
                type="submit"
                className="rounded-lg mt-4 from-[#58c38c] bg-gradient-to-b hover:bg-gradient-to-t   to-[#4EAB60]  duration-500  text-white "
              >
                Join
              </Button>
            </div>
          </form>
        </Form>
      </div>
    );
}

export default JoinClassroomForm