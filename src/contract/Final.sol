// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ResearchFunding {
    struct Profile {
        string username;
        string password;
        string entity;
    }

    struct FundingRequest {
        address researcher;
        string title;
        uint256 amount;
        bool approved;
        uint256 votes; // Added votes field
    }

    mapping(address => Profile) public researchers;
    mapping(address => Profile) public funders;
    FundingRequest[] public fundingRequests;

    function registerResearcher(string memory _username, string memory _password) public {
        researchers[msg.sender] = Profile(_username, _password, "researcher");
    }

    function registerFunder(string memory _username, string memory _password) public {
        funders[msg.sender] = Profile(_username, _password, "funder");
    }

    function authenticate(address _address, string memory _username, string memory _password) public view returns (bool) {
        Profile memory researcher = researchers[_address];
        Profile memory funder = funders[_address];

        if (keccak256(abi.encodePacked(researcher.entity)) == keccak256(abi.encodePacked("researcher")) &&
            keccak256(abi.encodePacked(researcher.username)) == keccak256(abi.encodePacked(_username)) &&
            keccak256(abi.encodePacked(researcher.password)) == keccak256(abi.encodePacked(_password))) {
            return true;
        }

        if (keccak256(abi.encodePacked(funder.entity)) == keccak256(abi.encodePacked("funder")) &&
            keccak256(abi.encodePacked(funder.username)) == keccak256(abi.encodePacked(_username)) &&
            keccak256(abi.encodePacked(funder.password)) == keccak256(abi.encodePacked(_password))) {
            return true;
        }

        return false;
    }

    function listFundingRequests() public view returns (FundingRequest[] memory) {
        return fundingRequests;
    }

    function makeFundingRequest(string memory _title, uint256 _amount) public {
        require(keccak256(abi.encodePacked(researchers[msg.sender].entity)) == keccak256(abi.encodePacked("researcher")), "Only researchers can make funding requests");
        fundingRequests.push(FundingRequest(msg.sender, _title, _amount, false, 0));
    }

    function voteForRequest(uint256 _index) public {
        require(keccak256(abi.encodePacked(funders[msg.sender].entity)) == keccak256(abi.encodePacked("funder")), "Only funders can vote");
        require(_index < fundingRequests.length, "Invalid request index");

        FundingRequest storage request = fundingRequests[_index];
        require(!request.approved, "Request already approved");

        request.votes++;
    }
}
