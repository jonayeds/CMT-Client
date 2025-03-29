"use client"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { IoCheckmarkDone } from "react-icons/io5";
import { GoPlus } from "react-icons/go";
import { useForm } from "react-hook-form";
import { format } from "date-fns"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { FaCalendarDays } from "react-icons/fa6";
import { Calendar } from "@/components/ui/calendar";
import { PopoverClose } from "@radix-ui/react-popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ClassMinutes } from "@/constants/classroom";

const ChatRequestHandler = ({ chatId }: { chatId: string }) => {
    const form = useForm()
    const onSubmit = (data)=>{
        console.log(data)
    }
  return (
      <div className="flex items-center justify-center gap-2">
      <Dialog>
        <DialogTrigger className="bg-green-600 rounded-full p-1 text-2xl  cursor-pointer text-white">
          <IoCheckmarkDone />
        </DialogTrigger>
        <DialogContent className="bg-white border-none">

            <DialogTitle>Choose Chat Schedule</DialogTitle>
            <DialogDescription/>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>

        <div className="grid md:grid-cols-2 grid-cols-1 gap-2 gap-y-4">
                <FormField
                control={form.control}
                name="date"
                render={({field})=>(
                    <FormItem>
                        <FormLabel>Date</FormLabel>
                        <Popover>
                            <PopoverTrigger asChild>
                                <FormControl>
                                    <Button className="rounded-lg border-gray-400  w-full">
                                        {
                                            field.value? (
                                                format(field.value, "PPP")
                                            ) : <span>Pick a date</span>
                                        }
                                        <FaCalendarDays/>
                                    </Button>
                                </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="bg-white border-none">
                                <PopoverClose asChild>

                                <Calendar
                                className=""
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date)=> date < new Date()}
                                mode="single"
                                />
                                </PopoverClose>
                            </PopoverContent>
                        </Popover>
                    </FormItem>
                )}
                />
                <div></div>

<FormField
            control={form.control}
            name={`hour`}
            render={({ field }) => (
                <FormItem className="w-full">
                <FormLabel>Hour</FormLabel>

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
                        {ClassMinutes.map((minute, idx) => (
                            <SelectItem key={idx} value={minute} >
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
<FormField
            control={form.control}
            name={`minute`}
            render={({ field }) => (
                <FormItem className="w-full">
                <FormLabel>Minute</FormLabel>

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
                        {ClassMinutes.map((minute, idx) => (
                            <SelectItem key={idx} value={minute} >
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
                <div className="flex justify-end gap-2 items-center mt-4">
                    <DialogClose asChild>
                    <Button  variant={"ghost"}>Cancel</Button>

                    </DialogClose>

                <Button type="submit" className=" bg-gradient-to-br from-green-400 to-green-500 text-white border-none rounded-lg">Submit</Button>
                </div>
                </form>
            </Form>


        </DialogContent>
      </Dialog>
    <div className="bg-red-500 cursor-pointer text-white p-1 rounded-full text-2xl rotate-45"><GoPlus/></div>
    </div>
  );
};

export default ChatRequestHandler;
