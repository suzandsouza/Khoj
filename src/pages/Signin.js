// import { useState } from "react";
// import { ethers } from "ethers";
// import { Link } from "react-router-dom";
// const UserSigninApp = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [role, setRole] = useState("");
//   const [authenticated, setAuthenticated] = useState(false);

//   const contractAddress = "0xd9145CCE52D386f254917e481eB44e9943F39138";
//   const contractABI = [
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
// ];

//   const provider = new ethers.providers.Web3Provider(window.ethereum);
//   const signer = provider.getSigner();
//   const contract = new ethers.Contract(contractAddress, contractABI, signer);

//   const handleSignin = async () => {
//     try {
//       let user;
//       console.log(signer._address)
// 	  console.log(signer)
//       if (role === "researcher") {
//         user = await contract.researchers('0x6210Ba4dA4E10744DabAC14705109600C9311876');
		
//         const role = await contract.researchers(signer._address);
//         console.log(role);
//       } else if (role === "funder") {
//         user = await contract.funders('0x6210Ba4dA4E10744DabAC14705109600C9311876');
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

// //   const handleReset = () => {
// //     setEmail("");
// //     setPassword("");
// //     setRole("");
// //     setAuthenticated(false);
// //   };

//   if (authenticated) {
// 	console.log('authenticated!')
//     return (
//       <Link
//         to={{
//           pathname: role === "researcher" ? "/researcher" : "/funder",
//           state: { email, role },
//         }}
//       />
//     );
//   }
//   return(
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

//         </select>
//         <button onClick={handleSignin}>Signin</button>
//     </div>

//   )
// }
// export default UserSigninApp

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const { ethers } = require("ethers");

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [role, setRole] = useState("");
	const navigate = useNavigate();
  
// 	const contractAddress = "0xd9145CCE52D386f254917e481eB44e9943F39138";
//   const contractABI = [
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
// ];
const contractAddress="0x33c86D2726F2A3BAECC420885FCf0dD7b4DDa4B9";
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
  