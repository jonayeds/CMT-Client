import { DataTable } from "@/components/dashboard/attendanceStats/data-table"
import { requestColumns } from "@/components/dashboard/chatRequest/requestColumn"
import { getMyChatRequests } from "@/services/Chat/intex"

export const dynamic = "force-dynamic"

const ChatRequests = async() => {
    const {data:requests} = await getMyChatRequests()

  return (
    <div className="px-4 py-12">
        <h1 className="md:text-[4vw] font-extralight text-[7vw] text-center">
        Chat Requests
      </h1>
      <DataTable columns={requestColumns} data={requests}/> 
    </div>
  )
}

export default ChatRequests