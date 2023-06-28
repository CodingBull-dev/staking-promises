"use client";

import { connect } from "@/app/lib/ethereum";
import { PromiseData, StakingContract } from "@/app/lib/smartContract";
import { ethers } from "ethers";
import { useEffect, useState } from "react";

export default function Page({ params }: { params: { slug: string } }) {
  const [data, setData] = useState<PromiseData>();
  const [error, setError] = useState<string>();
  const [signer, setSigner] = useState<ethers.JsonRpcSigner>();
  const [activated, setActivated] = useState<boolean>();

  useEffect(() => {
    async function fetchData() {
      try {
        const signer = await connect();
        const contract = new StakingContract(signer, params.slug);
        const promise = await contract.getPromise();
        setData(promise);
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
    return (<div>
      <h2>Error</h2>
      <p>{error}</p>
      <p>Make sure you have <a href="https://metamask.io/">Metamask installed</a>!</p>
    </div>);
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
            list="popularHours"
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
                required
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
