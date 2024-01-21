// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

interface FundingVault {
    function registerProject(
        string memory _name,
        string memory _description,
        uint256 _fundingGoal,
        uint256 _matchingPoolAmount
    ) external;

    function fundProject(uint256 _projectId, uint256 _amount) external;

    function registerDelegationAggrement(
        string memory _name,
        uint256 _amount,
        uint256 _duration,
        address _tokenToOwn,
        address _nftToOwn,
        bytes memory _data
    ) external payable;
}

contract Vault is FundingVault {
    IERC20 public immutable token;

    struct Project {
        string name;
        string description;
        uint256 fundingGoal;
        address fundingRecipient;
        uint256 amountRaised;
        bool fundingGoalReached;
        bool fundingClosed;
        uint256 matchingPoolAmount;
        uint256 totalFunders;
        uint256[] contributions;
    }
    struct DelegationAgreement {
        string name;
        address delegator;
        uint256 amount;
        uint256 duration;
        uint256 start;
        bool active;
        address tokenToOwn;
        address nftToOwn;
        //hold arbitrary data
        bytes data;
    }

    event ProjectRegistered(
        address indexed owner,
        string name,
        string description,
        uint256 fundingGoal
    );

    Project[] public projects;
    DelegationAgreement[] public delegationAgreements;

    constructor() {
        //call approve for the tokens to be deposited in the aave protocol
        token = IERC20(0xc4bF5CbDaBE595361438F8c6a187bDc330539c60);
    }

     function getProjects() external view returns (Project[] memory) {
        return projects;
    }

    function getDelegationAgreements()
        external
        view
        returns (DelegationAgreement[] memory)
    {
        return delegationAgreements;
    }


    function registerDelegationAggrement(
        string memory _name,
        uint256 _amount,
        uint256 _duration,
        address _tokenToOwn,
        address _nftToOwn,
        bytes memory _data
    ) external payable {
        require(_amount > 0, "Vault: amount must be greater than 0");
        require(_duration > 0, "Vault: duration must be greater than 0");
        require(
            _duration <= 30 days,
            "Vault: duration must be less than 30 days"
        );
        require(
            _tokenToOwn != address(0),
            "Vault: token to own must be a valid address"
        );
        require(
            _nftToOwn != address(0),
            "Vault: nft to own must be a valid address"
        );

        require(
            token.transferFrom(msg.sender, address(this), _amount),
            "Vault: transfer failed"
        );

        DelegationAgreement memory delegationAgreement = DelegationAgreement(
            _name,
            address(msg.sender),
            _amount,
            _duration,
            block.timestamp,
            true,
            _tokenToOwn,
            _nftToOwn,
            _data
        );

        delegationAgreements.push(delegationAgreement);
    }

    function registerProject(
        string memory _name,
        string memory _description,
        uint256 _fundingGoal,
        uint256 _matchingPoolAmount
    ) external {
        require(_fundingGoal > 0, "Vault: funding goal must be greater than 0");

        require(
            _matchingPoolAmount > 0,
            "Vault: matching pool must be greater than 0"
        );

        Project memory project = Project(
            _name,
            _description,
            _fundingGoal,
            address(msg.sender),
            0,
            false,
            false,
            _matchingPoolAmount,
            0,
            new uint256[](0)
        );
        projects.push(project);
        emit ProjectRegistered(
            address(msg.sender),
            _name,
            _description,
            _fundingGoal
        );
    }

    function fundProject(uint256 _projectId, uint256 _amount) external {
        require(_projectId < projects.length, "Vault: project does not exist");
        Project storage project = projects[_projectId];
        require(!project.fundingClosed, "Vault: funding is closed");
        require(
            project.fundingGoalReached == false,
            "Vault: funding goal reached"
        );

        require(
            token.transferFrom(msg.sender, address(this), _amount),
            "Vault: transfer failed"
        );

        project.amountRaised += _amount;
        project.totalFunders += 1;
        project.contributions.push(_amount);

        if (project.amountRaised >= project.fundingGoal) {
            project.fundingGoalReached = true;
        }

        if (project.fundingGoalReached) {
            //get total contributions
            uint256 totalContributions = 0;
            for (uint256 i = 0; i < project.contributions.length; i++) {
                totalContributions += project.contributions[i];
            }

            //get total matching pool
            uint256 totalMatchingAmount = 0;

            for (uint256 i = 0; i < project.contributions.length; i++) {
                uint256 matchingAmount = (project.contributions[i] *
                    project.matchingPoolAmount) /
                    (totalContributions * totalContributions);
                totalMatchingAmount += matchingAmount;
            }

            //check if total matching amount is less than the matching pool
            if (totalMatchingAmount > project.matchingPoolAmount) {
                totalMatchingAmount = project.matchingPoolAmount;
            }
            
            totalMatchingAmount += totalContributions;

            //transfer tokens to project owner total
            require(
                token.transfer(project.fundingRecipient, totalMatchingAmount),
                "Vault: transfer failed"
            );
        }
    }
}

interface IERC20 {
    function totalSupply() external view returns (uint256);

    function balanceOf(address account) external view returns (uint256);

    function transfer(
        address recipient,
        uint256 amount
    ) external returns (bool);

    function allowance(
        address owner,
        address spender
    ) external view returns (uint256);

    function approve(address spender, uint256 amount) external returns (bool);

    function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) external returns (bool);

    event Transfer(address indexed from, address indexed to, uint256 amount);
    event Approval(
        address indexed owner,
        address indexed spender,
        uint256 amount
    );
}
