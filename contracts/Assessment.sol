// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Assessment {
    address payable public owner;
    uint256 public balance;

    event Deposit(uint256 amount);
    event Withdraw(uint256 amount);
    event WithdrawAll(uint256 amount);
    event Boost(uint256 oldBalance, uint256 boostedBalance);
    event Penalty(uint256 penaltyAmount, uint256 remainingBalance);

    constructor(uint initBalance) payable {
        owner = payable(msg.sender);
        balance = initBalance;
    }

    function getBalance() public view returns (uint256) {
        return balance;
    }

    function deposit(uint256 _amount) public payable {
        require(msg.sender == owner, "You are not the owner of this account");

        uint256 _previousBalance = balance;
        balance += _amount;

        assert(balance == _previousBalance + _amount);
        emit Deposit(_amount);
    }

    function withdraw(uint256 _withdrawAmount) public {
        require(msg.sender == owner, "You are not the owner of this account");
        require(balance >= _withdrawAmount, "Insufficient balance");

        uint256 _previousBalance = balance;
        balance -= _withdrawAmount;

        assert(balance == (_previousBalance - _withdrawAmount));
        emit Withdraw(_withdrawAmount);
    }

    function withdrawAll() public {
        require(msg.sender == owner, "You are not the owner of this account");

        uint256 _previousBalance = balance;
        balance = 0;

        assert(balance == 0);
        emit WithdrawAll(_previousBalance);
    }

    function boostBalance() public {
        require(msg.sender == owner, "You are not the owner of this account");

        uint256 oldBalance = balance;
        balance *= 2;

        assert(balance == oldBalance * 2);
        emit Boost(oldBalance, balance);
    }

    function deductPenalty(uint256 _penalty) public {
        require(msg.sender == owner, "You are not the owner of this account");
        require(balance >= _penalty, "Penalty exceeds balance");

        uint256 _previousBalance = balance;
        balance -= _penalty;

        assert(balance == _previousBalance - _penalty);
        emit Penalty(_penalty, balance);
    }
}

// Eymard Julian S. Jimeno