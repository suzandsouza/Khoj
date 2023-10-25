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
        string description;
        uint256 amount;
        bool approved;
        uint256 votes;
        //uint256 totalFunds; // Added votes field
    }
    mapping(uint256 => uint256) public indAmount;
    mapping(address => uint256) public fund;
    mapping(address => Profile) public researchers;
    mapping(address => Profile) public funders;
    FundingRequest[] public fundingRequests;

    event Funded(address _funder, uint256 _amount);
    event OwnerWithdraw(uint256 _amount);

    function getContractBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function registerResearcher(
        string memory _username,
        string memory _password
    ) public {
        researchers[msg.sender] = Profile(_username, _password, "researcher");
    }

    function registerFunder(
        string memory _username,
        string memory _password
    ) public {
        funders[msg.sender] = Profile(_username, _password, "funder");
    }

    function authenticate(
        address _address,
        string memory _username,
        string memory _password
    ) public view returns (bool) {
        Profile memory researcher = researchers[_address];
        Profile memory funder = funders[_address];

        if (
            keccak256(abi.encodePacked(researcher.entity)) ==
            keccak256(abi.encodePacked("researcher")) &&
            keccak256(abi.encodePacked(researcher.username)) ==
            keccak256(abi.encodePacked(_username)) &&
            keccak256(abi.encodePacked(researcher.password)) ==
            keccak256(abi.encodePacked(_password))
        ) {
            return true;
        }

        if (
            keccak256(abi.encodePacked(funder.entity)) ==
            keccak256(abi.encodePacked("funder")) &&
            keccak256(abi.encodePacked(funder.username)) ==
            keccak256(abi.encodePacked(_username)) &&
            keccak256(abi.encodePacked(funder.password)) ==
            keccak256(abi.encodePacked(_password))
        ) {
            return true;
        }

        return false;
    }

    function listFundingRequests()
        public
        view
        returns (FundingRequest[] memory)
    {
        return fundingRequests;
    }

    function listPersonalFundingRequests(
        address _researcher
    ) public view returns (FundingRequest[] memory) {
        uint256 count = 0;

        for (uint256 i = 0; i < fundingRequests.length; i++) {
            if (fundingRequests[i].researcher == _researcher) {
                count++;
            }
        }

        FundingRequest[] memory researcherRequests = new FundingRequest[](
            count
        );
        count = 0;

        for (uint256 i = 0; i < fundingRequests.length; i++) {
            if (fundingRequests[i].researcher == _researcher) {
                researcherRequests[count] = fundingRequests[i];
                count++;
            }
        }

        return researcherRequests;
    }

    function makeFundingRequest(
        string memory _title,
        string memory _description,
        uint256 _amount
    ) public {
        require(
            keccak256(abi.encodePacked(researchers[msg.sender].entity)) ==
                keccak256(abi.encodePacked("researcher")),
            "Only researchers can make funding requests"
        );
        fundingRequests.push(
            FundingRequest(msg.sender, _title, _description, _amount, false, 0)
        );
    }

    function voteForRequest(uint256 _index) public {
        require(
            keccak256(abi.encodePacked(funders[msg.sender].entity)) ==
                keccak256(abi.encodePacked("funder")),
            "Only funders can vote"
        );
        require(_index < fundingRequests.length, "Invalid request index");

        FundingRequest storage request = fundingRequests[_index];
        require(!request.approved, "Request already approved");

        request.votes++;
    }

    function fundRequest(uint256 _index) public payable {
        require(
            keccak256(abi.encodePacked(funders[msg.sender].entity)) ==
                keccak256(abi.encodePacked("funder")),
            "Only funders can fund requests"
        );
        require(_index < fundingRequests.length, "Invalid request index");

        FundingRequest storage request = fundingRequests[_index];
        require(!request.approved, "Request already approved");
        require(
            request.amount >= msg.value,
            "Funding amount exceeds request amount"
        );

        fund[msg.sender] += msg.value; //for contract balance
        indAmount[_index] += msg.value; //for individual contract address
        emit Funded(msg.sender, msg.value);
    }

    function withdrawFunds(uint256 _index) public {
        FundingRequest storage request = fundingRequests[_index];
        require(
            msg.sender == request.researcher,
            "Only the researcher can withdraw funds"
        );
        require(request.approved, "Request not approved");

        uint256 amountToSend = address(this).balance;
        (bool success, ) = msg.sender.call{value: amountToSend}("");
        require(success, "unable to send!");

        emit OwnerWithdraw(amountToSend);
    }
}
