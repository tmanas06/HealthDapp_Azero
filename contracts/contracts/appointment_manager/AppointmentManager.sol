// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./AppointmentNFT.sol";

contract AppointmentManager is Ownable, ReentrancyGuard {
    using Counters for Counters.Counter;
    Counters.Counter private _appointmentIds;

    AppointmentNFT private appointmentNFT;

    struct Doctor {
        bool isRegistered;
        string name;
        string specialization;
        uint256 consultationFee;
    }

    struct TimeSlot {
        uint256 startTime;
        bool isBooked;
    }

    struct Appointment {
        uint256 id;
        address patient;
        address doctor;
        uint256 startTime;
        bool completed;
        bool cancelled;
    }

    mapping(address => Doctor) public doctors;
    mapping(address => mapping(uint256 => TimeSlot)) public doctorTimeSlots;
    mapping(uint256 => Appointment) public appointments;

    event DoctorRegistered(address indexed doctor, string name, string specialization);
    event TimeSlotAdded(address indexed doctor, uint256 startTime);
    event AppointmentBooked(uint256 indexed appointmentId, address indexed patient, address indexed doctor, uint256 startTime);
    event AppointmentCompleted(uint256 indexed appointmentId);
    event AppointmentCancelled(uint256 indexed appointmentId);

    constructor(address _appointmentNFTAddress) Ownable(msg.sender) {
        appointmentNFT = AppointmentNFT(_appointmentNFTAddress);
    }

    modifier onlyRegisteredDoctor() {
        require(doctors[msg.sender].isRegistered, "Not a registered doctor");
        _;
    }

    function registerDoctor(string memory name, string memory specialization, uint256 consultationFee) external {
        require(!doctors[msg.sender].isRegistered, "Doctor already registered");
        require(consultationFee > 0, "Consultation fee must be greater than 0");

        doctors[msg.sender] = Doctor({
            isRegistered: true,
            name: name,
            specialization: specialization,
            consultationFee: consultationFee
        });

        emit DoctorRegistered(msg.sender, name, specialization);
    }

    function addTimeSlot(uint256 startTime) external onlyRegisteredDoctor {
        require(startTime > block.timestamp, "Time slot must be in the future");
        require(!doctorTimeSlots[msg.sender][startTime].isBooked, "Time slot already exists");

        doctorTimeSlots[msg.sender][startTime] = TimeSlot(startTime, false);
        emit TimeSlotAdded(msg.sender, startTime);
    }

    function bookAppointment(address doctor, uint256 startTime) external payable nonReentrant {
        require(doctors[doctor].isRegistered, "Doctor not registered");
        require(doctorTimeSlots[doctor][startTime].startTime == startTime, "Time slot not available");
        require(!doctorTimeSlots[doctor][startTime].isBooked, "Time slot already booked");
        require(msg.value >= doctors[doctor].consultationFee, "Insufficient payment");

        _appointmentIds.increment();
        uint256 appointmentId = _appointmentIds.current();

        appointments[appointmentId] = Appointment({
            id: appointmentId,
            patient: msg.sender,
            doctor: doctor,
            startTime: startTime,
            completed: false,
            cancelled: false
        });

        doctorTimeSlots[doctor][startTime].isBooked = true;

        // Mint NFT for the patient
        appointmentNFT.mintAppointmentNFT(msg.sender, appointmentId);

        // Transfer consultation fee to doctor
        (bool sent, ) = payable(doctor).call{value: msg.value}("");
        require(sent, "Failed to send consultation fee");

        emit AppointmentBooked(appointmentId, msg.sender, doctor, startTime);
    }

    function completeAppointment(uint256 appointmentId) external onlyRegisteredDoctor {
        Appointment storage appointment = appointments[appointmentId];
        require(appointment.doctor == msg.sender, "Not the appointed doctor");
        require(!appointment.completed && !appointment.cancelled, "Appointment already completed or cancelled");

        appointment.completed = true;
        emit AppointmentCompleted(appointmentId);
    }

    function cancelAppointment(uint256 appointmentId) external {
        Appointment storage appointment = appointments[appointmentId];
        require(
            msg.sender == appointment.patient || msg.sender == appointment.doctor,
            "Not authorized to cancel"
        );
        require(!appointment.completed && !appointment.cancelled, "Appointment already completed or cancelled");

        appointment.cancelled = true;
        doctorTimeSlots[appointment.doctor][appointment.startTime].isBooked = false;

        emit AppointmentCancelled(appointmentId);
    }

    function getAppointment(uint256 appointmentId) external view returns (Appointment memory) {
        return appointments[appointmentId];
    }

    function getDoctorTimeSlots(address doctor, uint256 startTime) external view returns (TimeSlot memory) {
        return doctorTimeSlots[doctor][startTime];
    }
}