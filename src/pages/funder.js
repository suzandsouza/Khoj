import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';


function FundersPage() {
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
        const contractAddress = '0x9ed65CaF160fCF103B4983818bc5D62478FDDA39';
        const contractABI = [
          {
            "inputs": [
              {
                "internalType": "string",
                "name": "_title",
                "type": "string"
              },
              {
                "internalType": "uint256",
                "name": "_amount",
                "type": "uint256"
              }
            ],
            "name": "makeFundingRequest",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "string",
                "name": "_username",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "_password",
                "type": "string"
              }
            ],
            "name": "registerFunder",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "string",
                "name": "_username",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "_password",
                "type": "string"
              }
            ],
            "name": "registerResearcher",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "_address",
                "type": "address"
              },
              {
                "internalType": "string",
                "name": "_username",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "_password",
                "type": "string"
              }
            ],
            "name": "authenticate",
            "outputs": [
              {
                "internalType": "bool",
                "name": "",
                "type": "bool"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "",
                "type": "address"
              }
            ],
            "name": "funders",
            "outputs": [
              {
                "internalType": "string",
                "name": "username",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "password",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "entity",
                "type": "string"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
              }
            ],
            "name": "fundingRequests",
            "outputs": [
              {
                "internalType": "address",
                "name": "researcher",
                "type": "address"
              },
              {
                "internalType": "string",
                "name": "title",
                "type": "string"
              },
              {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
              },
              {
                "internalType": "bool",
                "name": "approved",
                "type": "bool"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "listFundingRequests",
            "outputs": [
              {
                "internalType": "string[]",
                "name": "",
                "type": "string[]"
              },
              {
                "internalType": "address[]",
                "name": "",
                "type": "address[]"
              },
              {
                "internalType": "uint256[]",
                "name": "",
                "type": "uint256[]"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "",
                "type": "address"
              }
            ],
            "name": "researchers",
            "outputs": [
              {
                "internalType": "string",
                "name": "username",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "password",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "entity",
                "type": "string"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          }
        ]

        // Create a new contract instance
        const contract = new ethers.Contract(contractAddress, contractABI, provider);

        // Fetch the funding requests data from the smart contract
        fetchFundingRequests(contract);
      } else {
        console.error('MetaMask extension not detected');
      }
    } catch (error) {
      console.error('Error connecting to Ethereum:', error);
    }
  };

  const fetchFundingRequests = async (contract) => {
    try {
      // Call the smart contract function to get the funding requests
      const fundingRequests = await contract.listFundingRequests();
      console.log(fundingRequests)
      // Update the state with the funding requests data
      setRequests(fundingRequests);
    } catch (error) {
      console.error('Error fetching funding requests:', error);
    }
  };

  return (
    <div>
      <h1>Funding Requests</h1>
      {requests.length === 0 ? (
        <p>No funding requests available</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Paper Name</th>
              <th>Researcher Address</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request, index) => (
              <tr key={index}>
                <td>{request.title}</td>
                <td>{request.researcher}</td>
                <td>{request.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default FundersPage;
