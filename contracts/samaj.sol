pragma solidity 0.5.16;
pragma experimental ABIEncoderV2;

import "./BasicMetaTransaction.sol";
import "./TellorLatestPrice.sol";
import "./ERC20ApproveViaSignature.sol";
import "./ERC20.sol";


contract Samaj is BasicMetaTransaction {
    
    
    uint8 tellorDai = 39;
    uint8 tellorUSDT = 1;
    
    address private tellorLatestPriceContractAddress = 0x1913713d479259580Be39969C89f4d162dA3b2d3;
    address private erc20ApproveWithSignatureAddress = 0x31DA332A7274B4E3E1d7456050Cd02B65B5dC9f0;
    address private erc20NonApproveWithSignatureAddress = 0xA5D71ce2297Ff3c025Ece1F1Ea7975a76E0a1aD2;
    
    ERC20ApproveViaSignature erc20ApproveWithSignature;
    ERC20 erc20NonApproveWithSignature;
    TellorGetLatestPrice tellorContract;
    
    address owner;
    
    struct Blog{
        string ipfsDetailsHash;
        string ipfsImageHash;
    }
    
    struct ResearchPaper{
        string ipfsDetailsHash;
        string ipfsImageHash;
    }
    
    struct Patent{
        string ipfsDetailsHash;
        string ipfsImageHash;
    }
    
    struct MiscPost{
        string ipfsDetailsHash;
        string ipfsImageHash;
    }
    
    struct User{
     bool isRegistered; 
     string profileImageIPFShash;
     string profileDetailsIPFSHash;
     uint numberOfBlogs;
     uint numberOfResearchPapers;
     uint numberOfPatents;
     uint numberOfMiscPosts;
     mapping(uint => Blog) blogs;
     mapping(uint => ResearchPaper) researchPapers;
     mapping(uint => Patent) patents;
     mapping(uint => MiscPost) miscPosts;     
    }
    
    mapping(address => User) public users;
    
    // mapping(address => int) public balancesDai;
    // mapping(address => int) public balancesUSDT;
    
    constructor() public {
    
        tellorContract = TellorGetLatestPrice(tellorLatestPriceContractAddress);
        erc20ApproveWithSignature = ERC20ApproveViaSignature(erc20ApproveWithSignatureAddress);
        erc20NonApproveWithSignature = ERC20(erc20NonApproveWithSignatureAddress);
        owner = msg.sender;
        
    }
    
    function chargeGasFeeInERC20ApproveWithSign(uint _amountInWei, address _userAddress) public returns(uint){
            uint latestPriceEthToUsd = getLatestPrice(1);
            uint latestPriceDaiToUsd = getLatestPrice(39);
            uint ethToDai = latestPriceDaiToUsd * latestPriceEthToUsd;
            uint amount = ethToDai * _amountInWei;
            erc20ApproveWithSignature.transferFrom(_userAddress, address(this), amount);
    }
    
    function chargeGasFeeInErc20NonApproveWithSIgn(uint _amountInWei, address _userAddress) public returns(uint) {
            uint latestPriceEthToUsd = getLatestPrice(1);
            uint latestPriceKMToUsd = getLatestPrice(3);
            uint ethToDai = latestPriceKMToUsd * latestPriceEthToUsd;
            uint amount = ethToDai * _amountInWei;
            erc20NonApproveWithSignature.transferFrom(_userAddress, address(this), amount);
        
        
    }
    
    
    function getBlogs(address _userAccount) public view returns(Blog[] memory _blogs){
        User storage _user = users[_userAccount];
        
        for(uint i = 0; i < _user.numberOfBlogs; i++){
        _blogs[i] = _user.blogs[i];   
        }
        
        return _blogs;
    }
    
    
    function getResearchPapers(address _userAccount) public view returns(ResearchPaper[] memory _researchPapers){
        User storage _user = users[_userAccount];
        
        for(uint i = 0; i < _user.numberOfResearchPapers; i++){
        _researchPapers[i] = _user.researchPapers[i];   
        }
        
        return _researchPapers;
    }
    
    function getPatents(address _userAccount) public view returns(Patent[] memory _patents){
        User storage _user = users[_userAccount];
        
        for(uint i = 0; i < _user.numberOfPatents; i++){
        _patents[i] = _user.patents[i];   
        }
        
        return _patents;
    }
    
    
    function getMiscPosts(address _userAccount) public view returns(MiscPost[] memory _miscPosts){
        User storage _user = users[_userAccount];
        
        for(uint i = 0; i < _user.numberOfResearchPapers; i++){
        _miscPosts[i] = _user.miscPosts[i];
        }
        return _miscPosts;
    }
    
    
    function createUser(string memory _profileImageIPFShash, string memory _profileDetailsIPFSHash) public {
        require(!users[msgSender()].isRegistered,"User already registered");
        users[msgSender()] = User(true, _profileImageIPFShash, _profileDetailsIPFSHash, 0, 0, 0, 0);
    }
    
    
    function addBlog( string memory _ipfsImageHash, string memory _ipfsDetailsHash, uint _payToken ) public returns(bool){
        uint initialGas = gasleft();
        uint gasPrice = tx.gasprice;
        
        User storage _user = users[msgSender()];
        _user.blogs[_user.numberOfBlogs++] = Blog(_ipfsDetailsHash, _ipfsImageHash);
        // 
        uint gasUsed = initialGas - gasleft();
        uint txCost = gasUsed * gasPrice;
        if(_payToken == 1){
            chargeGasFeeInERC20ApproveWithSign(txCost, msgSender());
        } else if(_payToken == 2){
            chargeGasFeeInErc20NonApproveWithSIgn(txCost, msgSender());
        } else {
            revert();
        }
        return true;
    }
    
    
    
    function addResearchPaper( string memory _ipfsImageHash, string memory _ipfsDetailsHash, uint _payToken) public returns(bool){
        User storage _user = users[msgSender()];
        _user.researchPapers[_user.numberOfResearchPapers++] = ResearchPaper(_ipfsDetailsHash, _ipfsImageHash);
        return true;
    }
    
    
    function addPatents(string memory _ipfsImageHash, string memory _ipfsDetailsHash) public returns(bool){
        User storage _user = users[msgSender()];
        _user.patents[_user.numberOfPatents++] = Patent(_ipfsDetailsHash, _ipfsImageHash);
        return true;
    }
    
    
    function addMiscPost(string memory _ipfsImageHash, string memory _ipfsDetailsHash) public returns(bool){
        User storage _user = users[msgSender()];
        _user.miscPosts[_user.numberOfMiscPosts++] = MiscPost(_ipfsDetailsHash, _ipfsImageHash);
        return true;
    }
    
    function getLatestPrice(uint _dataId) view public  returns(uint value) {
        
        return tellorContract.readTellorValue(_dataId)/1e6;
        
    }
    
    
    
}

