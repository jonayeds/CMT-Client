import Image from "next/image"
import headingBg from "@/assets/images/headingBg.png"

const HeroSection = () => {
  return (
    <div className="mt-10">
        <h1 className="text-center text-[3vw] font-serif  "><span className="text-[#4eab60]">Syncs</span> Students, Faculty, and <br /> Learning Materials <br /> <span className="bg-heading relative"><Image className="  absolute left-0 -top-[1.5vw] opacity-60 -z-10" alt="bg" src={headingBg} width={200} height={200}/> <span >Seamlessly</span></span></h1>
    </div>
  )
}

export default HeroSection 