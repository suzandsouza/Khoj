import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import abi from "../abi/newabi.json"
import contractaddress from "../abi/contractaddress.json"
import { Form, Input, Button, Card, Select } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
const { ethers } = require("ethers");

const Login = () => {
	const [form] = Form.useForm();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [role, setRole] = useState("");
	const navigate = useNavigate();


const contractAddress=contractaddress
const contractABI=abi
	const handleLogin = async (values) => {
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
		  if (researcher.username === values.email && researcher.password === values.password) {
      console.log('form ',email)
      console.log('contract',researcher.email)
			setRole("researcher");
			  navigate("/researcher");
		  } else if (funder && funder.username === values.email && funder.password === values.password) {
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
		<div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
		<Card style={{ width: 400, padding: 20, boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)" }}>
		  <h2 style={{ textAlign: "center" }}>User Login</h2>
		  <Form form={form} onFinish={handleLogin}>
			<Form.Item
			  name="email"
			  rules={[
				{ required: true, message: "Please enter your email" },
				{ type: "email", message: "Please enter a valid email" },
			  ]}
			>
			  <Input prefix={<UserOutlined />} placeholder="Email" />
			</Form.Item>
			<Form.Item
			  name="password"
			  rules={[{ required: true, message: "Please enter your password" }]}
			>
			  <Input.Password prefix={<LockOutlined />} placeholder="Password" />
			</Form.Item>
			<Form.Item>
			  <Button type="primary" htmlType="submit" style={{ width: "100%", fontSize: "15px" }}>
				Login
			  </Button>
			</Form.Item>
		  </Form>
		</Card>
	  </div>
	);
  };
  
  export default Login;
  