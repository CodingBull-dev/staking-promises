import { StakePromise__factory } from "@/contracts";
import { formatEther, parseUnits } from "ethers";
import { StakePromise } from "../../contracts/StakePromise";

export interface IStakingContract {
    //* Creates a promise and returns the address of it */
    createPromise(deadline: number, amount: number, promise: string): Promise<string>;
    //** To be signed by the second user */
    signPromise(): Promise<void>;
    cancelPromise(): Promise<void>;
    getPromise(): Promise<{ deadline: number; amount: string; promise: string; }>;
    //* To approve the other person's fulfillment of the promise
    approvePromiseFulfillment(): Promise<void>;
    //* This will return the tokens to either the authors or generate negative carbon footprint */
    finishPromise(): Promise<void>;
}


class StakingContract implements IStakingContract {
    private readonly promise: StakePromise | null = null;
    constructor(contractAddress?: string) {
        if (contractAddress) {
            this.promise = StakePromise__factory.connect(contractAddress);
        }
    }
    async createPromise(deadline: number, amount: number, promise: string): Promise<string> {
        const deployment = await new StakePromise__factory().deploy(deadline, promise, { value: parseUnits(`${amount}`, "eth") });
        return deployment.getAddress();
    }
    async signPromise(): Promise<void> {
        await this.promise?.sign();
    }
    async cancelPromise(): Promise<void> {
        await this.promise?.cancel();
    }
    async getPromise(): Promise<{ deadline: number; amount: string; promise: string; }> {
        if (!this.promise) {
            throw new Error("Promise doesn't have an address");
        }
        const deadline = Number(await this.promise.deadline());
        const amount = formatEther(await this.promise.stakeAmount());
        const text = await this.promise.promiseMilestone();
        return { deadline, amount, promise: text };

    }
    async approvePromiseFulfillment(): Promise<void> {
        await this.promise?.approve();
    }
    async finishPromise(): Promise<void> {
        await this.promise?.onDeadline();
    }
}

export { StakingContract };
