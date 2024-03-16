import {  ethers, isAddress } from "ethers";
import { isSupportedChain } from "./utils";
// import { getProvider } from "../constants/providers";
// import { getProposalsContract } from "../constants/contracts";
import { toast } from "react-toastify";
import { getProvider } from "./constants/providers";
import { getStakingContract } from "./constants/contracts";

export class Controller {
    chainId = undefined;
    walletProvider = undefined;
    loading = false;


    constructor(_chainId, _walletProvider) {
        this.chainId = _chainId
        this.walletProvider = _walletProvider
    }


    createPool = async (rewardRate) => {
        if (this.loading) return;
        if (!this.chainId) return toast.error("Connect wallet")
        if (rewardRate === "0" || Number.isNaN(rewardRate)) return toast.error("Invalid reward rate")
        if (!isSupportedChain(this.chainId)) return toast.error("Wrong network");
        this.loading = true;
        const toastId = toast.loading("Processing");
        const readWriteProvider = getProvider(this.walletProvider);
        const signer = await readWriteProvider.getSigner();
        const contract = getStakingContract(signer);
        try {
            const transaction = await contract.createPool(Number(rewardRate));
            console.log("transaction: ", transaction);
            const receipt = await transaction.wait();

            console.log("receipt: ", receipt);

            toast.dismiss(toastId)
            if (receipt.status) {
                toast.success("pool creation successfull!", { autoClose: 5000 })
                this.loading = false;
                return true;
            }
            toast.error("pool creation failed!", { autoClose: 5000 })
            this.loading = false;
            return true;
        } catch (error) {
            console.log(error)
            toast.dismiss(toastId)
            toast.error((error)?.reason ?? "An unknown error occured", { autoClose: 5000 })
            this.loading = false;
            return false;
        }
    };


    


   
}