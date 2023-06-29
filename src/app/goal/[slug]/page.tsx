"use client";

import ErrorMessage from "@/app/lib/component/error";
import { connect } from "@/app/lib/ethereum";
import { PromiseData, StakingContract } from "@/app/lib/smartContract";
import { ethers } from "ethers";
import { useEffect, useState } from "react";

const dateToDatePickerFormat = (date: Date): string => {
  return date.getFullYear() + "-"
    + (date.getMonth() + 1).toLocaleString("en-US", { minimumIntegerDigits: 2 }) + "-"
    + (date.getDate() + 1).toLocaleString("en-US", { minimumIntegerDigits: 2 })
}

export default function Page({ params }: { params: { slug: string } }) {
  const [data, setData] = useState<{ deadline: string; amount: string; promise: string; }>();
  const [error, setError] = useState<string>();
  const [signer, setSigner] = useState<ethers.JsonRpcSigner>();
  const [activated, setActivated] = useState<boolean>();
  const [loading, setLoading] = useState<boolean>();
  const dateStart = dateToDatePickerFormat(new Date());


  useEffect(() => {
    async function fetchData() {
      try {
        const signer = await connect();
        const contract = new StakingContract(signer, params.slug);
        const promise = await contract.getPromise();
        const deadlineDate = new Date(promise.deadline);
        const formattedDate = dateToDatePickerFormat(deadlineDate);
        console.log("Promise data", { ...promise, deadline: formattedDate });
        setData({ ...promise, deadline: formattedDate });
        setSigner(signer);
        setActivated(await contract.activated());
      } catch (e: any) {
        setError(e.message);
      }
    }
    fetchData();
  }, [params.slug]);

  const approveTransaction = async () => {
    if (!signer) {
      throw new Error("Metamask has been disabled!");
    }
    const contract = new StakingContract(signer, params.slug);
    try {
      await contract.signPromise();
      window.location.reload();
    } catch (e: any) {
      setError(e.message);
    }
  }

  const approveTheirAction = async () => {
    if (!signer) {
      throw new Error("Metamask has been disabled!");
    }
    const contract = new StakingContract(signer, params.slug);
    try {
      await contract.approvePromiseFulfillment();
    } catch (e: any) {
      setError(e.message);
    }
  }

  if (!data)
    return (<div>Loading... {params.slug}</div>);

  if (error) {
    return ErrorMessage({ error });
  }

  return (
    <>
      <div className="flex h-[120px] gap-2 justify-around">
        <div className="flex flex-col">
          <label className="text-[#ffffff] text-md pb-3">
            What is your goal?
          </label>
          <input
            className="w-[200px] h-[40px] bg-[#504D35] border border-solid border-[#f0dc3f] rounded-md px-2"
            disabled
            value={data.promise}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-[#ffffff] text-md pb-3">
            When do you want to achieve it?
          </label>
          <input
            className="w-[200px] h-[40px] bg-[#504D35] border border-solid border-[#f0dc3f] rounded-md px-2"
            type="date"
            disabled
            value={data.deadline}
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
                type="number"
                value={data.amount}
                disabled
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
            {`${data.amount} cELO used to offset carbon credits`}
          </div>
        </div>
      </div>
      <div className="mt-12 flex">
        {activated ?
          (<button className="mx-auto bg-[#81E353] text-black px-6 py-3 uppercase" onClick={approveTheirAction}>They fulfilled their promise</button>) :
          (<button className="mx-auto bg-[#81E353] text-black px-6 py-3 uppercase" onClick={approveTransaction}>Accept</button>)
        }
      </div>
    </>
  )
}
