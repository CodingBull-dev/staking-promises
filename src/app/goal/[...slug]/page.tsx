import LogoSvg from "@/components/logo"
import React from "react"

export default function page() {
  return (
    <div>
      <div className="h-screen w-screen bg-[#151515]">
        <div className=" h-full w-full p-3 bg-[#151515]">
          <div className=" w-[155px] h-[80px] pl-5">
            <LogoSvg />
          </div>
          <div className=" flex flex-col gap-3 ">
            <span className="w-[500px] h-[30px] self-center text-center text-lg">
              Here goes the title
            </span>
            <div className=" h-[500px] w-[750px] place-self-center align-middle bg-[#333030] shadow-lg shadow-[#9CBEDA] rounded-md"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
