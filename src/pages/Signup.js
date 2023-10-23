import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Web3Provider } from 'ethers';

const Web3 = require("web3");
const { ethers } = require("ethers");


const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [registered, setRegistered] = useState(false);
  
  
  const contractAddress = "0x2d9bcB83aF078755d99917ADD4958aA286Db666e";

  const contractABI=[
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
        await contract.registerResearcher(email, password);
      } else if (role === "funder") {
        await contract.registerFunder(email, password);
      } else {
        alert("Invalid role");
        return;
      }
	
      setRegistered(true);
	  alert("success")
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