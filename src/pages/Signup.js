import React, { useState } from "react";
import { Link } from "react-router-dom";

const { ethers } = require("ethers");

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [registered, setRegistered] = useState(false);

  const contractAddress = "0xd8b934580fcE35a11B58C6D73aDeE468a2833fa8";
  const contractABI = [
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
				"name": "email",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "password",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "role",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_email",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_password",
				"type": "string"
			}
		],
		"name": "registerAsFunder",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_email",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_password",
				"type": "string"
			}
		],
		"name": "registerAsResearcher",
		"outputs": [],
		"stateMutability": "nonpayable",
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
				"name": "email",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "password",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "role",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

  const handleSignup = async () => {
    try {
      if (typeof window.ethereum === 'undefined') {
        // MetaMask is not installed or not accessible
        alert("Please install and unlock MetaMask to use this application.");
        return;
      }

      // Connect to the MetaMask provider
      const provider = new ethers.providers.Web3Provider(window.ethereum);

      // Request account access from the user
      await provider.send("eth_requestAccounts", []);

      // Get the signer
      const signer = provider.getSigner();

      // Create a contract instance
      const contract = new ethers.Contract(contractAddress, contractABI, signer);

      if (role === "researcher") {
        await contract.registerAsResearcher(email, password);
      } else if (role === "funder") {
        await contract.registerAsFunder(email, password);
      } else {
        alert("Invalid role");
        return;
      }

      setRegistered(true);
    } catch (error) {
      console.error(error);
      alert("An error occurred during signup");
    }
  };

  const handleReset = () => {
    setEmail("");
    setPassword("");
    setRole("");
    setRegistered(false);
  };

  return (
    <div>
      {registered ? (
        <div>
          <h2>Registration Successful!</h2>
          <p>
            Please proceed to the <Link to="/signin">Signin Page</Link> to log in.
          </p>
          <button onClick={handleReset}>Register Another User</button>
        </div>
      ) : (
        <div>
          <h2>User Signup</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="">Select Role</option>
            <option value="researcher">Researcher</option>
            <option value="funder">Funder</option>
          </select>
          <button onClick={handleSignup}>Signup</button>
        </div>
      )}
    </div>
  );
};

export default Signup;
