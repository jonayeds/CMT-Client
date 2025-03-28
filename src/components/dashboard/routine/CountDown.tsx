/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Loader2Icon } from "lucide-react";
import moment from "moment";
import { useEffect, useState } from "react";

const CountDown = ({
  startTime,
  endTime,
}: {
  startTime: string;
  endTime: string;
}) => {
  const [startHour, startMinute] = startTime.split(":").map(Number);
  const [endHour, endMinute] = endTime.split(":").map(Number);
  const [timeDiff, setTimeDiff] = useState<string | null>(null);
  const targetTimeStart = moment().set({
    hour: startHour,
    minute: startMinute,
    second: 0,
    millisecond: 0,
  });
  const targetTimeEnd = moment().set({
    hour: endHour,
    minute: endMinute,
    second: 0,
    millisecond: 0,
  });
  useEffect(() => {
    const interval = setInterval(() => {
      const now = moment();
      const durationStart = moment.duration(targetTimeStart.diff(now));
      const durationEnd = moment.duration(targetTimeEnd.diff(now));
      if (durationStart.asSeconds() < 0 && durationEnd.asSeconds() < 0) {
        setTimeDiff("ended");
      } else if (durationStart.asSeconds() < 0 && durationEnd.asSeconds() > 0) {
        setTimeDiff("onGoing");
      } else {
        const hours = String(durationStart.hours());
        const minutes = String(durationStart.minutes());
        const seconds = String(durationStart.seconds());
        setTimeDiff(`${hours}:${minutes}:${seconds}`);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <p className=" w-max ml-auto text-gray-500 flex">
      {timeDiff === "onGoing" && (
        <span className="bg-green-100 rounded-lg  px-2 py-1 ">
          Class on going 
        </span>
      )}
      {timeDiff === "ended" && (
        <span className="bg-gray-100 rounded-lg  px-2 py-1 ">Class ended</span>
      )}
      {timeDiff === null && (
        <span className="bg-white rounded-lg  px-2 py-1 "><Loader2Icon className="animate-spin duration-200 w-6"/></span>
      )}
      {(timeDiff !== "onGoing" && timeDiff !== "ended" && timeDiff !== null) && (
        <span className="bg-yellow-100 rounded-lg  px-2 py-1 ">{timeDiff}</span>
      )}
    </p>
  );
};

export default CountDown;
