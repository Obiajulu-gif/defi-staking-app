const decentralBank = artifacts.require('DecentralBank');

module.exports = async function issueRewards(callback) {
    let decentralbank = await decentralBank.deployed();
    await decentralbank.issueTokens()
    console.log("Token have been issues successfully");
    callback();
    
}