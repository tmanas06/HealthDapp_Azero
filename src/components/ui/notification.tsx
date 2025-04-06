 import { useState } from 'react';
import { Bell } from 'lucide-react';

export const Notification = () => {
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState('');

  const showNotification = (msg: string) => {
    setMessage(msg);
    setShow(true);
    setTimeout(() => setShow(false), 3000);
  };

  return (
    <div className="relative">
      <button 
        className="p-2 rounded-full hover:bg-gray-100"
        onClick={() => showNotification('New notifications available')}
      >
        <Bell className="h-5 w-5" />
        {show && (
          <div className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></div>
        )}
      </button>
      
      {show && (
        <div className="absolute top-12 right-0 w-64 p-4 bg-white shadow-lg rounded-md border border-gray-200 z-50">
          <p className="text-sm text-gray-800">{message}</p>
        </div>
      )}
    </div>
  );
};
