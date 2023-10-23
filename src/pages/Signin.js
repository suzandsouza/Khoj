import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const { ethers } = require("ethers");

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [role, setRole] = useState("");
	const navigate = useNavigate();

const contractAddress="0x31c4A8DFa9F9Ab031450b7BADBacCdca29Be1060";
const contractABI=[
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
      
		  let researcher, funder;
		  try {
        console.log('working')
			researcher = await contract.researchers(address);
        console.log(researcher.username)
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
		  } else if (funder && funder.username === email && funder.password === password) {
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
	// const handleLogin = async () => {
	// 	try {
	// 		if (typeof window.ethereum === 'undefined') {
	// 			alert("Please install and unlock MetaMask to use this application.");
	// 			return;
	// 		}
	
	// 		const provider = new ethers.providers.Web3Provider(window.ethereum);
	// 		await provider.send("eth_requestAccounts", []);
	// 		const signer = provider.getSigner();
	// 		const address = await signer.getAddress();
	// 		console.log(address);
	
	// 		const contract = new ethers.Contract(contractAddress, contractABI, signer);
	
	// 		const researcher = await contract.researchers(address);
	// 		const funder = await contract.funders(address);
	
	// 		if (
	// 			(researcher.email === email && researcher.password === password) ||
	// 			(funder.email === email && funder.password === password)
	// 		) {
	// 			if (researcher.email === email && researcher.password === password) {
	// 				setRole("researcher");
	// 				navigate("/researcher");
	// 			} else {
	// 				setRole("funder");
	// 				navigate("/funder");
	// 			}
	// 		} else {
	// 			alert("Invalid email or password");
	// 		}
	// 	} catch (error) {
	// 		console.error(error);
	// 		alert("An error occurred during login");
	// 	}
	// };
	
			
  
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
  