/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import moment from "moment"
import { useEffect, useState } from "react"

const CountDown = ({startTime, endTime}:{startTime:string, endTime:string}) => {
    const [startHour, startMinute] = startTime.split(":").map(Number)
    const [endHour, endMinute] = endTime.split(":").map(Number)
    const [timeDiff, setTimeDiff] = useState<string | null>(null)
    const targetTimeStart = moment().set({hour:startHour, minute:startMinute, second:0,millisecond:0})
    const targetTimeEnd = moment().set({hour:endHour, minute:endMinute, second:0,millisecond:0})
    useEffect(()=>{
        const interval = setInterval( ()=>{
            const now = moment()
            const durationStart = moment.duration(targetTimeStart.diff(now))
            const durationEnd = moment.duration(targetTimeEnd.diff(now))
            if((durationStart.asSeconds()< 0) && (durationEnd.asSeconds()<0)){
                setTimeDiff(null)
            }else if((durationStart.asSeconds()< 0) && (durationEnd.asSeconds()>0)){
                setTimeDiff('Class on going')
            }
            else{
                const hours = String(durationStart.hours())
                const minutes = String(durationStart.minutes())
                const seconds = String(durationStart.seconds())
                setTimeDiff(`${hours}:${minutes}:${seconds}`)
            }
        }, 1000)
        return ()=>clearInterval(interval)
    }, [])
  return (
    <p className="bg-gray-200 px-2 rounded-lg py-1">{timeDiff? timeDiff: "Completed"}</p>
  )
}

export default CountDown