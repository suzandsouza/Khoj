import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { Card, Button } from 'antd';
import abi from "../abi/newabi.json"
import contractaddress from "../abi/contractaddress.json"
import '../styles/vote.css'
function MainPage() {
  const [requests, setRequests] = useState([]);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);

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
        amount: request[2].toString()
      }));
      setRequests(formattedRequests);
      setButtonClicked(true);
    } catch (error) {
      console.error('Error fetching funding requests:', error);
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

  const renderFundingRequests = () => {
    if (buttonClicked) {
      return (
        <div className="card-container">
          {requests.map((request, index) => (
            <Card key={index} title={request.title} className="funding-card">
              <p><strong>Researcher's Address:</strong> {request.researcher}</p>
              <p><strong>Amount Requested:</strong> {request.amount}</p>
              <Button type="primary" onClick={() => voteForRequest(index)}>Vote</Button>
            </Card>
          ))}
        </div>
      );
    } else {
      return null;
    }
  };

  return (
    <div>
      <h2 className='funding-req-title'>Funding Requests</h2>
      <Button className="fetch-button" onClick={fetchFundingRequests}>Fetch Funding Requests</Button>
      {renderFundingRequests()}
    </div>
  );
}

export default MainPage;
