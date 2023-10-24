import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import abi from "../abi/newabi.json"
import contractaddress from "../abi/contractaddress.json"
const { ethers } = require("ethers");

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [role, setRole] = useState("");
	const navigate = useNavigate();


const contractAddress=contractaddress
const contractABI=abi
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
  