const CrustTaskToken = artifacts.require("CrustTaskToken");
const StakingRewardsFactory = artifacts.require("StakingRewardsFactory");
const { getDeployAccounts } = require('../config/accounts')
const dayjs = require('dayjs')

module.exports = async function(deployer, network) {
  const web3Accounts = await web3.eth.getAccounts()
  const accounts = await getDeployAccounts(network, web3Accounts)
  const start = dayjs('2020-10-20T07:10:00.000Z')
  await deployer.deploy(StakingRewardsFactory, CrustTaskToken.address, start.unix());
  const rewardInstance = await StakingRewardsFactory.deployed();
  //
  // transfer ownership
  // make claims contract own the token
  await rewardInstance.transferOwnership(accounts.owner);
};
