import React, { useState, useEffect } from 'react';

interface Appointment {
  id: string;
  date: string;
  time: string;
  title: string;
}

const AppointmentBooking = () => {
  // State for selected date, time, and all appointments
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [appointmentTitle, setAppointmentTitle] = useState<string>('');
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());

  // Generate calendar days for the current month
  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    // First day of month and last day of month
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    const daysArray = [];
    const startingDayOfWeek = firstDay.getDay();
    
    // Add empty cells for days before the first day of month
    for (let i = 0; i < startingDayOfWeek; i++) {
      daysArray.push(null);
    }
    
    // Add days of the month
    for (let i = 1; i <= lastDay.getDate(); i++) {
      daysArray.push(new Date(year, month, i));
    }
    
    return daysArray;
  };

  // Generate time slots (9 AM to 5 PM, 30 min intervals)
  const timeSlots = Array.from({ length: 17 }, (_, i) => {
    const hour = Math.floor(i / 2) + 9;
    const minutes = i % 2 === 0 ? '00' : '30';
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour > 12 ? hour - 12 : hour;
    return `${displayHour}:${minutes} ${ampm}`;
  });

  // Format date to YYYY-MM-DD for state storage
  const formatDateForState = (date: Date): string => {
    return date.toISOString().split('T')[0];
  };

  // Format date for display
  const formatDateForDisplay = (dateString: string): string => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Check if a date has appointments
  const hasAppointments = (date: Date): boolean => {
    const dateString = formatDateForState(date);
    return appointments.some(appointment => appointment.date === dateString);
  };

  // Get appointments for selected date
  const getAppointmentsForDate = (dateString: string): Appointment[] => {
    return appointments.filter(appointment => appointment.date === dateString);
  };

  // Check if a time slot is already booked for the selected date
  const isTimeSlotBooked = (time: string): boolean => {
    return appointments.some(
      appointment => appointment.date === selectedDate && appointment.time === time
    );
  };

  // Navigate to previous month
  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  // Navigate to next month
  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  // Handle date selection
  const handleDateSelect = (date: Date) => {
    setSelectedDate(formatDateForState(date));
    setSelectedTime('');
  };

  // Handle time selection
  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  // Book appointment
  const handleBookAppointment = () => {
    if (!selectedDate || !selectedTime || !appointmentTitle.trim()) {
      alert('Please select a date, time, and enter an appointment title');
      return;
    }

    const newAppointment: Appointment = {
      id: `${Date.now()}`,
      date: selectedDate,
      time: selectedTime,
      title: appointmentTitle.trim()
    };

    setAppointments([...appointments, newAppointment]);
    setAppointmentTitle('');
    setSelectedTime('');
  };

  // Get current month and year string
  const currentMonthYear = currentMonth.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric'
  });

  const calendarDays = generateCalendarDays();

  return (
    <div className="flex flex-col md:flex-row gap-6 p-4 max-w-6xl mx-auto">
      {/* Calendar Section */}
      <div className="w-full md:w-3/5 bg-white rounded-lg shadow p-4">
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={goToPreviousMonth}
            className="p-2 bg-gray-100 rounded-full hover:bg-gray-200"
          >
            &lt;
          </button>
          <h2 className="text-xl font-bold">{currentMonthYear}</h2>
          <button
            onClick={goToNextMonth}
            className="p-2 bg-gray-100 rounded-full hover:bg-gray-200"
          >
            &gt;
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="text-center font-medium p-2 bg-gray-50">
              {day}
            </div>
          ))}

          {calendarDays.map((day, index) => (
            <div
              key={index}
              className={`aspect-square p-1 border ${
                day
                  ? formatDateForState(day) === selectedDate
                    ? 'bg-blue-100 border-blue-500'
                    : hasAppointments(day)
                    ? 'bg-green-50'
                    : ''
                  : 'bg-gray-50'
              } ${day ? 'cursor-pointer hover:bg-blue-50' : ''}`}
              onClick={() => day && handleDateSelect(day)}
            >
              {day && (
                <>
                  <div className="text-right text-sm">{day.getDate()}</div>
                  {hasAppointments(day) && (
                    <div className="mt-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full mx-auto"></div>
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </div>

        {/* Appointments List for Selected Date */}
        {selectedDate && (
          <div className="mt-4">
            <h3 className="font-medium">
              Appointments for {formatDateForDisplay(selectedDate)}:
            </h3>
            <div className="mt-2 space-y-2">
              {getAppointmentsForDate(selectedDate).length > 0 ? (
                getAppointmentsForDate(selectedDate).map(appointment => (
                  <div
                    key={appointment.id}
                    className="bg-green-50 border border-green-200 p-2 rounded"
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{appointment.title}</span>
                      <span className="text-sm text-gray-600">{appointment.time}</span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No appointments scheduled</p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Booking Section */}
      <div className="w-full md:w-2/5 bg-white rounded-lg shadow p-4">
        <h2 className="text-xl font-bold mb-4">Book an Appointment</h2>
        
        {selectedDate ? (
          <>
            <p className="mb-4">Selected Date: {formatDateForDisplay(selectedDate)}</p>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Appointment Title
              </label>
              <input
                type="text"
                value={appointmentTitle}
                onChange={(e) => setAppointmentTitle(e.target.value)}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter appointment title"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Select Time
              </label>
              <div className="grid grid-cols-3 gap-2">
                {timeSlots.map(time => (
                  <button
                    key={time}
                    className={`p-2 text-sm rounded ${
                      selectedTime === time
                        ? 'bg-blue-500 text-white'
                        : isTimeSlotBooked(time)
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                    onClick={() => !isTimeSlotBooked(time) && handleTimeSelect(time)}
                    disabled={isTimeSlotBooked(time)}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleBookAppointment}
              disabled={!selectedTime || !appointmentTitle.trim()}
              className={`w-full p-3 rounded-lg ${
                selectedTime && appointmentTitle.trim()
                  ? 'bg-blue-500 hover:bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
              }`}
            >
              Book Appointment
            </button>
          </>
        ) : (
          <p className="text-gray-500">Please select a date from the calendar</p>
        )}
      </div>
    </div>
  );
};

export default AppointmentBooking;