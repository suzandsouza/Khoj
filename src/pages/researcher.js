import React, { useState } from 'react';
import { ethers } from 'ethers';
import contractaddress from "../abi/contractaddress.json";
import abi from "../abi/newabi.json"
import "../styles/researcher.scss"

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
    <div className="researcher-container">
      <h2>Researcher</h2>
      <form className="researcher-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <button type="submit">Submit</button>
          <a href="/myFundingProjects">My Funding Requests</a>
        </div>
      </form>
    </div>
  );
};

export default Researcher;
