import moment from "moment";

export const isTimeBeetween = (startTime:string, endTime:string)=>{
    const now = moment().format("HH:mm")
      const currentTime = now.split(":").map(t=>Number(t))
      const currentTimeInMinutes = currentTime[0] * 60 + currentTime[1]
      const startTimeNumber= startTime.split(":").map(t=>Number(t))
      const startTimeInMinutes = startTimeNumber[0] * 60 + startTimeNumber[1]
      const endTimeNumber = endTime.split(":").map(t=>Number(t))
      const endTimeInMinutes = endTimeNumber[0] * 60 + endTimeNumber[1]
      const isBetweenClassTime = (currentTimeInMinutes >= startTimeInMinutes) ? (currentTimeInMinutes <= endTimeInMinutes) : false
      return isBetweenClassTime
}