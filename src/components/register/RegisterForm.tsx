"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import ImageInput from "../shared/ImageInput";
import { useState } from "react";
import { uploadImage } from "@/services/imageUploader";
import { Select } from "@radix-ui/react-select";
import { SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { getUser, registerUser } from "@/services/AuthService";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";

const RegisterForm = () => {
  const [image, setImage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter()
  const {setIsLoading, setUser} = useUser()
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setLoading(true);
    setIsLoading(true)
    if (image) {
      const imageUrl = await uploadImage(image);
      data.profileImage = imageUrl;
    }
    const result = await registerUser(data)
    console.log(result)
    if(result?.success){
      toast.success(result.message)
      const user = await getUser()
      setUser(user)
      setIsLoading(false)
      router.push("/")
    }else{
      toast.error(result.message)
    }
    setLoading(false);
  };
  const form = useForm();

  return loading? <div className="flex justify-center items-center h-screen"><Loader2 className="w-10 h-10 animate-spin" /></div> : (
    <div className="bg-white shadow-lg border border-gray-100  py-4  px-8 rounded-2xl hover:shadow-md hover:shadow-gray-200 duration-500">
      <h1 className="font-serif uppercase text-2xl text-center  text-[#4EAB60]">
        Register
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6 mt-6 items-center md:min-w-xs"
        >
          <ImageInput image={image} setImage={setImage} />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="John Doe"
                    {...field}
                    value={field.value || ""}
                    className="border-gray-400"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="id"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>ID</FormLabel>
                <FormControl>
                  <Input
                    placeholder="2023000000***"
                    {...field}
                    value={field.value || ""}
                    className="border-gray-400"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="john@example.com"
                    {...field}
                    value={field.value || ""}
                    className="border-gray-400"
                  />
                </FormControl>
              </FormItem>
            )}
          />

<FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Your Role</FormLabel>
              <Select  {...field} value={field.value} onValueChange={field.onChange} >
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select your role"  />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-white border border-gray-200">
                  <SelectItem value="student">Student</SelectItem>
                  <SelectItem value="faculty">Faculty</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    {...field}
                    value={field.value || ""}
                    className="border-gray-400"
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
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default RegisterForm;
