import LogoSvg from "@/components/logo"

export default function VotingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-black min-h-screen">
          <div className="w-[155px] h-[80px] pl-5">
            <LogoSvg />
          </div>
          <div className="mx-20 md:mx-80">

          <span className="w-[500px] h-[30px] self-center text-center text-lg">
              Here goes the title
            </span>
          <div className="place-self-center align-middle bg-[#333030] shadow-lg shadow-[#9CBEDA] rounded-md p-10" style={{minHeight:"50vh"}}>
            {children}
          </div>
          </div>
        </div>
  );
}
