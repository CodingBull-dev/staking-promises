import { IStakingContract } from "./smartContract";

export class MockContract implements IStakingContract {
    createPromise(deadline: number, amount: number, promise: string): Promise<string> {
        return new Promise<string>(resolve => setTimeout(() => resolve("0xd2309u3409fh902dh923hd890h9"), 3000));
    }
    signPromise(): Promise<void> {
        return new Promise<void>(res => setTimeout(() => res(), Math.floor(Math.random() * 4000) + 1));
    }
    cancelPromise(): Promise<void> {
        return new Promise<void>(res => setTimeout(() => res(), Math.floor(Math.random() * 4000) + 1));
    }
    async getPromise(): Promise<{ deadline: number; amount: string; promise: string; }> {
        await new Promise<void>(res => setTimeout(() => res(), Math.floor(Math.random() * 4000) + 1));
        return { deadline: 1687986024474, amount: "4", promise: "Run 6 kilometers" };
    }
    approvePromiseFulfillment(): Promise<void> {
        return new Promise<void>(res => setTimeout(() => res(), Math.floor(Math.random() * 4000) + 1));
    }
    finishPromise(): Promise<void> {
        return new Promise<void>(res => setTimeout(() => res(), Math.floor(Math.random() * 4000) + 1));
    }
}

export const smartContract = new MockContract();
