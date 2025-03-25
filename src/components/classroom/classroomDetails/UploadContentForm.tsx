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
import { Textarea } from "@/components/ui/textarea";
import {
  uploadClassroomContent,
  uploadContentToDropbox,
} from "@/services/Content/contentUpload";
import { Loader2, X } from "lucide-react";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

const UploadContentForm = ({ classroomId }: { classroomId: string }) => {
  const [files, setFiles] = useState<File[]>([]);
  const [links, setLinks] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  // const router = useRouter()
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    data.contentLinks = links;
    setLoading(true);
    const { fileUrls } = await uploadContentToDropbox(files);
    console.log(fileUrls);
    data.contentFiles = fileUrls;
    data.classroom = classroomId;
    console.log(data.contentFiles);
    if (files.length>0 && data.contentFiles?.length === 0) {
      toast.error("File was not uploaded to cloud!!");
      return;
    }
    const result = await uploadClassroomContent(data);
    console.log(result);
    if (result?.success) {
      toast.success(result?.message);
    } else {
      toast.error(result?.message);
    }
    setLoading(false);
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
            name="title"
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
          <div className="w-full grid lg:grid-cols-3 md:grid-cols-2 gap-4 grid-cols-1">
            {files?.map((file, idx) => (
              <div
                key={idx}
                className="flex w-full  flex-col border-gray-200 border  px-8 py-4 rounded-xl relative "
              >
                <div
                  onClick={() =>
                    setFiles((prev) => prev.filter((p, i) => i !== idx))
                  }
                  className="absolute cursor-pointer top-2 right-2  text-gray-700"
                >
                  <X />
                </div>
                <span className="hover:underline  truncate">{file?.name}</span>
                <span className="text-gray-600 opacity-80 truncate">
                  {file.type === "application/pdf" ||file.type === "image/jpeg"
                    ? file?.type.split("/")[file.type.split("/").length - 1]
                    : file?.type.split(".")[file.type.split(".").length - 1]}
                  {" "}File
                </span>
              </div>
            ))}
          </div>
          {links.length > 0 && (
            <hr className="border-gray-100 border my-4  w-full " />
          )}

          <div className="w-full grid lg:grid-cols-3 md:grid-cols-2 gap-4 grid-cols-1">
            {links.map((link, idx) => (
              <div
                key={idx}
                className="flex w-full relative  flex-col border-gray-200 border  px-8 py-4 rounded-xl  "
              >
                <div
                  onClick={() =>
                    setLinks((prev) => prev.filter((p, i) => i !== idx))
                  }
                  className="absolute cursor-pointer top-2 right-2  text-gray-700"
                >
                  <X />
                </div>
                <p className="font-light text-lg">Link {idx + 1}</p>
                <a
                  href={link}
                  target="#"
                  className="hover:underline text-blue-500 truncate"
                >
                  {link}
                </a>
              </div>
            ))}
          </div>
          <hr className="border-gray-100 border my-4    w-full " />
          <div className="w-full flex justify-between items-center ">
            <div className="flex gap-2">
              <FileInput setFiles={setFiles} />
              <LinkInput setLinks={setLinks} />
            </div>
            <div className="flex justify-center">
              <Button
                type="submit"
                disabled={
                  (links.length < 1 && files.length < 1) ||
                  links.length + files.length > 10
                }
                className="rounded-lg  mt-4 from-[#58c38c] hover:to-[#58c38c] hover:from-[#4EAB60] bg-gradient-to-b   transition  to-[#4EAB60]  duration-700  text-white "
              >
                Upload
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default UploadContentForm;
