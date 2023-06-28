type GoalData = { goalName: string; deadLine: number; invest: number }

type GoalDataProps = GoalData & {
  updateFields: (fields: Partial<GoalData>) => void
}
export default function SetGoalPage({
  goalName,
  deadLine,
  invest,
  updateFields,
}: GoalDataProps) {
  return (
    <>
      <div className=" flex flex-col gap-3 ">
        <span className="w-[500px] h-[30px] self-center text-center text-lg">
          SET YOUR NEW HEALTH GOAL
        </span>
        <div className=" h-[500px] w-[750px] place-self-center align-middle bg-[#333030] shadow-lg gap-1 shadow-[#9CBEDA]">
          <div className="flex h-[120px]">
            <div className="flex flex-col">
              <label className="text-[#ffffff] text-md">
                which is your goal?
              </label>
              <input
                required
                type="text"
                value={goalName}
                // onChange={(e) => updateFields({ goalName: e.target.value })}
              />
            </div>
            <div className="flex flex-col">
              <label className="text-[#ffffff] text-md">
                in how long do you want to achieve it?
              </label>
              <input
                required
                type="text"
                value={goalName}
                // onChange={(e) => updateFields({ goalName: e.target.value })}
              />
            </div>
          </div>
          <div className="flex h-[235px]"></div>
          <div className="flex h-[120px]"></div>
        </div>
      </div>
    </>
  )
}
