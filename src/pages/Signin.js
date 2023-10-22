import { useState } from "react";
import { ethers } from "ethers";
import { Link } from "react-router-dom";
const UserSigninApp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [authenticated, setAuthenticated] = useState(false);

  const contractAddress = "0xd9145CCE52D386f254917e481eB44e9943F39138";
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

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(contractAddress, contractABI, signer);

  const handleSignin = async () => {
    try {
      let user;
      console.log(signer._address)
	  console.log(signer)
      if (role === "researcher") {
        user = await contract.researchers('0x6210Ba4dA4E10744DabAC14705109600C9311876');
		
        const role = await contract.researchers(signer._address);
        console.log(role);
      } else if (role === "funder") {
        user = await contract.funders('0x6210Ba4dA4E10744DabAC14705109600C9311876');
      } else {
        alert("Invalid role");
        return;
      }

      if (user.email === email && user.password === password) {
        setAuthenticated(true);
      } else {
        alert("Invalid credentials");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred during signin");
    }
  };

//   const handleReset = () => {
//     setEmail("");
//     setPassword("");
//     setRole("");
//     setAuthenticated(false);
//   };

  if (authenticated) {
	console.log('authenticated!')
    return (
      <Link
        to={{
          pathname: role === "researcher" ? "/researcher" : "/funder",
          state: { email, role },
        }}
      />
    );
  }
  return(
    <div>
      <h2>User Signin</h2>
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
        <button onClick={handleSignin}>Signin</button>
    </div>

  )
}
export default UserSigninApp