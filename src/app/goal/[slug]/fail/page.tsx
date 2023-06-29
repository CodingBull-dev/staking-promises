export default function Page() {
    return (
        <div className="text-center">
            <div className="flex justify-around">
                <p className="mx-auto bg-[#FFFF53] text-black px-6 py-3 text-lg max-[30px]:" >
                    You did not achieved your goals 😔
                    <br/>
                    But at least you helped the environment 🌏😉
                </p>
            </div>
            <div className="flex justify-around mt-8">
                <p className="mx-auto bg-[#AFD6F5] text-black px-6 py-3 text-lg max-[30px]:" >
                    Every time you do not fulfill your goals, your staking is used to <b className="font-bold">offset carbon footprint.</b>
                    <br/>
                    Thank you for helping the planet!
                </p>
            </div>
        </div>
    )
}
