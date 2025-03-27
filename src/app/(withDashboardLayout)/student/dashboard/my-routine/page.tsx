import Routine from "@/components/dashboard/routine/Routine"
import { getMyClasses } from "@/services/Classroom"

const RoutinePage = async() => {
    const {data:classes} = await getMyClasses()
  return (
    <div><Routine classes={classes}/></div>
  )
}

export default RoutinePage