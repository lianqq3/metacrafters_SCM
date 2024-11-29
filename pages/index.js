import { useState, useEffect } from "react";
import { ethers } from "ethers";
import atm_abi from "../artifacts/contracts/Assessment.sol/Assessment.json";

export default function ValorantATM() {
    const [ethWallet, setEthWallet] = useState(undefined);
    const [account, setAccount] = useState(undefined);
    const [atm, setATM] = useState(undefined);
    const [balance, setBalance] = useState(undefined);

    const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
    const atmABI = atm_abi.abi;

    const getWallet = async () => {
        if (window.ethereum) {
            setEthWallet(window.ethereum);
        }

        if (ethWallet) {
            const accounts = await ethWallet.request({ method: "eth_accounts" });
            handleAccount(accounts);
        }
    };

    const handleAccount = (account) => {
        if (account.length > 0) {
            setAccount(account[0]);
        } else {
            console.log("No account found");
        }
    };

    const connectAccount = async () => {
        if (!ethWallet) {
            alert("MetaMask wallet is required to connect.");
            return;
        }

        const accounts = await ethWallet.request({
            method: "eth_requestAccounts",
        });
        handleAccount(accounts);
        getATMContract();
    };

    const getATMContract = () => {
        const provider = new ethers.providers.Web3Provider(ethWallet);
        const signer = provider.getSigner();
        const atmContract = new ethers.Contract(contractAddress, atmABI, signer);
        setATM(atmContract);
    };

    const getBalance = async () => {
        if (atm) {
            const currentBalance = await atm.getBalance();
            setBalance(currentBalance.toNumber());
        }
    };

    const deposit = async () => {
        const amount = parseInt(document.getElementById("amount").value);
        if (atm && amount > 0) {
            const tx = await atm.deposit(amount);
            await tx.wait();
            getBalance();
        }
    };

    const withdraw = async () => {
        const amount = parseInt(document.getElementById("amount").value);
        if (atm && amount > 0) {
            const tx = await atm.withdraw(amount);
            await tx.wait();
            getBalance();
        }
    };

    const boostBalance = async () => {
        if (atm) {
            const tx = await atm.boostBalance();
            await tx.wait();
            getBalance();
        }
    };

    const deductPenalty = async () => {
        if (atm) {
            const penalty = 10; // Fixed penalty amount
            const tx = await atm.deductPenalty(penalty);
            await tx.wait();
            getBalance();
        }
    };

    const initUser = () => {
        if (!ethWallet) {
            return <p>Please install MetaMask to use this ATM.</p>;
        }

        if (!account) {
            return (
                <div style={{ textAlign: "center", marginTop: "20px" }}>
            <h1 style={styles.heading}>Welcome to Valorant ATM</h1>
            <button style={styles.button} onClick={connectAccount}>
                Connect Wallet
            </button>
        </div>
            );
        }

        if (balance === undefined) {
            getBalance();
        }

        return (
            <div style={styles.container}>
                <h1 style={styles.heading}>Valorant ATM</h1>
                <h2 style={styles.subheading}>Balance: {balance} VP</h2>
                <p style={styles.text}>{account}</p>
                <div style={styles.buttonGroup}>
                <button
                    style={{ ...styles.button, ...styles.depositButton }}
                    onClick={deposit}
                >
                    Deposit
                </button>
                <button
                    style={{ ...styles.button, ...styles.withdrawButton }}
                    onClick={withdraw}
                >
                    Withdraw
                </button>
                <button
                    style={{ ...styles.button, ...styles.boostButton }}
                    onClick={boostBalance}
                >
                    Boost Balance
                </button>
                <button
                    style={{ ...styles.button, ...styles.penaltyButton }}
                    onClick={deductPenalty}
                >
                    Deduct Penalty
                </button>
            </div>

                <form style={styles.form}>
                    <label style={styles.label}>Amount:</label>
                    <input
                        id="amount"
                        type="number"
                        min={1}
                        defaultValue={1}
                        style={styles.input}
                    />
                </form>
            </div>
        );
    };

    useEffect(() => {
        getWallet();
    }, []);

    return <main style={styles.main}>{initUser()}</main>;
}

const styles = {
    main: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundImage: "url('https://wallpapers.com/images/hd/4k-hd-valorant-g0u91r852i0fg2we.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: "#1a202c",
        color: "white",
        fontFamily: "Arial, sans-serif",
    },
    container: {
        backgroundColor: "rgba(26, 32, 44, 0.8)",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: "white", 
        fontFamily: "Arial, sans-serif",
        textAlign: "center",
    },
    heading: {
        fontSize: "2rem",
        color: "white",
        marginBottom: "20px", 
    },
    subheading: {
        fontSize: "1.5rem",
        marginBottom: "20px",
    },
    text: {
        marginBottom: "20px",
        wordBreak: "break-word",
    },
    buttonGroup: {
        display: "flex",
        justifyContent: "center", 
        flexDirection: "row", 
        gap: "17px", 
        marginBottom: "20px",
    },
    button: {
        color: "white",
        backgroundColor: "red",
        padding: "25px 50px",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
        fontSize: "2rem",
        display: "block",
        margin: "0 auto",
        transition: "background-color 0.3s ease", 
    },
    depositButton: {
        backgroundColor: "#28a745", // Green for deposit
    },
    withdrawButton: {
        backgroundColor: "#dc3545", // Red for withdraw
    },
    boostButton: {
        backgroundColor: "#007bff", // Blue for boost
    },
    penaltyButton: {
        backgroundColor: "#ffc107", // Yellow for penalty
    },
    form: {
        marginTop: "20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    label: {
        marginRight: "10px",
        fontSize: "1rem",
    },
    input: {
        padding: "5px",
        fontSize: "1rem",
        border: "1px solid #718096",
        borderRadius: "5px",
        backgroundColor: "#4A5568",
        color: "white",
    },
};
