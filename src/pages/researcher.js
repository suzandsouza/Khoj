import React, { useState } from 'react';
import { ethers } from 'ethers';
import contractaddress from "../abi/contractaddress.json";
import abi from "../abi/newabi.json"

const Researcher = () => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      // Replace `ResearchFundingContract` with the actual contract instance
      const contract = new ethers.Contract(
        contractaddress,
        abi,
        signer
      );

      // Call the `makeFundingRequest` function
      await contract.makeFundingRequest(title,description, amount);

      // Reset the form fields
      setTitle('');
      setDescription('');
      setAmount('');

      // Show success message or redirect to another page
      alert('Funding request submitted successfully!');
    } catch (error) {
      console.error(error);
      // Show error message
      alert('Failed to submit funding request');
    }
  };

  return (
    <div>
      <h2>Researcher</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input type="text" value={title} onChange={handleTitleChange} />
        </div>
        <div>
          <label>Description:</label>
          <input type="text" value={description} onChange={handleDescriptionChange} />
        </div>
        <div>
          <label>Amount:</label>
          <input type="number" value={amount} onChange={handleAmountChange} />
        </div>
        
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Researcher;
