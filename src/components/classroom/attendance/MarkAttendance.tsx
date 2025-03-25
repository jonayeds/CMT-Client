import { IClassroom } from "@/types/classroom"
import QRGenaretor from "./QRGenaretor"

const MarkAttendance = ({classroom}:{classroom:IClassroom}) => {
  return (
    <div>
      <QRGenaretor classroom={classroom}/>
    </div>
  )
}

export default MarkAttendance