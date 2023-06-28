type GoalData = { goalName: string; deadLine: number; amount: number }

type GoalDataProps = GoalData & {
  updateFields: (fields: Partial<GoalData>) => void
}

// save goalName data to SmartContract
// save deadLine data to SmartContract
// save invest data to SmartContract

// get goalName data from SmartContract
// get deadLine data from SmartContract
// get invest data from SmartContract

export default function SetGoalPage({
  goalName,
  deadLine,
  amount,
  updateFields,
}: GoalDataProps) {
  return (
    <>
      <div className=" flex flex-col gap-3 ">
        <label className="w-[500px] h-[30px] self-center text-center text-lg">
          SET YOUR NEW HEALTH GOAL
        </label>
        <div className=" h-[500px] w-[750px] place-self-center align-middle bg-[#333030] shadow-lg gap-1 shadow-[#9CBEDA]">
          <div className="flex h-[120px] gap-2 justify-around">
            <div className="flex flex-col">
              <label className="text-[#ffffff] text-md pb-3">
                which is your goal?
              </label>
              <input
                className="w-[200px]  bg-[#504D35] border border-solid border-[#f0dc3f] rounded-md"
                required
                type="text"
                value={goalName}
                onChange={(e) => updateFields({ goalName: e.target.value })}
              />
            </div>
            <div className="flex flex-col">
              <label className="text-[#ffffff] text-md pb-3">
                in how long do you want to achieve it?
              </label>
              <input
                className="w-[200px] bg-[#504D35] border border-solid border-[#f0dc3f] rounded-md"
                type="time"
                list="popularHours"
              />
            </div>
          </div>
          <div className="flex h-[235px] gap-2 justify-around">
            <div className="flex flex-col">
              <label className="text-[#ffffff] text-md pb-3">
                how much do you want to invest?
              </label>
              <input
                className="w-[200px] h-[200px] bg-[#AFD6F5] self-center"
                required
                type="text"
                value={amount}
                onChange={(e) => updateFields({ amount: e.target.value })}
              />
            </div>
            <div className="flex flex-col">
              <label className="text-[#ffffff] text-md pb-3">
                her is the risk you run if you fail
              </label>
              <div className=" h-[200px] w-[200px] bg-[#F3BAD2] self-center text-center">
                lost crypto
              </div>
            </div>
          </div>
          <div className="flex h-[120px]">
            <button type="submit">CREAT GOAL</button>
          </div>
        </div>
      </div>
    </>
  )
}
