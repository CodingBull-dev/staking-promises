// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract StakePromise {
    uint256 public deadline;
    uint256 public stakeAmount;
    string public promiseMilestone;
    Validation public author;
    Validation public collaborator;

    uint256 public totalStakedAmount;
    bool public active = false;

    struct Validation {
      address account;
      bool approved;
    }

    constructor(uint256 _deadline, string memory _promise) payable {
        require(msg.value >= 0, "Staked amount was not transfered");
        deadline = _deadline;
        stakeAmount = msg.value;
        promiseMilestone = _promise;
        totalStakedAmount = msg.value;
        author.account = msg.sender;
    }

    function cancel() public {
        require(msg.sender == author.account, "Only the author can cancel the contract");
        require(!active, "The promise can not be cancelled once it becomes active");
        payable(author.account).transfer(stakeAmount);
    }

    function sign() public payable {
        require(msg.value >= stakeAmount, "User didn't send enough tokens as the owner");
        require(msg.sender != author.account, "Author can not sign the contract themselves");
        totalStakedAmount += msg.value;
        active = true;
        collaborator.account = msg.sender;
    }

    function approve() public {
        address sender = msg.sender;
        require(sender == author.account || sender == collaborator.account, 
        "Account is not participating in the promise");
        if(sender == author.account) {
            // approve it for the author of the promise
            author.approved = true;
        } else {
            // approve it for the collaborator of the promise
            collaborator.approved = true;
        }
    }

    function onDeadline() public {
        require(block.timestamp > deadline, "The deadline has not happened yet");
        require(active, "The promise is not active");
        if(author.approved && collaborator.approved) {
            // Both approved their requirements! Well done!
            // pay to the author
            payable(author.account).transfer(totalStakedAmount / 2);
            // pay to the collaborator
            payable(collaborator.account).transfer(totalStakedAmount / 2);
        } else {
            // send the tokens to a carbon footprint account
            payable(0x0).transfer(totalStakedAmount);
        }

        totalStakedAmount = 0;
        active = false;
        stakeAmount = 0;
    }
}
