export default function Page() {
    return (
        <>
            <div className="flex h-[120px] gap-2 justify-around">
                <div className="flex flex-col text-3xl font-bold text-white">
                    You both fulfilled your goal!
                </div>
            </div>
            <div className="flex gap-2 justify-around">
                <div className="mx-auto bg-[#FFFF53] text-black px-6 py-3 uppercase max-[30px]:" >
                    Your money + rewards has been returned to your wallet
                </div>
            </div>
        </>
    )
}
