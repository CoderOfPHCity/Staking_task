import { ethers } from "ethers";
import Abi from "./abi.json";

export const getStakingContract = (providerOrSigner) =>
    new ethers.Contract(
        import.meta.env.VITE_CONTRACT_ADDRESS,
        Abi,
        providerOrSigner
    );
