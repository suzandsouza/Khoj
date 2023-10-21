// import React, { useState } from "react";
// import { Link } from "react-router-dom";

// const { ethers } = require("ethers");

// const Signin = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [role, setRole] = useState("");
//   const [authenticated, setAuthenticated] = useState(false);

//   const contractAddress = "0xd8b934580fcE35a11B58C6D73aDeE468a2833fa8";
//   const contractABI = [
//     {
//       "inputs": [
//         {
//           "internalType": "address",
//           "name": "",
//           "type": "address"
//         }
//       ],
//       "name": "funders",
//       "outputs": [
//         {
//           "internalType": "string",
//           "name": "email",
//           "type": "string"
//         },
//         {
//           "internalType": "string",
//           "name": "password",
//           "type": "string"
//         },
//         {
//           "internalType": "string",
//           "name": "role",
//           "type": "string"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "string",
//           "name": "_email",
//           "type": "string"
//         },
//         {
//           "internalType": "string",
//           "name": "_password",
//           "type": "string"
//         }
//       ],
//       "name": "registerAsFunder",
//       "outputs": [],
//       "stateMutability": "nonpayable",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "string",
//           "name": "_email",
//           "type": "string"
//         },
//         {
//           "internalType": "string",
//           "name": "_password",
//           "type": "string"
//         }
//       ],
//       "name": "registerAsResearcher",
//       "outputs": [],
//       "stateMutability": "nonpayable",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "address",
//           "name": "",
//           "type": "address"
//         }
//       ],
//       "name": "researchers",
//       "outputs": [
//         {
//           "internalType": "string",
//           "name": "email",
//           "type": "string"
//         },
//         {
//           "internalType": "string",
//           "name": "password",
//           "type": "string"
//         },
//         {
//           "internalType": "string",
//           "name": "role",
//           "type": "string"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function"
//     }
//   ];

//   const provider = new ethers.providers.Web3Provider(window.ethereum);
//   const signer = provider.getSigner();
//   const contract = new ethers.Contract(contractAddress, contractABI, signer);

//   const handleSignin = async () => {
//     try {
//       let user;
//       if (role === "researcher") {
//         user = await contract.researchers(signer.getAddress());
//       } else if (role === "funder") {
//         user = await contract.funders(signer.getAddress());
//       } else {
//         alert("Invalid role");
//         return;
//       }

//       if (user.email === email && user.password === password) {
//         setAuthenticated(true);
//       } else {
//         alert("Invalid credentials");
//       }
//     } catch (error) {
//       console.error(error);
//       alert("An error occurred during signin");
//     }
//   };

//   if (authenticated) {
//     return (
//       <Link
//         to={{
//           pathname: role === "researcher" ? "/researcher" : "/funder",
//           state: { email, role },
//         }}
//       />
//     );
//   }

//   return (
//     <div>
//       <h2>User Signin</h2>
//       <input
//         type="email"
//         placeholder="Email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//       />
//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />
//       <select value={role} onChange={(e) => setRole(e.target.value)}>
//         <option value="">Select Role</option>
//         <option value="researcher">Researcher</option>
//         <option value="funder">Funder</option>
//       </select>
//       <button onClick={handleSignin}>Signin</button>
//     </div>
//   );
// };


// export default Signin