import { IClassroom } from "@/types/classroom"
import Image from "next/image"
import QRCode from "qrcode"


const QRGenaretor = async({classroom}:{classroom:IClassroom}) => {
    const qrCode = await QRCode.toDataURL(classroom._id)
  return (
    <div className="min-h-[calc(100vh-200px)] flex justify-center items-center">
        <Image src={qrCode} alt="qrCode" width={200} height={200} className="md:w-[20vw] w-[70vw]"  />
    </div>
  )
}

export default QRGenaretor