import { AppointmentService } from '../services/AppointmentService';

const service = new AppointmentService();

const bookNow = async () => {
  await service.initialize();

  const result = await service.bookBasicAppointment({
    doctorId: '1',
    date: '2025-04-08',
    time: '10:30'
  });

  console.log('Appointment booked:', result);
};
