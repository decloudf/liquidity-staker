pragma solidity >=0.5.0 <0.7.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20Burnable.sol";
import "@openzeppelin/contracts/ownership/Ownable.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";

contract CrustTaskToken is ERC20, Ownable {
  event ClaimCRUT(address indexed _address, uint256 _value, bytes32 pubKey);

  mapping (address => bool) private _blockedAccounts;

  modifier notBlocked() {
    require(!isBlocked(msg.sender), "CrustTaskToken: account is blocked");
    _;
  }

  function name() public pure returns (string memory) {
    return "Crust Storage Market";
  }

  function symbol() public pure returns (string memory) {
    return "CSM";
  }

  function decimals() public pure returns (uint8) {
    return 18;
  }

  function burn(address account, uint amount) public onlyOwner {
    _burn(account, amount);
  }

  function mint(address account, uint amount) public onlyOwner {
    _mint(account, amount);
  }

  function getBalance(address account) public view returns (uint256) {
    return balanceOf(account);
  }

  function transfer(address recipient, uint256 amount) public notBlocked returns (bool) {
    super._transfer(msg.sender, recipient, amount);
    return true;
  }

  function isBlocked(address account) public view returns (bool) {
    return _blockedAccounts[account];
  }

  function setBlock(address account, bool blocked) public onlyOwner returns (bool) {
    _blockedAccounts[account] = blocked;
    return true;
  }

  //
  // claim token
  function claim(uint amount, bytes32 pubKey) public notBlocked {
    _claim(msg.sender, amount, pubKey);
  }

  //
  // claim all token in the account
  function claimAll(bytes32 pubKey) public notBlocked {
    uint256 amount = getBalance(msg.sender);
    _claim(msg.sender, amount, pubKey);
  }

  function _claim(address account, uint amount, bytes32 pubKey) private {
    require(amount > 0, "claim amount should not be zero");
    require(pubKey != bytes32(0), "Failed to provide an Ed25519 or SR25519 public key.");

    _burn(account, amount);
    emit ClaimCRUT(account, amount, pubKey);
  }
}
