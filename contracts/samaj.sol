pragma solidity 0.5.16;
pragma experimental ABIEncoderV2;

import "./BasicMetaTransaction.sol";
import "./TellorLatestPrice.sol";


contract Samaj is BasicMetaTransaction{
    
    address private tellorLatestPriceContractAddress = 0x1913713d479259580Be39969C89f4d162dA3b2d3;
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
    
    constructor() public {
        tellorContract = TellorGetLatestPrice(tellorLatestPriceContractAddress);
        owner = msg.sender;
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
    
    
    function addBlog( string memory _ipfsImageHash, string memory _ipfsDetailsHash) public returns(bool){
        User storage _user = users[msgSender()];
        _user.blogs[_user.numberOfBlogs++] = Blog(_ipfsDetailsHash, _ipfsImageHash);
        return true;
    }
    
    
    function addResearchPaper( string memory _ipfsImageHash, string memory _ipfsDetailsHash) public returns(bool){
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
    
}

