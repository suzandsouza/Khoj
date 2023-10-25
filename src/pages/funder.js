import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { Card, Button } from 'antd';
import abi from "../abi/newabi.json"
import contractaddress from "../abi/contractaddress.json"
import '../styles/vote.css'

function FundersPage() {
  const [requests, setRequests] = useState([]);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);
  const [amountToFund, setAmountToFund] = useState([]);
  const [contractBalance, setContractBalance] = useState(null);

  useEffect(() => {
    connectToEthereum();
  }, []);

  const connectToEthereum = async () => {
    try {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];
        const contractAddress = contractaddress;
        const contractABI = abi;
        const contract = new ethers.Contract(contractAddress, contractABI, provider.getSigner(account));
        setContract(contract);
        setAccount(account);
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
        title: request[1],
        researcher: request[0],
        description: request[2],
        amount: request[3].toString(),
        vote: request[5].toString()
      }));
      console.log(formattedRequests)
      setRequests(formattedRequests);
      setButtonClicked(true);
      
      const balance = await contract.getContractBalance();
      setContractBalance(balance.toString());
    } catch (error) {
      console.error('Error fetching funding requests:', error);
    }
  };

  const fundRequest = async (index, fundingAmount) => {
    try {
      await contract.fundRequest(index, { from: account, value: fundingAmount });
      console.log('Fund request successful');
      await fetchFundingRequests();
      
      const balance = await contract.getContractBalance();
      setContractBalance(balance.toString());
    } catch (error) {
      console.error('Error funding request:', error);
    }
  };

  const handleAmountChange = (index, amount) => {
    const updatedAmountToFund = [...amountToFund];
    updatedAmountToFund[index] = amount;
    setAmountToFund(updatedAmountToFund);
  };

  const renderFundingRequests = () => {
    if (buttonClicked) {
      return (
        <div className="card-container">
          <p><strong>Contract Balance:</strong> {contractBalance}</p>
          {requests.map((request, index) => {
            const isButtonDisabled = parseInt(request.amount) <= parseInt(contractBalance);
            return (
              <Card key={index} title={request.title} className="funding-card">
                <p><strong>Researcher's Address:</strong> {request.researcher}</p>
                <p><strong>Description:</strong> {request.description}</p>
                <p><strong>Amount Requested:</strong> {request.amount}</p>
                <p><strong>Votes Received:</strong>{request.vote}</p>
                <input
                  type="number"
                  placeholder="Enter amount to fund"
                  onChange={(e) => handleAmountChange(index, e.target.value)}
                />
                <Button
                  type="primary"
                  onClick={() => fundRequest(index, amountToFund[index])}
                  disabled={isButtonDisabled}
                >
                  Fund 
                </Button>
                <Button type="primary" onClick={() => voteForRequest(index)}>Vote</Button>
                {/* <Button type="primary" onClick={() => handleRequestSelection(index)}>Select</Button> */}
              </Card>
            );
          })}
        </div>
      );
    } else {
      return null;
    }
  };
  const voteForRequest = async (index) => {
    try {
      await contract.voteForRequest(index, { from: account });
      await fetchFundingRequests();
    } catch (error) {
      console.error('Error voting for request:', error);
    }
  };

  return (
    <div>
      <h1 className='funding-req-title'>Funding Requests</h1>
      <Button className="fetch-button" onClick={fetchFundingRequests}>Fetch Funding Requests</Button>
      {renderFundingRequests()}
    </div>
  );
}

export default FundersPage;
