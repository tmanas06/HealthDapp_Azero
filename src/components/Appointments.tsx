import React, { useState } from 'react';

interface Appointment {
  id: string;
  doctorName: string;
  specialty: string;
  date: string;
  time: string;
  status: string;
}

const sampleAppointments: Appointment[] = [
  {
    id: '1',
    doctorName: 'Dr. Sarah Johnson',
    specialty: 'Cardiology',
    date: '2025-04-10',
    time: '10:00 AM',
    status: 'Scheduled'
  },
  {
    id: '2',
    doctorName: 'Dr. Michael Chen',
    specialty: 'Dermatology',
    date: '2025-04-12',
    time: '2:30 PM',
    status: 'Scheduled'
  },
  {
    id: '3',
    doctorName: 'Dr. Emily White',
    specialty: 'Pediatrics',
    date: '2025-04-15',
    time: '11:15 AM',
    status: 'Scheduled'
  }
];

const Appointments: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>(sampleAppointments);

  const bookNow = async () => {
    const mockResult = {
      appointmentId: 'mock-123',
      transactionHash: '0xmockedhash'
    };

    console.log('Appointment booked:', mockResult);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Appointments</h1>
        <button
          onClick={bookNow}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Book New Appointment
        </button>
      </div>
      <p className="text-muted-foreground">Schedule and manage your medical appointments</p>
      
      <div className="appointments-list space-y-4">
        {appointments.map((appointment) => (
          <div key={appointment.id} className="appointment-card p-4 rounded-lg border bg-white">
            <h3 className="text-lg font-semibold text-gray-900">{appointment.doctorName}</h3>
            <p className="mt-2 text-sm text-gray-500"><strong>Specialty:</strong> {appointment.specialty}</p>
            <p className="mt-1 text-sm text-gray-500"><strong>Date:</strong> {appointment.date}</p>
            <p className="mt-1 text-sm text-gray-500"><strong>Time:</strong> {appointment.time}</p>
            <p className="mt-1 text-sm text-gray-500"><strong>Status:</strong> {appointment.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Appointments;
