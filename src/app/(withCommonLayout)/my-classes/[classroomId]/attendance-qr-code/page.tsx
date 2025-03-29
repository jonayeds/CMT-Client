import QRGenaretor from "@/components/classroom/attendance/QRGenaretor"

const AttendanceQrCodePage = async({params}:{params:Promise<{classroomId:string}>}) => {
    const {classroomId} =await params
  return (
    <div>
        <QRGenaretor classroomId={classroomId} />
    </div>
  )
}

export default AttendanceQrCodePage