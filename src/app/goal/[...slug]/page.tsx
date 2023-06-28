import LogoSvg from "@/components/logo";
import React from "react";

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
              GET INTO A NEW GOAL
            </span>
            <div className=" h-[500px] w-[750px] place-self-center align-middle bg-[#333030] shadow-lg shadow-[#9CBEDA] rounded">
              <div>
                <div className="flex flex-col items-center pt-[2rem]">
                  <div className="flex gap-4 p-8">
                    <div className="w-[275px] h-[58px] border-2 border-solid border-[#FFFF53] bg-[transparent] rounded text-white flex items-center justify-center ">
                      <p>title</p>
                    </div>
                    <div className="w-[174px] h-[58px] border-2 border-solid border-[#FFFF53] bg-[#FFFF53] rounded text-[#333030] flex items-center justify-center ">
                      <p>deadline</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div>
                      <div className="absolute text-black top-[19rem] pl-4">
                        Invest
                      </div>
                      <div className="w-[224px] h-[169px] border-2 border-solid border-[#AFD6F5] bg-[#AFD6F5] rounded"></div>
                    </div>
                    <div>
                      <div className="absolute text-black pl-4 top-[19rem]">
                        Risks
                      </div>
                      <div className="w-[224px] h-[169px] border-2 border-solid border-[#F3B9D2] bg-[#F3B9D2] rounded"></div>
                    </div>
                  </div>
                  <div className="flex gap-16 p-12">
                    <button className="w-[160px] h-[53px] bg-[#FF006E] text-black rounded">
                      REJECT
                    </button>
                    <button className="w-[160px] h-[53px] bg-[#81E353] text-black rounded">
                      ACCEPT
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
