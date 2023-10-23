import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const { ethers } = require("ethers");

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [role, setRole] = useState("");
	const navigate = useNavigate();

const contractAddress="0x2d9bcB83aF078755d99917ADD4958aA286Db666e";
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
  
	const handleLogin = async () => {
		try {
		  if (typeof window.ethereum === 'undefined') {
			alert("Please install and unlock MetaMask to use this application.");
			return;
		  }
	  
		  const provider = new ethers.providers.Web3Provider(window.ethereum);
		  await provider.send("eth_requestAccounts", []);
		  const signer = provider.getSigner();
		  const address = await signer.getAddress();
		  console.log(address)
		  const contract = new ethers.Contract(contractAddress, contractABI, signer);
      console.log('he')
		  let researcher, funder;
		  try {
        console.log('working')
			researcher = await contract.researchers(address);
        console.log(researcher.email)
		  } catch (error) 
      {
 		console.error("Error calling researchers function: ", error);
		  }
		  try {
        console.log('working')

			funder = await contract.funders(address);
		  } catch (error) {
			console.error("Error calling funders function: ", error);
		  }
	  
      console.log('form ',email)
      console.log('contract',researcher.username)
		  if (researcher.username === email && researcher.password === password) {
      console.log('form ',email)
      console.log('contract',researcher.email)
			setRole("researcher");
			  navigate("/researcher");
		  } else if (funder && funder.email === email && funder.password === password) {
			setRole("funder");
			  navigate("/funder");
		  } else {
			alert("Invalid email or password");
		  }
		} catch (error) {
		  console.error(error);
		  alert("An error occurred during login");
		}
	  };
	
	return (
	  <div>
		<h2>User Login</h2>
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
		<button onClick={handleLogin}>Login</button>
	  </div>
	);
  };
  
  export default Login;
  