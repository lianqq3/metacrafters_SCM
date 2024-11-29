# Assessment Smart Contract
# Valorant Atm System with Credit Score System

## Overview
This is a Solidity smart contract that provides basic account management functionalities, including depositing, withdrawing, and manipulating balance with additional features like boosting and penalty deduction.

## Contract Features
- Owner-only access to all functions
- Deposit funds
- Withdraw specific amounts
- Withdraw entire balance
- Balance boosting mechanism
- Penalty deduction functionality

## Contract Functions
- `getBalance()`: Returns the current balance
- `deposit(uint256 _amount)`: Adds funds to the contract (owner-only)
- `withdraw(uint256 _withdrawAmount)`: Withdraws a specific amount (owner-only)
- `withdrawAll()`: Withdraws entire balance (owner-only)
- `boostBalance()`: Doubles the current balance (owner-only)
- `deductPenalty(uint256 _penalty)`: Deducts a penalty from the balance (owner-only)

## Events
The contract emits the following events:
- `Deposit`: Triggered when funds are deposited
- `Withdraw`: Triggered when funds are withdrawn
- `WithdrawAll`: Triggered when entire balance is withdrawn
- `Boost`: Triggered when balance is boosted
- `Penalty`: Triggered when a penalty is deducted

## Setup and Installation

### Prerequisites
- Node.js
- npm (Node Package Manager)
- Hardhat
- VS Code (recommended)

### Getting Started
After cloning the GitHub repository, follow these steps to set up the project:

1. Inside the project directory, in the terminal type:
   ```
   npm i
   ```

2. Open two additional terminals in your VS Code

3. In the second terminal type:
   ```
   npx hardhat node
   ```

4. In the third terminal, type:
   ```
   npx hardhat run --network localhost scripts/deploy.js
   ```

5. Back in the first terminal, type:
   ```
   npm run dev
   ```

### Running the Project
After completing these steps, the project will be running on your localhost. 
- Typically accessible at: http://localhost:3000/

## Security Notes
- Only the contract owner can perform state-changing operations
- Includes require statements to prevent unauthorized access
- Uses assert statements to verify balance calculations

## Author
Eymard Julian S. Jimeno

## License
UNLICENSED
