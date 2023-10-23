import React, { useState } from "react";
import { Link } from "react-router-dom";
//import { readFileSync } from 'fs';
import { Web3Provider } from 'ethers';

import contractABI from "../UserRegistryABI.json"
import contractAddress from "../URContractAddress.json"

const { ethers } = require("ethers");


const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [registered, setRegistered] = useState(false);
  
  
  // const contractAddress = "0x0165878A594ca255338adfa4d48449f69242Eb8F";
  // const contractABI = [{"type":"function","name":"funderList","constant":true,"inputs":[{"name":null,"type":"uint256","indexed":null,"components":null,"arrayLength":null,"arrayChildren":null,"baseType":"uint256","_isParamType":true}],"outputs":[{"name":null,"type":"address","indexed":null,"components":null,"arrayLength":null,"arrayChildren":null,"baseType":"address","_isParamType":true}],"payable":false,"stateMutability":"view","gas":null,"_isFragment":true},{"type":"function","name":"funders","constant":true,"inputs":[{"name":null,"type":"address","indexed":null,"components":null,"arrayLength":null,"arrayChildren":null,"baseType":"address","_isParamType":true}],"outputs":[{"name":"email","type":"string","indexed":null,"components":null,"arrayLength":null,"arrayChildren":null,"baseType":"string","_isParamType":true},{"name":"password","type":"string","indexed":null,"components":null,"arrayLength":null,"arrayChildren":null,"baseType":"string","_isParamType":true},{"name":"role","type":"string","indexed":null,"components":null,"arrayLength":null,"arrayChildren":null,"baseType":"string","_isParamType":true}],"payable":false,"stateMutability":"view","gas":null,"_isFragment":true},{"type":"function","name":"getAllFunders","constant":true,"inputs":[],"outputs":[{"name":null,"type":"address[]","indexed":null,"components":null,"arrayLength":-1,"arrayChildren":{"name":null,"type":"address","indexed":null,"components":null,"arrayLength":null,"arrayChildren":null,"baseType":"address","_isParamType":true},"baseType":"array","_isParamType":true}],"payable":false,"stateMutability":"view","gas":null,"_isFragment":true},{"type":"function","name":"getAllResearchers","constant":true,"inputs":[],"outputs":[{"name":null,"type":"address[]","indexed":null,"components":null,"arrayLength":-1,"arrayChildren":{"name":null,"type":"address","indexed":null,"components":null,"arrayLength":null,"arrayChildren":null,"baseType":"address","_isParamType":true},"baseType":"array","_isParamType":true}],"payable":false,"stateMutability":"view","gas":null,"_isFragment":true},{"type":"function","name":"registerAsFunder","constant":false,"inputs":[{"name":"_email","type":"string","indexed":null,"components":null,"arrayLength":null,"arrayChildren":null,"baseType":"string","_isParamType":true},{"name":"_password","type":"string","indexed":null,"components":null,"arrayLength":null,"arrayChildren":null,"baseType":"string","_isParamType":true}],"outputs":[],"payable":false,"stateMutability":"nonpayable","gas":null,"_isFragment":true},{"type":"function","name":"registerAsResearcher","constant":false,"inputs":[{"name":"_email","type":"string","indexed":null,"components":null,"arrayLength":null,"arrayChildren":null,"baseType":"string","_isParamType":true},{"name":"_password","type":"string","indexed":null,"components":null,"arrayLength":null,"arrayChildren":null,"baseType":"string","_isParamType":true}],"outputs":[],"payable":false,"stateMutability":"nonpayable","gas":null,"_isFragment":true},{"type":"function","name":"researcherList","constant":true,"inputs":[{"name":null,"type":"uint256","indexed":null,"components":null,"arrayLength":null,"arrayChildren":null,"baseType":"uint256","_isParamType":true}],"outputs":[{"name":null,"type":"address","indexed":null,"components":null,"arrayLength":null,"arrayChildren":null,"baseType":"address","_isParamType":true}],"payable":false,"stateMutability":"view","gas":null,"_isFragment":true},{"type":"function","name":"researchers","constant":true,"inputs":[{"name":null,"type":"address","indexed":null,"components":null,"arrayLength":null,"arrayChildren":null,"baseType":"address","_isParamType":true}],"outputs":[{"name":"email","type":"string","indexed":null,"components":null,"arrayLength":null,"arrayChildren":null,"baseType":"string","_isParamType":true},{"name":"password","type":"string","indexed":null,"components":null,"arrayLength":null,"arrayChildren":null,"baseType":"string","_isParamType":true},{"name":"role","type":"string","indexed":null,"components":null,"arrayLength":null,"arrayChildren":null,"baseType":"string","_isParamType":true}],"payable":false,"stateMutability":"view","gas":null,"_isFragment":true}]

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