import Image from "next/image";
import headingBg from "@/assets/images/headingBg.png";
import laptop from "@/assets/images/laptop.png"
const HeroSection = () => {
  return (
    <div className="pt-16  relative ">
      <div className="absolute -z-20 inset-0 h-full w-full bg-white bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <h1 className="text-center md:text-[3vw] text-[7vw] font-serif  ">
        <span className="text-[#5A7D65]">Syncs</span> Students, Faculty, and{" "}
        <br /> Learning Materials <br />{" "}
        <span className="bg-heading relative">
          <Image
            className=" -rotate-[10deg] w-auto h-auto absolute left-[5%] md:-top-[1.5vw] -top-[4vw] opacity-60 -z-10"
            alt="bg"
            src={headingBg}
            width={200}
            height={200}
          />{" "}
          <span>Seamlessly</span>
        </span>
      </h1>
      <div className="flex justify-center ">
        <Image src={laptop} priority alt="laptop" width={200} height={200} className="md:w-[40vw] w-[70vw] h-auto md:-my-10 -my-4"/>
      </div>
    </div>
  );
};

export default HeroSection;
