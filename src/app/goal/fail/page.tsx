import LogoSvg from "@/components/logo";
import React from "react";

function page() {
  return (
    <div>
      <div className="h-screen w-screen bg-[#151515]">
        <div className=" h-full w-full p-3 bg-[#151515]">
          <div className=" w-[155px] h-[80px] pl-5">
            <LogoSvg />
          </div>
          <div className=" flex flex-col gap-3 ">
            <span className="w-[500px] h-[30px] self-center text-center text-lg">
              YOU DIDN’T ACHIEVE THE GOAL!
            </span>
            <div className=" h-[500px] w-[750px] place-self-center align-middle bg-[#333030] shadow-lg shadow-[#FF006E] rounded">
              <div>
                <div className="flex flex-col items-center pt-[5rem]">
                  <div className="w-[530px] h-[78px] p-4 border-2 border-solid border-[#FFFF53] bg-[#FFFF53] rounded text-[#333030] flex flex-col justify-center">
                    <p className="text-lg font-semibold">
                      We regret to inform you that you didn’t achive your goal!
                    </p>
                    <p className="text-base font-thin">
                      that means your Risk start running now.
                    </p>
                  </div>
                  <div className="flex p-12 w-[40rem] justify-center">
                    <div className="w-[482px] h-[140px] border-2 border-solid border-[#AFD6F5] bg-[#AFD6F5] rounded text-[#333030] flex items-center justify-center font-extralight text-center ">
                      every time you lose your current exchange, it
                      automatically converts that amount into a meaningful
                      contribution for the planet's well-being.
                    </div>
                  </div>
                  <h2 className="text-xl">Keep trying! </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
