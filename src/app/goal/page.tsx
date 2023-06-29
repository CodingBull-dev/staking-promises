"use client";
import { useState } from "react";
import { connect } from "../lib/ethereum";
import { StakingContract } from "../lib/smartContract";
import { sign } from "crypto";
import ErrorMessage from "../lib/component/error";
import { redirect } from 'next/navigation';

type GoalData = { goalName: string; deadLine: number; amount: number }

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
  promise: HTMLInputElement
  deadline: HTMLInputElement
  amount: HTMLInputElement
}

interface GoalFormElements extends HTMLFormElement {
  readonly elements: FormElements
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
      window.location.replace(new URL("/goal/" + newAddress, window.location.href).href);
    } catch (e: any) {
      setError(e.message);
    }
  };

  if (error) {
    return ErrorMessage({ error });
  }

  return (
    <form onSubmit={handlePostForm}>
      <div className="flex h-[120px] gap-2 justify-around">
        <div className="flex flex-col">
          <label className="text-[#ffffff] text-md pb-3">
            What is your goal?
          </label>
          <input
            className="w-[200px] h-[40px] bg-[#504D35] border border-solid border-[#f0dc3f] rounded-md px-2"
            required
            list="promises"
            type="text"
            name="promise"
          />
        </div>
        <datalist id="promises">
          <option value="Run a marathon" />
          <option value="Go to the gym" />
          <option value="Loose 2 KGs" />
          <option value="Eat a salad once per week" />
        </datalist>
        <div className="flex flex-col">
          <label className="text-[#ffffff] text-md pb-3">
            When do you want to achieve it?
          </label>
          <input
            className="w-[200px] h-[40px] bg-[#504D35] border border-solid border-[#f0dc3f] rounded-md px-2"
            type="date"
            name="deadline"
            required
          />
        </div>
      </div>
      <div className="flex h-[235px] gap-2 justify-around">
        <div className="flex flex-col">
          <label className="text-[#ffffff] text-md pb-3">
            How much do you want to stake?
          </label>
          <div
            className="w-[200px] h-[200px] bg-[#AFD6F5] self-center flex"
          >
            <div className="my-auto grid grid-cols-2 gap-2 text-black text-4xl rounded-md p-2">
              <input
                required
                type="number"
                value={celos}
                onChange={handleChange}
                className="bg-transparent text-right"
                name="amount"
              />
              cELO
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <label className="text-[#ffffff] text-md pb-3">
            This is the risk you take
          </label>
          <div className=" h-[200px] w-[200px] bg-[#F3BAD2] self-center text-center text-black text-3xl rounded-md p-2">
            {celos > 0 ? `${celos} cELO used to offset carbon credits` : ""}
          </div>
        </div>
      </div>
      <div className="mt-12 flex">
        <button type="submit"
          disabled={loading}
          className="mx-auto bg-[#FF006E] text-black px-6 py-3 uppercase">
          {loading ? "Loading" : "Create goal"}
        </button>
      </div>
    </form>
  )
}
