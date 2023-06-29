import LogoSvg from "@/components/logo"
import Image from "next/image"

export default function Home() {
  const workSteps: [string, string][] = [
    ["Your set a goal", "Both you and your partner agree on a goal and stake an amount of cELO"],
    ["You validate each other", "It's a trust relation! You both validate that the other person fulfilled their part of the promise"],
    ["You win, or loose, together!", "Your stake had yielded results that you both share 🤑! Or you both donate to help offset carbon footprint 🌎"]
  ]

  const makeWorkSteps = (steps: [string, string][]) => {
    return steps.map(([title, info]) => {
      return (
        <div key={title} className="flex flex-col">
          <h1 className="text-2xl font-bold text-[#FF006E]">{title}</h1>
          <h3 className="text-lg">{info}</h3>
        </div>)
    })
  }

  return (
    <>
      <div className="w-[155px] h-[80px] pl-5">
        <LogoSvg />
      </div>
      <main className="flex min-h-[90vh] flex-col items-center justify-between p-24 pt-2 text-white">
        <h1 className="text-4xl font-bold">Staking Promises</h1>
        <h3 className="text-2xl font-bold">Stake to fulfill your goals 🏋️‍♀️ with your peers 👯</h3>
        <a href="/goal"><button className="mx-auto bg-[#81E353] text-black px-6 py-3 uppercase font-bold">Get started</button></a>
        <div>
          <h3 className="text-3xl font-bold text-center my-10 text-green-400 underline">How does it work?</h3>
          <div className="grid md:grid-cols-3 md:gap-4">
            {makeWorkSteps(workSteps)}
          </div>
        </div>
      </main>
    </>
  )
}
