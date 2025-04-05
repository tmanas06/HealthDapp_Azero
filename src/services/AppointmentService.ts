import { ethers } from 'ethers';
import { create } from 'ipfs-http-client';

import AppointmentManagerABI from '../../contracts/artifacts/contracts/appointment_manager/AppointmentManager.sol/AppointmentManager.json';
import AppointmentNFTABI from '../../contracts/artifacts/contracts/appointment_manager/AppointmentNFT.sol/AppointmentNFT.json';

const projectId = '9fa5816cea614bb10e61';
const projectSecret = 'ccfc8a4eb6fac3b41d29eaa095e579010c408086108ce93ea95daf00a663222b';
const auth = 'Basic ' + Buffer.from(`${projectId}:${projectSecret}`).toString('base64');

const ipfsClient = create({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  headers: {
    authorization: auth
  }
});

export interface AppointmentData {
  date: string;
  time: string;
  doctorId: string;
  reason: string;
  notes: string;
}

export class AppointmentService {
  private provider: ethers.BrowserProvider;
  private signer: ethers.Signer | null;
  private appointmentManagerContract: ethers.Contract | null;
  private appointmentNFTContract: ethers.Contract | null;

  constructor() {
    this.provider = new ethers.BrowserProvider((window as any).ethereum);
    this.signer = null;
    this.appointmentManagerContract = null;
    this.appointmentNFTContract = null;
  }

  async initialize() {
    try {
      this.signer = await this.provider.getSigner();

      // Replace with actual Remix deployed addresses
      const appointmentManagerAddress = '0xYourAppointmentManagerAddressHere';
      const appointmentNFTAddress = '0xYourAppointmentNFTAddressHere';

      this.appointmentManagerContract = new ethers.Contract(
        appointmentManagerAddress,
        AppointmentManagerABI.abi,
        this.signer
      );

      this.appointmentNFTContract = new ethers.Contract(
        appointmentNFTAddress,
        AppointmentNFTABI.abi,
        this.signer
      );
    } catch (error) {
      console.error('Error initializing AppointmentService:', error);
      throw error;
    }
  }

  async uploadToIPFS(appointmentData: AppointmentData) {
    try {
      const metadata = {
        ...appointmentData,
        timestamp: new Date().toISOString()
      };

      const { cid } = await ipfsClient.add(JSON.stringify(metadata));
      return cid.toString();
    } catch (error) {
      console.error('Error uploading to IPFS:', error);
      throw error;
    }
  }

  async bookAppointment(appointmentData: AppointmentData) {
    if (!this.appointmentManagerContract || !this.signer) {
      throw new Error('AppointmentService not properly initialized');
    }

    try {
      const ipfsHash = await this.uploadToIPFS(appointmentData);

      const appointmentDateTime = new Date(`${appointmentData.date}T${appointmentData.time}`);
      const timestamp = Math.floor(appointmentDateTime.getTime() / 1000);

      const doctor = await this.appointmentManagerContract.doctors(appointmentData.doctorId);
      const consultationFee = doctor.consultationFee;

      const tx = await this.appointmentManagerContract.bookAppointment(
        appointmentData.doctorId,
        timestamp,
        ipfsHash,
        { value: consultationFee }
      );

      const receipt = await tx.wait();

      const appointmentId = receipt.events?.find(
        (event: any) => event.event === 'AppointmentBooked'
      )?.args?.appointmentId;

      return {
        appointmentId,
        ipfsHash,
        transactionHash: receipt.hash
      };
    } catch (error) {
      console.error('Error booking appointment:', error);
      throw error;
    }
  }

  async getAppointmentDetails(appointmentId: number) {
    if (!this.appointmentManagerContract) {
      throw new Error('AppointmentService not properly initialized');
    }

    try {
      const appointment = await this.appointmentManagerContract.appointments(appointmentId);
      return appointment;
    } catch (error) {
      console.error('Error fetching appointment details:', error);
      throw error;
    }
  }

  async cancelAppointment(appointmentId: number) {
    if (!this.appointmentManagerContract) {
      throw new Error('AppointmentService not properly initialized');
    }

    try {
      const tx = await this.appointmentManagerContract.cancelAppointment(appointmentId);
      await tx.wait();
      return tx.hash;
    } catch (error) {
      console.error('Error cancelling appointment:', error);
      throw error;
    }
  }
}
