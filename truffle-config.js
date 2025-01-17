require("babel-register");
require("babel-polyfill");

module.exports = {
	networks: {
		development: {
			host: "127.0.0.1", // Ganache host
			port: 8545, // Ganache port
			network_id: "*", // Match any network ID
			timeoutBlocks: 200, // Increase timeout for connection
			skipDryRun: true, // Avoid dry runs before migrations
		},
	},
	contracts_directory: "./src/contracts/", // Directory for Solidity contracts
	contracts_build_directory: "./src/truffle_abis", // Directory for ABI files
	compilers: {
		solc: {
			version: "^0.5.0", // Solidity compiler version
			optimizer: {
				enabled: true, // Enable optimization
				runs: 200, // Optimize for how many times you intend to run the code
			},
		},
	},
};
