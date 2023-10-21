// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract UserRegistry {
    struct User {
        string email;
        string password;
        string role;
    }

    mapping(address => User) public researchers;
    mapping(address => User) public funders;

    function registerAsResearcher(
        string memory _email,
        string memory _password
    ) public {
        require(
            bytes(researchers[msg.sender].email).length == 0,
            "User already registered as a researcher"
        );
        researchers[msg.sender] = User(_email, _password, "researcher");
    }

    function registerAsFunder(
        string memory _email,
        string memory _password
    ) public {
        require(
            bytes(funders[msg.sender].email).length == 0,
            "User already registered as a funder"
        );
        funders[msg.sender] = User(_email, _password, "funder");
    }
}
