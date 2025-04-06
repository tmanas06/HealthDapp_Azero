// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract HealthRecords {
    struct Patient {
        uint id;
        string name;
        uint age;
        string gender;
        string medicalHistory;
        address walletAddress;
    }

    struct Doctor {
        uint id;
        string name;
        string specialization;
        string licenseNumber;
        address walletAddress;
    }

    struct Appointment {
        uint id;
        uint patientId;
        uint doctorId;
        uint timestamp;
        string reason;
        bool completed;
    }

    // Storage for all records
    Patient[] public patients;
    Doctor[] public doctors;
    Appointment[] public appointments;

    // Mappings for quick lookup
    mapping(uint => Patient) public patientById;
    mapping(address => uint[]) public patientIdsByAddress;
    mapping(uint => Doctor) public doctorById;
    mapping(address => uint[]) public doctorIdsByAddress;
    mapping(uint => Appointment) public appointmentById;

    // Events for all CRUD operations
    event PatientCreated(uint id, string name);
    event PatientUpdated(uint id);
    event PatientDeleted(uint id);
    event DoctorCreated(uint id, string name);
    event DoctorUpdated(uint id);
    event DoctorDeleted(uint id);
    event AppointmentCreated(uint id);
    event AppointmentUpdated(uint id);
    event AppointmentDeleted(uint id);

    // Patient CRUD Operations
    function createPatient(
        string memory _name,
        uint _age,
        string memory _gender,
        string memory _medicalHistory
    ) public {
        uint id = patients.length + 1;
        Patient memory newPatient = Patient(
            id,
            _name,
            _age,
            _gender,
            _medicalHistory,
            msg.sender
        );
        patients.push(newPatient);
        patientById[id] = newPatient;
        patientIdsByAddress[msg.sender].push(id);
        emit PatientCreated(id, _name);
    }

    function updatePatient(
        uint _id,
        string memory _name,
        uint _age,
        string memory _gender,
        string memory _medicalHistory
    ) public {
        require(patientById[_id].walletAddress == msg.sender, "Not authorized");
        Patient storage patient = patientById[_id];
        patient.name = _name;
        patient.age = _age;
        patient.gender = _gender;
        patient.medicalHistory = _medicalHistory;
        emit PatientUpdated(_id);
    }

    function deletePatient(uint _id) public {
        require(patientById[_id].walletAddress == msg.sender, "Not authorized");
        delete patientById[_id];
        emit PatientDeleted(_id);
    }

    // Doctor CRUD Operations
    function createDoctor(
        string memory _name,
        string memory _specialization,
        string memory _licenseNumber
    ) public {
        uint id = doctors.length + 1;
        Doctor memory newDoctor = Doctor(
            id,
            _name,
            _specialization,
            _licenseNumber,
            msg.sender
        );
        doctors.push(newDoctor);
        doctorById[id] = newDoctor;
        doctorIdsByAddress[msg.sender].push(id);
        emit DoctorCreated(id, _name);
    }

    function updateDoctor(
        uint _id,
        string memory _name,
        string memory _specialization,
        string memory _licenseNumber
    ) public {
        require(doctorById[_id].walletAddress == msg.sender, "Not authorized");
        Doctor storage doctor = doctorById[_id];
        doctor.name = _name;
        doctor.specialization = _specialization;
        doctor.licenseNumber = _licenseNumber;
        emit DoctorUpdated(_id);
    }

    function deleteDoctor(uint _id) public {
        require(doctorById[_id].walletAddress == msg.sender, "Not authorized");
        delete doctorById[_id];
        emit DoctorDeleted(_id);
    }

    // Appointment CRUD Operations
    function createAppointment(
        uint _patientId,
        uint _doctorId,
        uint _timestamp,
        string memory _reason
    ) public {
        require(patientById[_patientId].walletAddress == msg.sender || 
               doctorById[_doctorId].walletAddress == msg.sender, "Not authorized");
        
        uint id = appointments.length + 1;
        Appointment memory newAppointment = Appointment(
            id,
            _patientId,
            _doctorId,
            _timestamp,
            _reason,
            false
        );
        appointments.push(newAppointment);
        appointmentById[id] = newAppointment;
        emit AppointmentCreated(id);
    }

    function updateAppointment(
        uint _id,
        uint _timestamp,
        string memory _reason,
        bool _completed
    ) public {
        Appointment storage appointment = appointmentById[_id];
        require(patientById[appointment.patientId].walletAddress == msg.sender || 
               doctorById[appointment.doctorId].walletAddress == msg.sender, "Not authorized");
        
        appointment.timestamp = _timestamp;
        appointment.reason = _reason;
        appointment.completed = _completed;
        emit AppointmentUpdated(_id);
    }

    function deleteAppointment(uint _id) public {
        Appointment storage appointment = appointmentById[_id];
        require(patientById[appointment.patientId].walletAddress == msg.sender || 
               doctorById[appointment.doctorId].walletAddress == msg.sender, "Not authorized");
        
        delete appointmentById[_id];
        emit AppointmentDeleted(_id);
    }

    // View functions
    function getPatient(uint _id) public view returns (Patient memory) {
        return patientById[_id];
    }

    function getDoctor(uint _id) public view returns (Doctor memory) {
        return doctorById[_id];
    }

    function getAppointment(uint _id) public view returns (Appointment memory) {
        return appointmentById[_id];
    }

    function getPatientsByAddress(address _address) public view returns (Patient[] memory) {
        uint[] memory ids = patientIdsByAddress[_address];
        Patient[] memory result = new Patient[](ids.length);
        for (uint i = 0; i < ids.length; i++) {
            result[i] = patientById[ids[i]];
        }
        return result;
    }

    function getDoctorsByAddress(address _address) public view returns (Doctor[] memory) {
        uint[] memory ids = doctorIdsByAddress[_address];
        Doctor[] memory result = new Doctor[](ids.length);
        for (uint i = 0; i < ids.length; i++) {
            result[i] = doctorById[ids[i]];
        }
        return result;
    }
}
