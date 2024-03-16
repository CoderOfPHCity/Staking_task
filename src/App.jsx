import { Container, Flex, Text } from "@radix-ui/themes";
import { configureWeb3Modal } from "./connection";
import "@radix-ui/themes/styles.css";
import Header from "./component/Header";
import Proposal from "./component/Proposal";
import DelegateVote from "./component/DelegateVote";
import useProposals from "./hooks/useProposals";
import useHandleVote from "./hooks/useHandleVote";
import useDelegateVote from "./hooks/useDelegateVote";
import { useState } from "react";
import useNumberOfVoters from "./hooks/useNumberOfVoters";

configureWeb3Modal();

function App() {
    const { loading, data: proposals } = useProposals();
    const [delegateAddress, setDelegateAddress] = useState("");

    const handleVote = useHandleVote();
    const handleDelegateVote = useDelegateVote(delegateAddress);
    const numberOfEligibleVoters = useNumberOfVoters();

    return (
        <Container>
            <Header />
            <main className="mt-6">
                <Flex mb="4" justify="between">
                    <DelegateVote
                        delegateAddress={delegateAddress}
                        setDelegateAddress={setDelegateAddress}
                        handleDelegate={handleDelegateVote}
                    />
                    <span>Eligible Voters: {numberOfEligibleVoters}</span>
                </Flex>

                <Flex wrap={"wrap"} gap={"6"}>
                    {loading ? (
                        <Text>Loading...</Text>
                    ) : proposals.length !== 0 ? (
                        proposals.map((item, index) => (
                            <Proposal
                                key={index}
                                name={item.name}
                                handleVote={handleVote}
                                id={index}
                                voteCount={Number(item.voteCount)}
                            />
                        ))
                    ) : (
                        <Text>Could not get proposals!!</Text>
                    )}
                </Flex>
            </main>
        </Container>
    );
}

export default App;


// staked= 0xcda03772ced101f14bff32ac55a7b47540da1789, 0x305a6f5d3216a1cb5df191c94efbed9bd2c31f2e, 0xbd9d1554be99562179ff7dc136c775df2aa7b46f,0x2a70ebb38d342f7700cdebad593bddb8798017b8
// reward= 0x48c08c20a2f8b15dc7ab40219298845307e63846, 0xffc7b8bdc8eaaa99148b61ad4c5ba9234a62d9e3, 0x6780f63e67286ac3cf8fba1090239fa3e8f82eba