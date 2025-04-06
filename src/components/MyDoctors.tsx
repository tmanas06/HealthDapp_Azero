import React from 'react';

interface Doctor {
    id: string;
    name: string;
    specialty: string;
    rating: number;
    availability: string;
    location: string;
}

const sampleDoctors: Doctor[] = [
    {
      id: '1',
      name: 'Dr. Sarah Johnson',
      specialty: 'Cardiology',
      rating: 4.8,
      availability: 'Available',
      location: 'Main Hospital'
    },
    {
      id: '2',
      name: 'Dr. Michael Chen',
      specialty: 'Dermatology',
      rating: 4.9,
      availability: 'Available',
      location: 'Outpatient Clinic'
    },
    {
      id: '3',
      name: 'Dr. Emily White',
      specialty: 'Pediatrics',
      rating: 4.7,
      availability: 'Available',
      location: 'Children\'s Hospital'
    }
  ];

const MyDoctors: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">My Doctors</h1>
        <button
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add New Doctor
        </button>
      </div>
      <p className="text-muted-foreground">View and manage your connected healthcare providers</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sampleDoctors.map((doctor) => (
          <div key={doctor.id} className="bg-white rounded-lg shadow overflow-hidden">
            <div className="aspect-w-16 aspect-h-9">
              <img
                // src={doctor.photoUrl}
                alt={doctor.name}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900">{doctor.name}</h3>
              <p className="mt-1 text-sm text-gray-500">{doctor.specialty}</p>
              <div className="flex items-center mt-2">
                <svg
                  className="w-4 h-4 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="ml-1 text-sm text-gray-500">{doctor.rating}</span>
              </div>
              <p className="mt-2 text-sm text-gray-500">
                <span className="font-medium">Availability:</span> {doctor.availability}
              </p>
              <p className="mt-1 text-sm text-gray-500">
                <span className="font-medium">Location:</span> {doctor.location}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyDoctors;