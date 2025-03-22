"use client"
import { FormControl } from "../ui/form";
import { useForm } from "react-hook-form";
import { SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { FormField, FormItem, FormLabel } from "../ui/form";
import { FieldValues } from "react-hook-form";
import { Form } from "../ui/form";
import { Input } from "../ui/input";
import { Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import { loginUser } from "@/services/AuthService";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
const LoginForm = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter()
    const {setUser} = useUser()
    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        console.log(data)
      setLoading(true);
      const result = await loginUser(data)
          if(result?.success){
            toast.success(result?.message)
            setUser(result?.data?.data)
            router.push("/")
          }else{
            toast.error(result?.message)
          }
      setLoading(false);
    };
    const form = useForm();
  
    return loading? <div className="flex justify-center items-center h-screen"><Loader2 className="w-10 h-10 animate-spin" /></div> : (
      <div className="bg-white shadow-lg border border-gray-100  py-4  px-8 rounded-2xl hover:shadow-md hover:shadow-gray-200 duration-500">
        <h1 className="font-serif uppercase text-2xl text-center  text-[#4EAB60]">
          Login
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
                  <FormLabel>Email or ID</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
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
}

export default LoginForm