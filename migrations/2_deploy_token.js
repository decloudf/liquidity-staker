const CrustTaskToken = artifacts.require("CrustTaskToken");
const { getDeployAccounts } = require('../config/accounts')

module.exports = async function(deployer, network) {
  const web3Accounts = await web3.eth.getAccounts()
  const accounts = await getDeployAccounts(network, web3Accounts)
  await deployer.deploy(CrustTaskToken);
  const crustTaskInstance = await CrustTaskToken.deployed();
  //
  // transfer ownership
  await crustTaskInstance.transferOwnership(accounts.owner);
};
