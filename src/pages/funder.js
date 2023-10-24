import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import abi from "../abi/newabi.json"
import contractaddress from "../abi/contractaddress.json"
function FundersPage() {
  const [requests, setRequests] = useState([]);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [contract, setContract] = useState(null); // Add the contract variable to the state
  useEffect(() => {
    // Connect to the Ethereum network
    connectToEthereum();
  }, []);

  const connectToEthereum = async () => {
    try {
      // Check if the MetaMask extension is installed
      if (window.ethereum) {
        // Create a new ethers.js provider using MetaMask
        const provider = new ethers.providers.Web3Provider(window.ethereum);

        // Request access to the user's MetaMask accounts
        await window.ethereum.enable();

        // Get the deployed contract address and ABI
        const contractAddress = contractaddress;
        const contractABI = abi;
        // Create a new contract instance
        const contract = new ethers.Contract(contractAddress, contractABI, provider);

        // Set the contract instance in the state
        setContract(contract);
      } else {
        console.error('MetaMask extension not detected');
      }
    } catch (error) {
      console.error('Error connecting to Ethereum:', error);
    }
  };

  const fetchFundingRequests = async () => {
    try {
      // Call the smart contract function to get the funding requests
      const fundingRequests = await contract.listFundingRequests();
      console.log(fundingRequests)
      // Transform the fundingRequests data into a suitable format
      const formattedRequests = fundingRequests.map((request) => ({
        title: request[1], // Assuming the title is stored in the second element of each request
        researcher:request[0],
        amount:request[2].toString()
      }));

      // Update the state with the formatted funding requests data
      setRequests(formattedRequests);
      setButtonClicked(true);
    } catch (error) {
      console.error('Error fetching funding requests:', error);
    }
  };

  const renderFundingRequests = () => {
    if (buttonClicked) {
      return (
        // <ul>
        //   {requests.map((request, index) => (
        //     <>
        //     Research title
        //     <li key={index}>{request.title}</li>
        //     Researcher's address
        //     <li key={index}>{request.researcher}</li>
        //     Amount requested
        //     <li key={index}>{request.amount}</li>
        //     </>
        //   ))}
        // </ul>
        <ul>
        {requests.map((request, index) => (
          <li key={index}>
            <h3>Research Title:</h3>
            <p>{request.title}</p>
            <h3>Researcher's Address:</h3>
            <p>{request.researcher}</p>
            <h3>Amount Requested:</h3>
            <p>{request.amount}</p>
          </li>
        ))}
      </ul>
      );
    } else {
      return null;
    }
  };

  return (
    <div>
      <h1>Funding Requests</h1>
      <button onClick={fetchFundingRequests}>Fetch Funding Requests</button>
      {renderFundingRequests()}
    </div>
  );
}

export default FundersPage;
