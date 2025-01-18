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
			assert.equal(balance.toString(), token("1000000"));
		});

		it("Customer has initial Tether tokens", async () => {
			const balance = await tether.balanceOf(customer);
			assert.equal(balance.toString(), token("100"));
		});
	});

	describe("Yield Farming", async () => {
		it("reward token for staking", async () => {
			let result;
			// Initial Balance: Confirms the customer starts with 100 Tether
			result = await tether.balanceOf(customer);
			assert.equal(
				result.toString(),
				token("100"),
				"customer mock wallet balance before staking"
			);

			// Approval: The customer allows the bank to handle 100 Tether
			await tether.approve(decentralbank.address, token("100"), {
				from: customer,
			});
			await decentralbank.depositTokens(token("100"), { from: customer });

			// Post-Staking Balance:
			// Customer's balance becomes 0 Tether (all tokens are staked).
			result = await tether.balanceOf(customer);
			assert.equal(
				result.toString(),
				token("0"),
				"customer mock wallet balance after staking"
			);

			// Post-Staking Balance:
			// Bank's balance becomes 100 Tether (customer's staked tokens
			result = await tether.balanceOf(decentralbank.address);
			assert.equal(
				result.toString(),
				token("100"),
				"decentralbank mock wallet balance after staking"
			);

			// Staking Status: Confirms the customer is marked as "staked."
			result = await decentralbank.isStaked(customer);
			assert.equal(result.toString(), "true", "customer is staked");

			// issue token
			await decentralbank.issueTokens({ from: owner }); // Issue tokens to the bank

			// ensure only the owner can issue tokens
			await decentralbank.issueTokens({ from: customer }).should.be.rejected;

			// unstake token
			await decentralbank.unstackedTokens({ from: customer });

			result = await tether.balanceOf(customer);
			assert.equal(
				result.toString(),
				token("100"),
				"customer mock wallet balance after unstaking"
			);

			// Bank's balance becomes 0 Tether 
			result = await tether.balanceOf(decentralbank.address);
			assert.equal(
				result.toString(),
				token("0"),
				"decentralbank mock wallet balance after staking"
			);

			// Staking Status:  the customer is marked as "unstaked."
			result = await decentralbank.isStaked(customer);
			assert.equal(result.toString(), "false", "customer is not longer staking");
		});
	});
});
