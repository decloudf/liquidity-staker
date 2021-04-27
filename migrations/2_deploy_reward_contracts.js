const CrustTaskToken = artifacts.require("CrustTaskToken");
const StakingRewardsFactory = artifacts.require("StakingRewardsFactory");
const { getDeployAccounts } = require('../config/accounts')
const dayjs = require('dayjs')

module.exports = async function(deployer, network) {
  const web3Accounts = await web3.eth.getAccounts()
  const accounts = await getDeployAccounts(network, web3Accounts)
  const start = dayjs('2020-12-08T14:00:00.000Z')
  await deployer.deploy(StakingRewardsFactory, "0x2620638eda99f9e7e902ea24a285456ee9438861", start.unix());
};
