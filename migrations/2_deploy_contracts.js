const Tether = artifacts.require("Tether");
const RWD = artifacts.require("RWD");
const DecentralBank = artifacts.require("DecentralBank");

module.exports = async function(deployer, network, account) {
	// deploy mock Tether Contract
	await deployer.deploy(Tether);
	const tether = await Tether.deployed();

	// deploy RWD Contract
	await deployer.deploy(RWD);
	const rwd = await RWD.deployed();

	// deploy DecentralBank Contract
	await deployer.deploy(DecentralBank, rwd.address, tether.address);
	const decentralbank = await DecentralBank.deployed();

	// transfer all RWD token to decentral bank
	await rwd.transfer(decentralbank.address, "1000000000000000000"); // 18 zeros

	// Distribute 100 Tether token to investor
	await tether.transfer(account[1], "10000000000000000"); // 16 zeros
};
