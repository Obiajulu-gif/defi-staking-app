const Tether = artifacts.require("Tether");
const RWD = artifacts.require("RWD");
const DecentralBank = artifacts.require("DecentralBank");

require("chai")
	.use(require("chai-as-promised"))
	.should();

contract("DecentralBank", ([owner, customer]) => {
	let tether, rwd, decentralbank;

	function token(number) {
		return web3.utils.toWei(number, "ether");
	}

	before(async () => {
		// Deploy contracts
		tether = await Tether.new();
		rwd = await RWD.new();
		decentralbank = await DecentralBank.new(rwd.address, tether.address);

		// Transfer initial RWD tokens to DecentralBank
		await rwd.transfer(decentralbank.address, token("1000000"), {
			from: owner,
		});

		// Transfer Tether tokens to customer
		await tether.transfer(customer, token("100"), { from: owner });
	});

	describe("Mock Tether Deployment", async () => {
		it("Matches name successfully", async () => {
			const name = await tether.name();
			assert.equal(name, "Tether");
		});
	});

	describe("Mock RWD Deployment", async () => {
		it("Matches name successfully", async () => {
			const name = await rwd.name();
			assert.equal(name, "Reward Token");
		});
	});

	describe("DecentralBank Deployment", async () => {
		it("Matches name successfully", async () => {
			const name = await decentralbank.name();
			assert.equal(name, "Decentral Bank");
		});

		it("DecentralBank has tokens", async () => {
			const balance = await rwd.balanceOf(decentralbank.address);
			assert.equal(balance.toString(), token("1000"));
		});

		it("Customer has initial Tether tokens", async () => {
			const balance = await tether.balanceOf(customer);
			assert.equal(balance.toString(), token("100"));
		});
	});
});
