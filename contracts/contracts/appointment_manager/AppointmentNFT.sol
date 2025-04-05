// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract AppointmentNFT is ERC721, ERC721URIStorage, Ownable {
    address private appointmentManager;

    constructor() ERC721("HealthChain Appointment", "HCA") Ownable(msg.sender) {}

    function setAppointmentManager(address _appointmentManager) external onlyOwner {
        require(_appointmentManager != address(0), "Invalid appointment manager address");
        appointmentManager = _appointmentManager;
    }

    function mintAppointmentNFT(address to, uint256 tokenId) external {
        require(msg.sender == appointmentManager, "Only appointment manager can mint");
        _safeMint(to, tokenId);

        // Generate token URI with appointment details
        string memory tokenURI = generateTokenURI(tokenId);
        _setTokenURI(tokenId, tokenURI);
    }

    function generateTokenURI(uint256 tokenId) internal pure returns (string memory) {
        // In a production environment, this would generate a proper JSON metadata URI
        // For now, we'll return a placeholder URI
        return string(abi.encodePacked("https://healthchain.example/api/appointment/", toString(tokenId)));
    }

    function toString(uint256 value) internal pure returns (string memory) {
        if (value == 0) {
            return "0";
        }
        uint256 temp = value;
        uint256 digits;
        while (temp != 0) {
            digits++;
            temp /= 10;
        }
        bytes memory buffer = new bytes(digits);
        while (value != 0) {
            digits -= 1;
            buffer[digits] = bytes1(uint8(48 + uint256(value % 10)));
            value /= 10;
        }
        return string(buffer);
    }

    // Override required functions
    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId) public view override(ERC721, ERC721URIStorage) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}