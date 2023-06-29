"use client";
import { useState } from "react";
import { connect } from "../lib/ethereum";
import { StakingContract } from "../lib/smartContract";
import { sign } from "crypto";
import ErrorMessage from "../lib/component/error";
import { redirect } from "next/navigation";

type GoalData = { goalName: string; deadLine: number; amount: number };

// type GoalDataProps = GoalData & {
//   updateFields: (fields: Partial<GoalData>) => void
// }

// save goalName data to SmartContract
// save deadLine data to SmartContract
// save invest data to SmartContract

// get goalName data from SmartContract
// get deadLine data from SmartContract
// get invest data from SmartContract

interface FormElements extends HTMLFormControlsCollection {
  promise: HTMLInputElement;
  deadline: HTMLInputElement;
  amount: HTMLInputElement;
}

interface GoalFormElements extends HTMLFormElement {
  readonly elements: FormElements;
}

export default function SetGoalPage() {
  // return (<h2>Hi!</h2>);
  const [celos, setCelos] = useState<number>(5);
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState<boolean>();
  const handleChange = (e: any) => setCelos(e.target.value);

  const handlePostForm = async (e: React.FormEvent<GoalFormElements>) => {
    e.preventDefault();
    const deadlineString = e.currentTarget.elements.deadline.value;
    const deadline = new Date(deadlineString).getTime();
    const promise = e.currentTarget.elements.promise.value;
    try {
      setLoading(true);
      const signer = await connect();
      const contract = new StakingContract(signer);
      console.log(deadline);
      const newAddress = await contract.createPromise(deadline, celos, promise);
      console.log("New contract address is:", newAddress);
      window.location.replace(
        new URL("/goal/" + newAddress, window.location.href).href
      );
    } catch (e: any) {
      setError(e.message);
    }
  };

  if (error) {
    return ErrorMessage({ error });
  }

  return (
    <form onSubmit={handlePostForm}>
      <div className="flex h-[120px]  justify-around">
        <div className="flex flex-col items-center justify-center">
          <label className="text-[#ffffff] text-md pb-3 text-center">
            What is your goal?
          </label>
          <input
            className="w-[275px] h-[40px] bg-[#504D35] border border-solid border-[#f0dc3f] rounded px-2"
            required
            list="promises"
            type="text"
            name="promise"
          />
        </div>
        <datalist id="promises">
          <option value="20 mins cardio, 5x/week" />
          <option value="Meditate 5 mins daily" />
          <option value="Eat veggies with every meal" />
          <option value="No alcohol on weekdays" />
          <option value="15 mins workout, 3x/week" />
          <option value="Quit smoking" />
          <option value="Bed before 23:00 on weekdays" />
        </datalist>
        <div className="flex flex-col items-center justify-center">
          <label className="text-[#ffffff] text-md pb-3 text-center">
            When do you want to achieve it?
          </label>
          <input
            className="w-[275px] h-[40px] bg-[#504D35] border border-solid border-[#f0dc3f] rounded px-2"
            type="date"
            name="deadline"
            required
          />
        </div>
      </div>
      <div className="flex h-[235px] justify-around items-center gap-5 pl-8">
        <div className="flex flex-col justify-center items-center">
          <label className="text-[#ffffff] text-md pb-3 text-center flex items-center justify-center">
            How much do you want to stake?
          </label>
          <div className="w-[211px] h-[200px] bg-[#AFD6F5] self-center flex rounded items-center justify-center ">
            <div className="my-auto grid grid-cols-2  text-[#151515] text-2xl rounded p-4">
              <input
                required
                type="number"
                value={celos}
                onChange={handleChange}
                className="bg-transparent text-right w-16"
                name="amount"
              />
              cELO
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center p-12">
          <label className="text-[#ffffff] text-md pb-3 text-center flex items-center justify-center">
            This is the risk you take
          </label>
          <div className=" h-[200px] w-[211px] bg-[#F3BAD2] overflow-x-scroll self-center text-center text-[#151515] text-2xl rounded-md p-2 flex items-center justify-center p-4">
            {celos > 0 ? `${celos} cELO used to offset carbon credits` : ""}
          </div>
        </div>
      </div>
      <div className="mt-12 flex">
        <button
          type="submit"
          disabled={loading}
          className="mx-auto bg-[#FF006E] text-black px-6 py-3 uppercase font-medium"
        >
          {loading ? "Loading" : "Create goal"}
        </button>
      </div>
    </form>
  );
}
