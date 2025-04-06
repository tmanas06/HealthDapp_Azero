import { ethers } from 'ethers';
import AppointmentManagerABI from '../../contracts/artifacts/contracts/appointment_manager/AppointmentManager.sol/AppointmentManager.json';

export interface AppointmentData {
  date: string;
  time: string;
  doctorId: string;
}

export class AppointmentService {
  private provider: ethers.BrowserProvider;
  private signer: ethers.Signer | null;
  private appointmentManagerContract: ethers.Contract | null;

  constructor() {
    this.provider = new ethers.BrowserProvider((window as any).ethereum);
    this.signer = null;
    this.appointmentManagerContract = null;
  }

  async initialize() {
    try {
      this.signer = await this.provider.getSigner();

      // ✅ Replace this with your Remix-deployed contract address on Aleph Zero Testnet
      const appointmentManagerAddress = '0xYourAppointmentManagerAddress';

      this.appointmentManagerContract = new ethers.Contract(
        appointmentManagerAddress,
        AppointmentManagerABI.abi,
        this.signer
      );
    } catch (error) {
      console.error('Initialization failed:', error);
      throw error;
    }
  }

  async bookBasicAppointment(data: AppointmentData) {
    if (!this.appointmentManagerContract || !this.signer) {
      throw new Error('AppointmentService not initialized');
    }

    try {
      const appointmentDateTime = new Date(`${data.date}T${data.time}`);
      const timestamp = Math.floor(appointmentDateTime.getTime() / 1000);

      // ✅ Get doctor details to fetch fee
      const doctor = await this.appointmentManagerContract.doctors(data.doctorId);
      const consultationFee = doctor.consultationFee;

      // ✅ Call bookAppointment with empty string for IPFS hash
      const tx = await this.appointmentManagerContract.bookAppointment(
        data.doctorId,
        timestamp,
        '', // Empty IPFS hash
        { value: consultationFee }
      );

      const receipt = await tx.wait();

      const event = receipt.events?.find((e: any) => e.event === 'AppointmentBooked');
      const appointmentId = event?.args?.appointmentId;

      return {
        appointmentId,
        transactionHash: receipt.hash
      };
    } catch (error) {
      console.error('Error booking appointment:', error);
      throw error;
    }
  }
}
