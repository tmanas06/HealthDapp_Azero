import { ethers } from "hardhat";

async function main() {
  // Aleph Zero testnet configuration
  const ALEPH_ZERO_TESTNET = {
    chainId: 2039,
    rpc: "https://rpc.alephzero-testnet.gelato.digital",
    explorer: "https://evm-explorer-testnet.alephzero.org"
  };

  console.log("Deploying contracts to Aleph Zero testnet...");

  // Deploy AppointmentNFT first
  const AppointmentNFT = await ethers.getContractFactory("AppointmentNFT");
  const appointmentNFT = await AppointmentNFT.deploy();
  await appointmentNFT.waitForDeployment();
  console.log(`AppointmentNFT deployed to: ${await appointmentNFT.getAddress()}`);

  // Deploy AppointmentManager with AppointmentNFT address
  const AppointmentManager = await ethers.getContractFactory("AppointmentManager");
  const appointmentManager = await AppointmentManager.deploy(await appointmentNFT.getAddress());
  await appointmentManager.waitForDeployment();
  console.log(`AppointmentManager deployed to: ${await appointmentManager.getAddress()}`);

  // Set AppointmentManager address in AppointmentNFT contract
  const setManagerTx = await appointmentNFT.setAppointmentManager(await appointmentManager.getAddress());
  await setManagerTx.wait();
  console.log("AppointmentManager address set in AppointmentNFT contract");

  console.log("\nDeployment completed successfully!");
  console.log("\nContract addresses:");
  console.log(`AppointmentNFT: ${await appointmentNFT.getAddress()}`);
  console.log(`AppointmentManager: ${await appointmentManager.getAddress()}`);
  console.log(`\nVerify contracts on ${ALEPH_ZERO_TESTNET.explorer}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });