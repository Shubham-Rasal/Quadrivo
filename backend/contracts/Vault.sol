// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

interface FundingVault {
    // function registerDelegationAggrement() external;
    // function registerProject() external;
    // function fundProject() external;
}

contract Vault is FundingVault {
    IERC20 public immutable token;

    struct Project {
        string name;
        string description;
        uint fundingGoal;
        uint deadline;
        address fundingRecipient;
        uint amountRaised;
        bool fundingGoalReached;
        bool fundingClosed;
        uint matchingPoolAmount;
        uint totalFunders;
    }

    event ProjectRegistered(
        address indexed owner,
        string name,
        string description,
        uint fundingGoal,
        uint deadline
    );

    Project[] public projects;

    //funders mapping
    mapping

    constructor(address _token) {
        //call approve for the tokens to be deposited in the aave protocol
        token = IERC20(_token);
    }

    // function registerDelegationAggrement()

    function registerProject(
        string memory _name,
        string memory _description,
        uint _fundingGoal,
        uint _deadline,
        uint _matchingPoolAmount
    ) external {
        require(_fundingGoal > 0, "Vault: funding goal must be greater than 0");
        require(
            _deadline > block.timestamp,
            "Vault: deadline must be in the future"
        );
        require(
            _deadline <= block.timestamp + 30 days,
            "Vault: deadline must be less than 30 days in the future"
        );
        require(
            _matchingPoolAmount > 0,
            "Vault: matching pool must be greater than 0"
        );

        Project memory project = Project(
            _name,
            _description,
            _fundingGoal,
            _deadline,
            address(msg.sender),
            0,
            false,
            false,
            _matchingPoolAmount,
            0
        );
        projects.push(project);
        emit ProjectRegistered(
            address(msg.sender),
            _name,
            _description,
            _fundingGoal,
            _deadline
        );
    }

    function fundProject(uint _projectId, uint _amount) external {
        require(_projectId < projects.length, "Vault: project does not exist");
        Project storage project = projects[_projectId];
        require(!project.fundingClosed, "Vault: funding is closed");
        require(
            project.deadline > block.timestamp,
            "Vault: deadline has passed"
        );
        require(
            project.amountRaised + _amount <= project.fundingGoal,
            "Vault: funding goal reached"
        );

        require(
            token.transferFrom(msg.sender, address(this), _amount),
            "Vault: transfer failed"
        );
        project.amountRaised += _amount;


        //quadratic matching




        if (project.amountRaised >= project.fundingGoal) {
            project.fundingGoalReached = true;
            project.fundingClosed = true;
            //transfer the matching pool amount to the project owner along with the funds raised
        }
    }
}

interface IERC20 {
    function totalSupply() external view returns (uint);

    function balanceOf(address account) external view returns (uint);

    function transfer(address recipient, uint amount) external returns (bool);

    function allowance(
        address owner,
        address spender
    ) external view returns (uint);

    function approve(address spender, uint amount) external returns (bool);

    function transferFrom(
        address sender,
        address recipient,
        uint amount
    ) external returns (bool);

    event Transfer(address indexed from, address indexed to, uint amount);
    event Approval(address indexed owner, address indexed spender, uint amount);
}
