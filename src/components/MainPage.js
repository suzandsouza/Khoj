import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import abi from '../abi/newabi.json'

function MainPage() {
  const [requests, setRequests] = useState([]);
  const [contract, setContract] = useState(null);
  const [connectedAddress, setConnectedAddress] = useState(null);

  useEffect(() => {
    connectToEthereum();
  }, []);

  const connectToEthereum = async () => {
    try {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await window.ethereum.enable();

        const contractAddress = 'CONTRACT_ADDRESS';
        const contractABI = abi;
        const contract = new ethers.Contract(contractAddress, contractABI, provider);

        setContract(contract);

        const accounts = await provider.listAccounts();
        setConnectedAddress(accounts[0]);

        fetchFundingRequests();
      } else {
        console.error('MetaMask extension not detected');
      }
    } catch (error) {
      console.error('Error connecting to Ethereum:', error);
    }
  };

  const fetchFundingRequests = async () => {
    try {
      const fundingRequests = await contract.listFundingRequests();

      const formattedRequests = fundingRequests.map((request) => ({
        researcher: request.researcher,
        title: request.title,
        amount: request.amount,
        approved: request.approved,
        votes: request.votes,
      }));

      setRequests(formattedRequests);
    } catch (error) {
      console.error('Error fetching funding requests:', error);
    }
  };

  const voteForRequest = async (index) => {
    try {
      await contract.voteForRequest(index);
      await fetchFundingRequests();
    } catch (error) {
      console.error('Error voting for request:', error);
    }
  };

  return (
    <div>
    
    {connectedAddress && (
      <p>Connected Address: {connectedAddress}</p>
    )}
    {connectedAddress && (
        <>
        <h1>Research Requests</h1>
      <ul>
        {requests.map((request, index) => (
          <li key={index}>
            <h3>Research Title:</h3>
            <p>{request.title}</p>
            <h3>Researcher's Address:</h3>
            <p>{request.researcher}</p>
            <h3>Amount Requested:</h3>
            <p>{request.amount}</p>
            <h3>Approved:</h3>
            <p>{request.approved ? 'Yes' : 'No'}</p>
            <h3>Votes:</h3>
            <p>{request.votes}</p>
            {!request.approved && (
              <button onClick={() => voteForRequest(index)}>Vote</button>
            )}
          </li>
        ))}
      </ul>
      </>
    )}
  </div>
  );
}

export default MainPage;
