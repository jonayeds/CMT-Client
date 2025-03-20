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


const RegisterForm = () => {
    const onSubmit:SubmitHandler<FieldValues> =(data)=>{
        console.log(data)
    }
  const form = useForm();
  return (
    <div className="bg-white shadow-md border border-gray-100 min-w-sm py-4  px-4">
        <h1 className="font-serif uppercase text-2xl text-center  text-[#4EAB60]">
          Register
        </h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} value={field.value || ""} />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="flex justify-center">

            <Button type="submit" className="rounded-lg mt-4 bg-[#4EAB60] text-white ">Submit</Button>
            </div>
          </form>
        </Form>
      </div>
  )
}

export default RegisterForm