import React, { Component } from "react";
import Navbar from "./Navbar";
import Web3 from "web3";
import Tether from "../truffle_abis/Tether.json";
import Reward from "../truffle_abis/RWD.json";
import DecentralBank from "../truffle_abis/DecentralBank.json";
import Main from "./Main";
import ParticleSettings from "./particleSettings";

/**
 * The App component is the main entry point of the decentralized finance (DeFi) staking application.
 * 
 * This component is responsible for initializing the connection to the Ethereum blockchain using Web3,
 * loading the necessary smart contract data, and managing the state of the application. It provides
 * functionality for staking and unstaking tokens, and displays the user's account information and balances.
 * 
 * The component interacts with three main smart contracts:
 * - Tether: A stablecoin contract.
 * - Reward: A reward token contract.
 * - DecentralBank: A contract that handles staking and rewards distribution.
 * 
 * The component's state includes the user's account address, contract instances, token balances, and a loading
 * indicator to manage the UI state during asynchronous operations.
 * 
 * @class
 * @extends {Component}
 */
class App extends Component {
	async componentDidMount() {
		await this.loadWeb3();
		await this.loadBlockchainData();
	}
	async loadWeb3() {
		if (window.ethereum) {
			window.web3 = new Web3(window.ethereum);
			await window.ethereum.enable();
		} else if (window.web3) {
			window.web3 = new Web3(window.web3.currentProvider);
		} else {
			alert("Please install MetaMask browser extension");
		}
	}

	/**
	 * Loads blockchain data including user account, network ID, and contract data for Tether, Reward, and Decentral Bank.
	 *
	 * This function performs the following steps:
	 * 1. Retrieves the user's account from the web3 instance and sets it in the component state.
	 * 2. Fetches the current network ID and logs it to the console.
	 * 3. Loads the Tether contract based on the network ID, retrieves the user's Tether balance, and sets it in the component state.
	 * 4. Loads the Reward contract based on the network ID, retrieves the user's Reward balance, and sets it in the component state.
	 * 5. Loads the Decentral Bank contract based on the network ID, retrieves the user's staking balance, and sets it in the component state.
	 * 6. Handles errors if any of the contracts are not deployed on the detected network.
	 * 7. Sets the loading state to false once all data is loaded.
	 *
	 * @async
	 * @function loadBlockchainData
	 * @returns {Promise<void>} A promise that resolves when the blockchain data is fully loaded and the component state is updated.
	 */
	async loadBlockchainData() {
		const web3 = window.web3;
		const account = await web3.eth.getAccounts();
		this.setState({ account: account[0] });
		const networkId = await web3.eth.net.getId();
		console.log(networkId, "Network Id");

		// Load Tether Contract
		const tetherData = Tether.networks[networkId];
		if (tetherData) {
			const tether = new web3.eth.Contract(Tether.abi, tetherData.address);
			this.setState({ tether });
			let tetherBalance = await tether.methods
				.balanceOf(this.state.account)
				.call();
			this.setState({ tetherBalance: tetherBalance.toString() });
		} else {
			window.alert("Error! Tether contract not deployed- no detected network");
		}

		// Load Reward Contract
		const rewardData = Reward.networks[networkId];
		if (rewardData) {
			const reward = new web3.eth.Contract(Reward.abi, rewardData.address);
			this.setState({ reward });
			let rewardBalance = await reward.methods
				.balanceOf(this.state.account)
				.call();
			this.setState({ rewardBalance: rewardBalance.toString() });
		} else {
			window.alert("Error! Reward contract not deployed - no detected network");
		}

		// Load Decentral Bank Contract
		const decentralBankData = DecentralBank.networks[networkId];
		if (decentralBankData) {
			const decentralBank = new web3.eth.Contract(
				DecentralBank.abi,
				decentralBankData.address
			);
			this.setState({ decentralBank });
			let stakingBalance = await decentralBank.methods
				.stakingBalance(this.state.account)
				.call();
			this.setState({ stakingBalance: stakingBalance.toString() });
		} else {
			window.alert(
				"Error! Decentral Bank contract not deployed - no detected network"
			);
		}
		this.setState({ loading: false });
	}

	// staking function
	/**
	 * Stake the specified amount of tokens.
	 *
	 * This function first approves the Decentral Bank to spend the specified amount of Tether tokens
	 * from the user's account. Once the approval transaction is confirmed, it then deposits the tokens
	 * into the Decentral Bank. The function updates the component's state to indicate loading during
	 * the process and resets it once the transactions are complete.
	 *
	 * @param {number} amount - The amount of tokens to be staked.
	 * @returns {Promise<void>} - A promise that resolves when the staking process is complete.
	 */
	stakeTokens = async (amount) => {
		this.setState({ loading: true });
		this.state.tether.methods
			.approve(this.state.decentralBank._address, amount)
			.send({ from: this.state.account })
			.on("transactionHash", (hash) => {
				this.state.decentralBank.methods
					.depositTokens(amount)
					.send({ from: this.state.account })
					.on("transactionHash", (hash) => {
						this.setState({ loading: false });
					});
			});
	};

	// unstaking function
	/**
	 * Unstakes tokens from the Decentral Bank.
	 *
	 * This function sets the loading state to true, initiates the unstaking process
	 * by calling the `unstakeTokens` method on the Decentral Bank smart contract,
	 * and sends the transaction from the current user's account. Once the transaction
	 * hash is received, it sets the loading state to false.
	 *
	 * @async
	 * @function
	 * @returns {Promise<void>} A promise that resolves when the unstaking transaction is sent.
	 */
	unstakeTokens = async () => {
		this.setState({ loading: true });
		this.state.decentralBank.methods
			.unstakeTokens()
			.send({ from: this.state.account })
			.on("transactionHash", (hash) => {
				this.setState({ loading: false });
			});
	};

	constructor(props) {
		super(props);
		this.state = {
			account: "0x0",
			tether: {},
			rwd: {},
			decentralBank: {},
			tetherBalance: "0",
			rwdBalance: "0",
			stakingBalance: "0",
			loading: true,
		};
	}

	render() {
		return (
			<div className="App" style={{ position: "relative" }}>
				<div style={{ position: "absolute" }}>
					<ParticleSettings />
				</div>
				<Navbar account={this.state.account} />
				<div className="container-fluid mt-3">
					{this.state.loading ? (
						<div
							className="d-flex justify-content-center align-items-center"
							style={{ height: "50vh" }}
						>
							<div className="spinner-border text-primary" role="status">
								<span className="sr-only">Loading...</span>
							</div>
						</div>
					) : (
						<Main
							tetherBalance={this.state.tetherBalance}
							rwdBalance={this.state.rwdBalance}
							stakingBalance={this.state.stakingBalance}
							stakeTokens={this.stakeTokens}
						/>
					)}
				</div>
			</div>
		);
	}
}

export default App;
