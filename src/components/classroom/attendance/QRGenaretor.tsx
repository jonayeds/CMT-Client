import { getASingleClassroom } from "@/services/Classroom";
import { IClassroom } from "@/types/classroom";
import { isTimeBeetween } from "@/utils/classroom";
import { Dot } from "lucide-react";
import moment from 'moment-timezone';
import Image from "next/image";
import QRCode from "qrcode";

const QRGenaretor = async ({ classroomId }: { classroomId: string }) => {
  const { data: classroom }: { data: IClassroom } = await getASingleClassroom(
    classroomId
  );
  const localTime = moment().tz('Asia/Dhaka');
  const today = localTime.format('dddd');
  const now = localTime.format("HH:mm");
  let qrCode;
  const isBetweenClassTime = isTimeBeetween(
    classroom.startTime,
    classroom.endTime
  );
  if (classroom.classDays.includes(today) && isBetweenClassTime) {
    qrCode = await QRCode.toDataURL(classroomId);
  }

  return (
    <div className="min-h-[calc(100vh-300px)] flex justify-center items-center">
      {qrCode ? (
        <Image
          src={qrCode}
          alt="qrCode"
          width={200}
          height={200}
          className="md:w-[20vw] w-[70vw]"
        />
      ) : (<>
        <p className="text-gray-500 font-light text-lg md:text-2xl flex items-end gap-0">
          Class not started yet
          <Dot className="animate-bounce relative top-2 duration-100" />{" "}
          <Dot className="animate-bounce relative top-2 right-3 duration-100 delay-150" />
          <Dot className="animate-bounce relative top-2 right-6 duration-100 delay-300" />
        </p>
        <p> time is:{today} at {now} but class at {classroom.startTime}-{classroom.endTime}</p>
      </>
      )}
    </div>
  );
};

export default QRGenaretor;
