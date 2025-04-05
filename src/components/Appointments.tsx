"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AppointmentService } from "@/services/AppointmentService";
import { toast } from "sonner";

export default function AppointmentsPage() {
  const [appointment, setAppointment] = useState({
    date: "",
    time: "",
    doctorId: "",
    reason: "",
    notes: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAppointment({ ...appointment, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const service = new AppointmentService();
      await service.initialize();
      const result = await service.bookAppointment(appointment);
      toast.success(`Appointment Booked! ID: ${result.appointmentId}`);
    } catch (err) {
      toast.error(`Error booking appointment: ${(err as Error).message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-2">Appointments</h1>
      <p className="text-gray-600 mb-6">Schedule and manage your medical appointments</p>

      <div className="bg-white p-6 rounded-lg shadow max-w-xl space-y-4">
        <Input name="date" placeholder="Date (YYYY-MM-DD)" onChange={handleChange} />
        <Input name="time" placeholder="Time (HH:MM)" onChange={handleChange} />
        <Input name="doctorId" placeholder="Doctor ID" onChange={handleChange} />
        <Input name="reason" placeholder="Reason for appointment" onChange={handleChange} />
        <Input name="notes" placeholder="Additional notes" onChange={handleChange} />
        <Button onClick={handleSubmit} disabled={loading}>
          {loading ? "Booking..." : "Book Appointment"}
        </Button>
      </div>
    </div>
  );
}
