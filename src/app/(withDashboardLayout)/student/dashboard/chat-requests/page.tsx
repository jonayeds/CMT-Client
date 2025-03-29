import { DataTable } from "@/components/dashboard/attendanceStats/data-table"
import { studentRequestColumns } from "@/components/dashboard/chatRequest/studentRequestCol"

import { getMyChatRequests } from "@/services/Chat/intex"

const ChatRequestsPage = async() => {
    const {data:requests} = await getMyChatRequests()
  return (
     <div className="px-4 py-12">
            <h1 className="md:text-[4vw] font-extralight text-[7vw] text-center">
            Chat Requests
          </h1>
          <DataTable columns={studentRequestColumns} data={requests}/> 
        </div>
  )
}

export default ChatRequestsPage