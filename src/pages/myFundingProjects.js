import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import contractaddress from "../abi/contractaddress.json";
import abi from "../abi/newabi.json"
import '../css/vote.css'
import { Card, Button } from 'antd';

const MyFundingProjects = () => {
  const [fundingRequests, setFundingRequests] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        // Replace `ResearchFundingContract` with the actual contract instance
        const contract = new ethers.Contract(
          contractaddress,
          abi,
          signer
        );

        // Get the researcher's address
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const researcherAddress = accounts[0];
        try {
            const requests = await contract.listPersonalFundingRequests(researcherAddress);
            const formattedRequests = requests.map((request) => ({
              title: request[1],
              researcher: request[0],
              amount: request[2].toString()
            }));
            setFundingRequests(formattedRequests);
            
          } catch (error) {
            console.error('Error fetching funding requests:', error);
          }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const renderFundingRequests = () => {
      return (
        <div className="card-container">
          {fundingRequests.map((request, index) => (
            <Card key={index} title={request.title} className="funding-card">
              <p><strong>Researcher's Address:</strong> {request.researcher}</p>
              <p><strong>Amount Requested:</strong> {request.amount}</p>
            </Card>
          ))}
        </div>
      );
  };

return (
    <div>
      <h2>My Funding Projects</h2>
      {fundingRequests.length > 0 ? (
        renderFundingRequests() // Call the renderFundingRequests function
      ) : (
        <p>No funding projects found.</p>
      )}
    </div>
  );

};

export default MyFundingProjects;
