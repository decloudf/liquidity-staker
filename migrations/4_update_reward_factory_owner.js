const StakingRewardsFactory = artifacts.require("StakingRewardsFactory");
const { getDeployAccounts } = require('../config/accounts')
const dayjs = require('dayjs')

module.exports = async function(deployer, network) {
  const web3Accounts = await web3.eth.getAccounts()
  const accounts = await getDeployAccounts(network, web3Accounts)
  const rewardInstance = await StakingRewardsFactory.deployed();
  //
  // transfer ownership
  await rewardInstance.transferOwnership(accounts.owner);
};
