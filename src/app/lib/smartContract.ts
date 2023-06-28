import { StakePromise__factory } from "@/contracts";
import { ethers, formatEther, parseUnits } from "ethers";
import { StakePromise } from "../../contracts/StakePromise";

export type PromiseData = { deadline: number; amount: string; promise: string; };

export interface IStakingContract {
    //* Creates a promise and returns the address of it */
    createPromise(deadline: number, amount: number, promise: string): Promise<string>;
    //** To be signed by the second user */
    signPromise(): Promise<void>;
    cancelPromise(): Promise<void>;
    getPromise(): Promise<PromiseData>;
    //* To approve the other person's fulfillment of the promise
    approvePromiseFulfillment(): Promise<void>;
    //* This will return the tokens to either the authors or generate negative carbon footprint */
    finishPromise(): Promise<void>;
}


class StakingContract implements IStakingContract {
    private readonly promise: StakePromise | null = null;
    constructor(private readonly wallet:ethers.JsonRpcSigner, contractAddress?: string) {
        if (contractAddress) {
            console.log("connecting to contract in", contractAddress);
            this.promise = StakePromise__factory.connect(contractAddress, wallet);
        }
    }
    async createPromise(deadline: number, amount: number, promise: string): Promise<string> {
        const deployment = await new StakePromise__factory(this.wallet).deploy(deadline, promise, { value: parseUnits(`${amount}`, "ether") });
        return deployment.getAddress();
    }
    async signPromise(): Promise<void> {
        const value = await this.promise?.stakeAmount();
        await this.promise?.sign({value});
    }
    async cancelPromise(): Promise<void> {
        await this.promise?.cancel();
    }
    async getPromise(): Promise<PromiseData> {
        if (!this.promise) {
            throw new Error("Promise doesn't have an address");
        }
        const deadline = Number(await this.promise.deadline());
        const amount = formatEther(await this.promise.stakeAmount());
        const text = await this.promise.promiseMilestone();
        return { deadline, amount, promise: text };

    }

    async activated():Promise<boolean> {
        if (!this.promise) {
            throw new Error("Promise doesn't have an address");
        }
        return this.promise.active();

    }

    async approvePromiseFulfillment(): Promise<void> {
        await this.promise?.approve();
    }
    async finishPromise(): Promise<void> {
        await this.promise?.onDeadline();
    }
}

export { StakingContract };
