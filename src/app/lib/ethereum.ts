import { ethers } from "ethers";

type EthMethods = "eth_requestAccounts" | "wallet_switchEthereumChain" | "wallet_addEthereumChain";
type MetamaskEvent = "chainChanged"

type RequestParams = { method: EthMethods, params?: any[] };

interface Ethereum {
    request(req: RequestParams): Promise<any>;
    networkVersion: string;
    // as per https://docs.metamask.io/guide/ethereum-provider.html#chainchanged
    on(event: MetamaskEvent, handler: (chainId: string) => void): void;
    enable(): Promise<void>;
}

export interface ChainData {
    chainName: string;
    chainId: string;
    nativeCurrency: string;
    rpcUrls: string[];
    blockExplorerUrls?: string[];
}

// CELO alfajor testnetwork
const chainId = "44787";

export const isInCorrectNetwork = (): Promise<boolean> => {
    return new Promise((res, rej) => {
        // @ts-ignore I don't know how to set types in nextjs
        const ethereum: Ethereum = window.ethereum as Ethereum;
        res(ethereum.networkVersion === chainId);
    });
}

export const switchNetwork = (): Promise<void> => {
    return new Promise((res, rej) => {
        // @ts-ignore I don't know how to set types in nextjs
        const ethereum: Ethereum = window.ethereum as Ethereum;
        if (!ethereum) {
            return;
        }
        if (ethereum.networkVersion === chainId) {
            return res();
        }
        ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: ethers.toBeHex(chainId) }],
        }).then(() => res())
            .catch(err => {
                // This error code indicates that the chain has not been added to MetaMask
                if (err.code !== 4902) {
                    console.warn("Could not connect to chain", chainId);
                    return rej(err);
                }
                const parameters: ChainData = {
                    chainName: "Celo (Alfajores Testnet)",
                    chainId: "44787",
                    nativeCurrency: "CELO",
                    rpcUrls: ["https://alfajores-forno.celo-testnet.org/"],
                    blockExplorerUrls: ["https://alfajores-blockscout.celo-testnet.org/"]
                }
                ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [parameters]
                }).then(() => res())
                    .catch(e => {
                        console.error("Problem installing chain", chainId);
                        rej(e)
                    });
            });
    });
}
