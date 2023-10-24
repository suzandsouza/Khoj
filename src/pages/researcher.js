import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import abi from "../abi/newabi.json"
import contractaddress from "../abi/contractaddress.json"
function Researcher() {
  const [requests, setRequests] = useState([]);

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
        const contractABI = abi
        // Create a new contract instance
        const contract = new ethers.Contract(contractAddress, contractABI, provider);

        // Fetch the funding requests data from the smart contract
        //fetchFundingRequests(contract);
      } else {
        console.error('MetaMask extension not detected');
      }
    } catch (error) {
      console.error('Error connecting to Ethereum:', error);
    }
  };

  // const fetchFundingRequests = async (contract) => {
  //   try {
  //     // Call the smart contract function to get the funding requests
  //     const fundingRequests = await contract.listFundingRequests();
  //     console.log(fundingRequests)
  //     // Update the state with the funding requests data
  //     setRequests(fundingRequests);
  //   } catch (error) {
  //     console.error('Error fetching funding requests:', error);
  //   }
  // };

  return (
    <div>
      working
    </div>
  )
  
}

export default Researcher;
