pragma solidity 0.5.16;
pragma experimental ABIEncoderV2;

import "./BasicMetaTransaction.sol";
import "./TellorLatestPrice.sol";
import "./ERC20ApproveViaSignature.sol";
import "./ERC20.sol";
import "./USDToken.sol";
import "./creatorErc20.sol";

contract Samaj is BasicMetaTransaction {
    
    
    uint8 tellorDai = 39;
    uint8 tellorUSDT = 1;
    
    address private usdTokenAddress = 0x92C35d52724eE277f3A53323071659DB47E55bf7;
    address private tellorLatestPriceContractAddress = 0x1913713d479259580Be39969C89f4d162dA3b2d3;
    address private erc20ApproveWithSignatureAddress = 0x31DA332A7274B4E3E1d7456050Cd02B65B5dC9f0;
    address private erc20NonApproveWithSignatureAddress = 0xA5D71ce2297Ff3c025Ece1F1Ea7975a76E0a1aD2;
    
    USDToken usdToken;
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
     bool isCreator;
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
    mapping(address => address) public creatorsContracts;
    
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
            uint ethToKM = latestPriceKMToUsd * latestPriceEthToUsd;
            uint amount = ethToKM * _amountInWei;
            erc20NonApproveWithSignature.transferFrom(_userAddress, address(this), amount);
    }
    
    function chargeGasFeeInUSD(uint _amountInWei, address _userAddress) public {
        uint latestPriceEthToUsd = getLatestPrice(1);
        uint ethToUSD = latestPriceEthToUsd * _amountInWei;
        usdToken.transfer(_userAddress, address(this), ethToUSD);
    }
    
    function supportUserDai(uint _amount, address _senderAddress, address _recieverAddresss) public {
        erc20ApproveWithSignature.transferFrom(_senderAddress, _recieverAddresss, _amount);
    }
    
    
    function supportUserKM(uint _amount, address _senderAddress, address _recieverAddresss) public {
        erc20NonApproveWithSignature.transferFrom(_senderAddress, _recieverAddresss, _amount);
    }
    
    function depositUSD(uint _amountInUSD, address _userAddress) public {
        
        usdToken.mint(_userAddress,_amountInUSD);
    }
      
    function getBlog(address _userAccount,uint _id) public view returns(Blog memory _blog){
        
        return users[_userAccount].blogs[_id];   
        
    }
    
    function getResearchPaper(address _userAccount,uint _id) public view returns(ResearchPaper memory _researchPaper){
        
        return users[_userAccount].researchPapers[_id];   
        
    }
    
    
    
    function getPatent(address _userAccount, uint _id) public view returns(Patent memory _patent){
      
     return users[_userAccount].patents[_id];   
        
    }
    
    
    function getMiscPost(address _userAccount, uint _id) public view returns(MiscPost memory _miscPost){
        
    return users[_userAccount].miscPosts[_id];
        
    }
    
    
    function createUser(string memory _profileImageIPFShash, string memory _profileDetailsIPFSHash) public {
        require(!users[msgSender()].isRegistered,"User already registered");
        users[msgSender()] = User(true, false, _profileImageIPFShash, _profileDetailsIPFSHash, 0, 0, 0, 0);
    }
    
    function becomeCreator(string memory _name, string memory _symbol) public {
        users[msgSender()].isCreator = true;
        CreatorContract _erc20 = new CreatorContract(_name,_symbol,msgSender());
        creatorsContracts[msgSender()] = address(_erc20);
    }
    
    
    function purchaseCreatorToken( address _creatorAddress, uint _amountOfToken, uint _payToken) public {
        uint initialGas = gasleft();
        uint gasPrice = tx.gasprice;
        
        address _creatorTokenAddress = creatorsContracts[_creatorAddress];
        CreatorContract _creatorContract = CreatorContract(_creatorTokenAddress);
        _creatorContract.transferFrom(_creatorAddress, msgSender(), _amountOfToken);
    
        if(_payToken == 1){
            erc20ApproveWithSignature.transferFrom(msgSender(), _creatorTokenAddress, _amountOfToken);            
            uint gasUsed = initialGas - gasleft();
            uint txCost = gasUsed * gasPrice;
            chargeGasFeeInERC20ApproveWithSign(txCost, msgSender());
        } else if(_payToken == 2){
            erc20NonApproveWithSignature.transferFrom(msgSender(), _creatorTokenAddress, _amountOfToken);
            uint gasUsed = initialGas - gasleft();
            uint txCost = gasUsed * gasPrice;
            chargeGasFeeInErc20NonApproveWithSIgn(txCost, msgSender());

        } else {
            revert();
        }
        
    }
    
    
    
    function getCreatorTokenDetails(address _creatorAddress) public view returns(string memory _symbol, uint totalSupply){
        
        CreatorContract _creatorContract = CreatorContract(creatorsContracts[_creatorAddress]);
        return (_creatorContract.symbol(),_creatorContract.totalSupply());
        
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
        
        uint initialGas = gasleft();
        uint gasPrice = tx.gasprice;
        
        User storage _user = users[msgSender()];
        _user.researchPapers[_user.numberOfResearchPapers++] = ResearchPaper(_ipfsDetailsHash, _ipfsImageHash);
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
    
    
    function addPatents(string memory _ipfsImageHash, string memory _ipfsDetailsHash, uint _payToken) public returns(bool){
        
        uint initialGas = gasleft();
        uint gasPrice = tx.gasprice;
        
        User storage _user = users[msgSender()];
        _user.patents[_user.numberOfPatents++] = Patent(_ipfsDetailsHash, _ipfsImageHash);
        
        
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
    
    
    function addMiscPost(string memory _ipfsImageHash, string memory _ipfsDetailsHash, uint _payToken) public returns(bool){
        
        uint initialGas = gasleft();
        uint gasPrice = tx.gasprice;
    
        User storage _user = users[msgSender()];
        _user.miscPosts[_user.numberOfMiscPosts++] = MiscPost(_ipfsDetailsHash, _ipfsImageHash);
        
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
    
    function getLatestPrice(uint _dataId) view public  returns(uint value) {
        
        return tellorContract.readTellorValue(_dataId)/1e6;
        
    }    
}

