import DashboardNavbar from "@/components/dashboard/DashboardNavbar"

const DashboardLayout = ({children}:{children:React.ReactNode}) => {
  return (
    <div className="relative  bg-green-100">
        <DashboardNavbar/>
        <div className="rounded-3xl bg-white min-h-[calc(100vh-72px)] md:ml-[80px]">
        {children}

        </div>
    </div>
  )
}

export default DashboardLayout