"use client"
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


const RegisterForm = () => {
    const [image, setImage] = useState<string>("")
    const onSubmit:SubmitHandler<FieldValues> = async(data)=>{
        console.log(data, image)
    }
  const form = useForm();
  return (
    <div className="bg-white shadow-lg border border-gray-100  py-4  px-8 rounded-2xl hover:shadow-md hover:shadow-gray-200 duration-500">
        <h1 className="font-serif uppercase text-2xl text-center  text-[#4EAB60]">
          Register
        </h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6 mt-6 items-center md:min-w-xs">
            <ImageInput image={image} setImage={setImage} />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} value={field.value || ""} />
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
                    <Input type="email" placeholder="john@example.com" {...field} value={field.value || ""} />
                  </FormControl>
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
                    <Input type="password" placeholder="••••••••" {...field} value={field.value || ""} />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="flex justify-center">

            <Button type="submit" className="rounded-lg mt-4 from-[#58c38c] bg-gradient-to-b hover:bg-gradient-to-t   to-[#4EAB60]  duration-500  text-white ">Submit</Button>
            </div>
          </form>
        </Form>
      </div>
  )
}

export default RegisterForm