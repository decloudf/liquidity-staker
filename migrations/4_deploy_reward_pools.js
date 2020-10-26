const StakingRewardsFactory = artifacts.require("StakingRewardsFactory");
const { getDeployAccounts } = require('../config/accounts')
const rewardPool = require('../config/reward_pools')

module.exports = async function(deployer, network) {
  const factoryInstance = await StakingRewardsFactory.deployed();
  const pools = rewardPool[network]
  if (!pools) {
    throw 'invalid pool config'
  }
  console.log('depoly pools: ', pools)
  for(const pool of pools) {
    console.log('deploying pool: ', pool.name, pool)
    await factoryInstance.deploy(pool.address, web3.utils.toWei(`${pool.rewards}`, 'ether'))
  }
}