// import React, { useEffect, useState } from 'react';
// import { ethers } from 'ethers';
// const contractAddress="0x9bF88fAe8CF8BaB76041c1db6467E7b37b977dD7";
// const contractABI=[
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "string",
// 				"name": "_email",
// 				"type": "string"
// 			},
// 			{
// 				"internalType": "string",
// 				"name": "_password",
// 				"type": "string"
// 			}
// 		],
// 		"name": "registerAsFunder",
// 		"outputs": [],
// 		"stateMutability": "nonpayable",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "string",
// 				"name": "_email",
// 				"type": "string"
// 			},
// 			{
// 				"internalType": "string",
// 				"name": "_password",
// 				"type": "string"
// 			}
// 		],
// 		"name": "registerAsResearcher",
// 		"outputs": [],
// 		"stateMutability": "nonpayable",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "uint256",
// 				"name": "",
// 				"type": "uint256"
// 			}
// 		],
// 		"name": "funderList",
// 		"outputs": [
// 			{
// 				"internalType": "address",
// 				"name": "",
// 				"type": "address"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "address",
// 				"name": "",
// 				"type": "address"
// 			}
// 		],
// 		"name": "funders",
// 		"outputs": [
// 			{
// 				"internalType": "string",
// 				"name": "email",
// 				"type": "string"
// 			},
// 			{
// 				"internalType": "string",
// 				"name": "password",
// 				"type": "string"
// 			},
// 			{
// 				"internalType": "string",
// 				"name": "role",
// 				"type": "string"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [],
// 		"name": "getAllFunders",
// 		"outputs": [
// 			{
// 				"internalType": "address[]",
// 				"name": "",
// 				"type": "address[]"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [],
// 		"name": "getAllResearchers",
// 		"outputs": [
// 			{
// 				"internalType": "address[]",
// 				"name": "",
// 				"type": "address[]"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "uint256",
// 				"name": "",
// 				"type": "uint256"
// 			}
// 		],
// 		"name": "researcherList",
// 		"outputs": [
// 			{
// 				"internalType": "address",
// 				"name": "",
// 				"type": "address"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "address",
// 				"name": "",
// 				"type": "address"
// 			}
// 		],
// 		"name": "researchers",
// 		"outputs": [
// 			{
// 				"internalType": "string",
// 				"name": "email",
// 				"type": "string"
// 			},
// 			{
// 				"internalType": "string",
// 				"name": "password",
// 				"type": "string"
// 			},
// 			{
// 				"internalType": "string",
// 				"name": "role",
// 				"type": "string"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	}
// ]
// const RegisteredUsersPage = () => {
//   const [registeredResearchers, setRegisteredResearchers] = useState([]);
//   const [registeredFunders, setRegisteredFunders] = useState([]);
  
//   useEffect(() => {
//     const logRegisteredUsers = async () => {
//       try {
//         const provider = new ethers.providers.Web3Provider(window.ethereum);
//         await provider.send('eth_requestAccounts', []);
//         const signer = provider.getSigner();
//         const contract = new ethers.Contract(contractAddress, contractABI, signer);

//         // Get all registered researchers
//         const researcherList = await contract.getAllResearchers();
//         const researchers = await Promise.all(
//           researcherList.map(async (researcherAddress) => {
//             const researcher = await contract.researchers(researcherAddress);
//             return {
//               address: researcherAddress,
//               email: researcher.email,
//               password: researcher.password,
//               role: researcher.role,
//             };
//           })
//         );
//         setRegisteredResearchers(researchers);

//         // Get all registered funders
//         const funderList = await contract.getAllFunders();
//         const funders = await Promise.all(
//           funderList.map(async (funderAddress) => {
//             const funder = await contract.funders(funderAddress);
//             return {
//               address: funderAddress,
//               email: funder.email,
//               password: funder.password,
//               role: funder.role,
//             };
//           })
//         );
//         setRegisteredFunders(funders);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     logRegisteredUsers();
//   }, [contractAddress, contractABI]);

//   return (
//     <div>
//       <h2>Registered Researchers</h2>
//       <ul>
//         {registeredResearchers.map((researcher, index) => (
//           <li key={index}>
//             <div>Address: {researcher.address}</div>
//             <div>Email: {researcher.email}</div>
//             <div>Password: {researcher.password}</div>
//             <div>Role: {researcher.role}</div>
//           </li>
//         ))}
//       </ul>

//       <h2>Registered Funders</h2>
//       <ul>
//         {registeredFunders.map((funder, index) => (
//           <li key={index}>
//             <div>Address: {funder.address}</div>
//             <div>Email: {funder.email}</div>
//             <div>Password: {funder.password}</div>
//             <div>Role: {funder.role}</div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default RegisteredUsersPage;
