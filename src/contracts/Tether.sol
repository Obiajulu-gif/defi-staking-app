pragma solidity ^0.5.0;

contract Tether {
    string public name = 'Tether';
    string public symbol = 'USDT';
    uint256 public totalSupply = 100000000000000000000; // 1 million dollar
    uint8 public decimals = 18;

    event Transfer(
        address indexed _from,
        address indexed _to,
        uint _value
    );

    event Approval(
        address indexed _owner,
        address indexed _spender,
        uint _value
    );

    mapping(address => uint256) public balanceOf;
    mapping (address => mapping (address => uint)) allowance;

    constructor() public {
        balanceOf[msg.sender] = totalSupply;
    }

    function transfer(address _to, uint256 _value) public returns (bool success){
        // check the amount of the sender 
        require(balanceOf[msg.sender] >= _value, "Insufficient balance");
        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;
        emit Transfer(msg.sender, _to, _value);
        return true;
    }
    function approve(address _spender, uint256 _value) public returns (bool success) {
        allowance[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }

    function transferFrom(address _from, address _to, uint256 _value )public returns(bool success){
        // check if the sender balance is less than the money he intended to send
        require(balanceOf[_from] >= _value, "insufficient balance");
        require(allowance[_from][msg.sender] >= _value, "insufficient balance");
        // deduct the amount from the send account
        balanceOf[_from] -= _value;
        // add the amount to the reciever account
        balanceOf[_to] += _value;
        allowance[msg.sender][_from] -= _value;
        // log the transaction on the chain
        emit Transfer(_from, _to, _value);
        return true;
    }
}