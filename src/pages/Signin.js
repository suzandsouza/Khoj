// import React, { useState } from "react";
// import { ethers } from "ethers";
// import { Link } from "react-router-dom";

// const UserSigninApp = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [role, setRole] = useState("");
//   const [authenticated, setAuthenticated] = useState(false);

//   const contractAddress = "0xd9145CCE52D386f254917e481eB44e9943F39138";
//   const contractABI = [
//     {
//       inputs: [
//         {
//           internalType: "address",
//           name: "",
//           type: "address",
//         },
//       ],
//       name: "funders",
//       outputs: [
//         {
//           internalType: "string",
//           name: "email",
//           type: "string",
//         },
//         {
//           internalType: "string",
//           name: "password",
//           type: "string",
//         },
//         {
//           internalType: "string",
//           name: "role",
//           type: "string",
//         },
//       ],
//       stateMutability: "view",
//       type: "function",
//     },
//     {
//       inputs: [
//         {
//           internalType: "string",
//           name: "_email",
//           type: "string",
//         },
//         {
//           internalType: "string",
//           name: "_password",
//           type: "string",
//         },
//       ],
//       name: "registerAsFunder",
//       outputs: [],
//       stateMutability: "nonpayable",
//       type: "function",
//     },
//     {
//       inputs: [
//         {
//           internalType: "string",
//           name: "_email",
//           type: "string",
//         },
//         {
//           internalType: "string",
//           name: "_password",
//           type: "string",
//         },
//       ],
//       name: "registerAsResearcher",
//       outputs: [],
//       stateMutability: "nonpayable",
//       type: "function",
//     },
//     {
//       inputs: [
//         {
//           internalType: "address",
//           name: "",
//           type: "address",
//         },
//       ],
//       name: "researchers",
//       outputs: [
//         {
//           internalType: "string",
//           name: "email",
//           type: "string",
//         },
//         {
//           internalType: "string",
//           name: "password",
//           type: "string",
//         },
//         {
//           internalType: "string",
//           name: "role",
//           type: "string",
//         },
//       ],
//       stateMutability: "view",
//       type: "function",
//     },
//   ];

//   const handleSignin = async () => {
// 	try {
// 	  const provider = new ethers.providers.Web3Provider(window.ethereum);
// 	  const signer = provider.getSigner();
// 	  const contract = new ethers.Contract(
// 		contractAddress,
// 		contractABI,
// 		signer
// 	  );
  
// 	  let user;
// 	  if (role === "researcher") {
// 		const address = await signer.getAddress();
    
// 		user = await contract.researchers(address);
// 	  } else if (role === "funder") {
// 		const address = await signer.getAddress();
// 		user = await contract.funders(address);
// 	  } else {
// 		alert("Invalid role");
// 		return;
// 	  }
  
// 	  console.log("User Details:");
// 	  console.log("Email:", user.email);
// 	  console.log("Password:", user.password);
// 	  console.log("Role:", user.role);
  
// 	  if (user.email === email && user.password === password) {
// 		setAuthenticated(true);
// 	  } else {
// 		alert("Invalid credentials");
// 	  }
// 	} catch (error) {
//     let user;
//     const provider = new ethers.providers.Web3Provider(window.ethereum);
// 	  const signer = provider.getSigner();
//     const contract = new ethers.Contract(
//       contractAddress,
//       contractABI,
//       signer
//       );
//     user = await contract.researchers(signer.getAddress());
//     console.log(user.email)
//     console.log(provider.getCode(signer.getAddress()))
// 	  console.error(error);
// 	  alert("An error occurred during signin");
// 	}
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

// export default UserSigninApp;
import React, { useState } from "react";
import { ethers } from "ethers";
import { useNavigate } from "react-router-dom";

const UserSigninApp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const history = useNavigate();

  const contractAddress = "0xd9145CCE52D386f254917e481eB44e9943F39138";
  const contractABI = 
    [
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
    
      ];

  // const handleLogin = async () => {
  //   try {
  //     const provider = new ethers.providers.Web3Provider(window.ethereum);
  //     const signer = provider.getSigner();
  //     const contract = new ethers.Contract(contractAddress, contractABI, signer);

  //     let user;
  //     if (role === "researcher") {
  //       user = await contract.researchers(signer._address);
  //     } else if (role === "funder") {
  //       user = await contract.funders(signer._address);
  //     } else {
  //       alert("Invalid role");
  //       return;
  //     }

  //     if (user.email === email && user.password === password) {
  //       history.push(`/${role}`);
  //     } else {
  //       alert("Invalid credentials");
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     alert("An error occurred during login");
  //   }
  // };
  // const handleLogin = async () => {
  //   try {
  //     const provider = new ethers.providers.Web3Provider(window.ethereum);
  //     const signer = provider.getSigner();
  //     const contract = new ethers.Contract(contractAddress, contractABI, signer);
  
  //     const address = await signer.getAddress();
  // console.log(address)
  //     let user;
  //     if (role === "researcher") {
  //       user = await contract.researchers(address);
  //     } else if (role === "funder") {
  //       user = await contract.funders(address);
  //     } else {
  //       alert("Invalid role");
  //       return;
  //     }
  //     console.log(user)
  //     if (user.email === email && user.password === password) {
  //       history(`/${role}`);
  //     } else {
  //       alert("Invalid credentials");
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     alert("An error occurred during login");
  //   }
  // };
  
  const handleLogin = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI, signer);
      const address=await signer.getAddress()
      const isAuthenticated = await contract.authenticate(email, password);
      
      if (isAuthenticated) {
        history(`/${role}`);
      } else {
        alert("Invalid credentials");
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
      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="">Select Role</option>
        <option value="researcher">Researcher</option>
        <option value="funder">Funder</option>
      </select>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default UserSigninApp;
