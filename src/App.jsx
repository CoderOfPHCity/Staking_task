import { Container, Flex, Text } from "@radix-ui/themes";
import { configureWeb3Modal } from "./connection";
import "@radix-ui/themes/styles.css";
import Header from "./component/Header";
import { Controller } from "./connect";
import { ethers } from "ethers";
import { useWeb3ModalAccount, useWeb3ModalProvider } from "@web3modal/ethers/react";


configureWeb3Modal();

function App() {
    const { chainId } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider   ();
  const controller = new Controller(chainId, walletProvider);

    return (
        <Container>
            <Header />  

            <button onClick={async() => {
                await controller.createPool("100")
            }}  >create pool</button>
            {/* <main className="mt-6">
                <Flex mb="4" justify="between">
                    <DelegateVote
                        delegateAddress={delegateAddress}
                        setDelegateAddress={setDelegateAddress}
                        handleDelegate={handleDelegateVote}
                    />
                    <span>Eligible Voters: {numberOfEligibleVoters}</span>
                </Flex>

                <Flex wrap={"wrap"} gap={"6"}>
                    <button />
                </Flex>
            </main> */}
        </Container>
    );
}

export default App;


