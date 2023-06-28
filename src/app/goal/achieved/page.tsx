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
              CONGRATULATIONS!
            </span>
            <div className=" h-[500px] w-[750px] place-self-center align-middle bg-[#333030] shadow-lg shadow-[#81E353] rounded">
              <form>
                <div className="flex flex-col items-center pt-[7rem]">
                  <div className="text-center flex items-center justify-center">
                    <p className="text-2xl">
                      We are happy to inform you that you achieve successfully
                      your goal!
                    </p>
                  </div>
                  <div className="flex p-12 w-[40rem] justify-center">
                    <div className="w-[458px] h-[58px] border-2 border-solid border-[#FFFF53] bg-[#FFFF53] rounded text-[#333030] flex items-center justify-center ">
                      your money is now available in your wallet!
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
