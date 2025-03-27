import DashboardNavbar from "@/components/dashboard/DashboardNavbar"

const DashboardLayout = ({children}:{children:React.ReactNode}) => {
  return (
    <div className="relative  bg-green-100 pb-[16px]">
        <DashboardNavbar/>
        <div className="rounded-3xl bg-white min-h-[calc(100vh-88px)]  md:ml-[80px] mx-auto md:max-w-[calc(100vw-80px-16px)] max-w-[calc(100vw-16px)] shadow-2xl">
        {children}

        </div>
    </div>
  )
}

export default DashboardLayout