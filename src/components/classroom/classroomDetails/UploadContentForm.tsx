"use client";

import FileInput from "@/components/shared/FileInput";
import LinkInput from "@/components/shared/LinkInput";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/router";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

const UploadContentForm = () => {
    const [files, setFiles] = useState<{name:string, url:string,type:string}[]>([])
  const [loading, setLoading] = useState<boolean>(false);
  // const router = useRouter()
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
    //   setLoading(true);
    //   const result = await loginUser(data)
    //       if(result?.success){
    //         toast.success(result?.message)
    //         router.push("/")
    //       }else{
    //         toast.error(result?.message)
    //       }
    //   setLoading(false);
  };
  const form = useForm();
  return loading ? (
    <div className="flex justify-center items-center h-screen">
      <Loader2 className="w-10 h-10 animate-spin" />
    </div>
  ) : (
    <div className="bg-white shadow-none border border-gray-100  py-4  px-8 rounded-2xl  duration-500">
      <h1 className="font-serif uppercase text-2xl text-center  text-[#4EAB60]">
        Upload Content
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6 mt-6 items-center min-w-[80vw] md:min-w-xs"
        >
          <FormField
            control={form.control}
            name="identification"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Textarea
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
            name="identification"
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
          <div className="w-full grid lg:grid-cols-3 md:grid-cols-2 gap-4 grid-cols-1">
            {
                files?.map((file,idx)=><div key={idx} className="flex w-full  flex-col border-gray-200 border  px-8 py-4 rounded-xl  ">
                <span className="hover:underline  truncate">{file?.name}</span>
                <span className="text-gray-600 opacity-80">
                  {file?.type} File
                </span>
              </div>)
            }
            
          </div>
          <div className="w-full flex gap-2">
            <FileInput setFiles={setFiles} />
            <LinkInput/>
          </div>

          <div className="flex justify-center">
            <Button
              type="submit"
              className="rounded-lg mt-4 from-[#58c38c] hover:to-[#58c38c] hover:from-[#4EAB60] bg-gradient-to-b    transition  to-[#4EAB60]  duration-700  text-white "
            >
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default UploadContentForm;
