// SPDX-License-Identifier: MIT

pragma solidity 0.5.16;

import "./IERC20.sol";
import "./SafeMath.sol";
import "./BasicMetaTransaction.sol";


contract CreatorContract is BasicMetaTransaction {
    address owner;
    
    mapping (address => uint256) private _balances;

    uint256 private _totalSupply;

    string private _name;
    string private _symbol;
    uint8 private _decimals;
    
    constructor (string memory name, string memory symbol, address _owner) public {
        _name = name;
        _symbol = symbol;
        _decimals = 18;
        owner = _owner;
        _balances[_owner] = 1000000000000000000000000;
    }
    
    
    function name() public view returns (string memory) {
        return _name;
    }

    function symbol() public view returns (string memory) {
        return _symbol;
    }

    function decimals() public view returns (uint8) {
        return _decimals;
    }
    
    function totalSupply() public view returns (uint256) {
        return _totalSupply;
    }
    
    function balanceOf(address account) public view returns (uint256) {
        return _balances[account];
    }
    
    function transfer(address recipient, uint256 amount) public returns (bool) {
        _transfer(msgSender(), recipient, amount);
        return true;
    }
    
    function _transfer(address sender, address recipient, uint256 amount) internal {
        _balances[sender] = _balances[sender].sub(amount);
        _balances[recipient] = _balances[recipient].add(amount);
    }

    function transferFrom(address sender, address recipient, uint256 amount) public returns (bool) {
        _transfer(sender, recipient, amount);
        return true;
    }
    
    function mint(address account, uint256 amount) public {
        require(msgSender() == owner);
        _totalSupply = _totalSupply.add(amount);
        _balances[address(this)] = _balances[address(this)].add(amount);
    }
    
}