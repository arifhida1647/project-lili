'use client'
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { addDays } from 'date-fns';

const DatePicker = dynamic(() => import('react-datepicker'), { ssr: false });
import 'react-datepicker/dist/react-datepicker.css';
import Link from 'next/link';

interface Reminder {
  id: number;
  reminder: string;
  time: string;
  startDate?: string; // Tanda tanya (?) menandakan properti opsional
  endDate?: string;   // Tanda tanya (?) menandakan properti opsional
}

const ReminderPage: React.FC = () => {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [newReminder, setNewReminder] = useState<string>('');
  const [scheduledDate, setScheduledDate] = useState<Date | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null); // Tanggal mulai
  const [endDate, setEndDate] = useState<Date | null>(null); // Tanggal akhir
  const [idCounter, setIdCounter] = useState<number>(0);
  const [deleteInput, setDeleteInput] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== 'undefined') { // Periksa apakah sedang berjalan di lingkungan klien
      if ('Notification' in window && Notification.permission !== 'granted') {
        Notification.requestPermission();
      }
  
      const storedReminders = localStorage.getItem('reminders');
      if (storedReminders) {
        setReminders(JSON.parse(storedReminders));
        setIdCounter(Math.max(...JSON.parse(storedReminders).map((reminder: Reminder) => reminder.id)) + 1);
      }
    }
  }, []);;

  const addReminder = () => {
    if (newReminder.trim() !== '' && scheduledDate) {
      const newReminderObj: Reminder = {
        id: idCounter,
        reminder: newReminder,
        time: scheduledDate.toLocaleTimeString(),
        startDate: startDate?.toLocaleDateString(), // Menambahkan startDate ke dalam objek reminder
        endDate: endDate?.toLocaleDateString()    // Menambahkan endDate ke dalam objek reminder
      };
      const updatedReminders = [...reminders, newReminderObj];
      setReminders(updatedReminders);
      localStorage.setItem('reminders', JSON.stringify(updatedReminders));
      setNewReminder('');
      setScheduledDate(null);
      setIdCounter(prevId => prevId + 1);

      // Jika tanggal mulai dan akhir diatur, tambahkan reminder untuk setiap hari di antara tanggal tersebut
      if (startDate && endDate) {
        let currentDate = new Date(startDate);
        while (currentDate <= endDate) {
          // Buat reminder untuk setiap hari pada jam yang sama
          const reminderForDay: Reminder = {
            id: idCounter + 1,
            reminder: newReminder,
            time: scheduledDate.toLocaleTimeString(),
            startDate: startDate?.toLocaleDateString(), // Menambahkan startDate ke dalam objek reminder
            endDate: endDate?.toLocaleDateString()    // Menambahkan endDate ke dalam objek reminder
          };
          updatedReminders.push(reminderForDay);
          // Increment idCounter untuk setiap reminder baru
          setIdCounter(prevId => prevId + 1);
          // Tambahkan satu hari ke tanggal saat ini
          currentDate = addDays(currentDate, 1);
        }
      }
    }
  };

  const deleteReminder = (reminder: string) => {
    const updatedReminders = reminders.filter(rem => rem.reminder !== reminder);
    setReminders(updatedReminders);
    localStorage.setItem('reminders', JSON.stringify(updatedReminders));
    setDeleteInput(''); // Clear delete input field after deletion
  };

  const deleteAllReminders = () => {
    setReminders([]);
    localStorage.removeItem('reminders');
  };

  // Function to toggle modal open/close
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const toggleCloseModal = () => {
    setIsModalOpen(!isModalOpen);
  };


  return (
    <div>
      <div className='flex justify-between px-5 py-5'>
        <div className='p-2 bg-green-500 rounded-xl '>
          <Link href="/">
            <img src="iconprev.svg" />
          </Link>
        </div>
        <div className='font-bold font-semibold text-green-500 pt-2'>Reminder</div>
        <div></div>
      </div>
      <div className="my-5 mx-2">
        <label htmlFor="delete-input" className="block mx-2 mb-2 text-sm font-medium text-gray-900">Enter reminder text to delete:</label>
        <div className='flex mx-2'>
          <input type="text"
            value={deleteInput}
            onChange={(e) => setDeleteInput(e.target.value)}
            placeholder="" className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5" />
        </div>
        <div className='flex mt-3'>
          {/* <!-- Modal toggle --> */}
          <button onClick={toggleModal} className="block mx-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
            Add Reminder
          </button>
          <div>
            <button onClick={() => deleteReminder(deleteInput)} className="mx-2 py-3 px-5 bg-red-500 text-white rounded-lg">Delete</button>
          </div>
          <div>
            <button onClick={deleteAllReminders} className="py-3 px-5 bg-red-700 text-white rounded-lg">Delete All</button>
          </div>
        </div>
      </div>
      <div className='my-5'>
        {reminders.filter((reminder, index, self) => self.findIndex(r => r.reminder === reminder.reminder) === index).map(({ id, reminder, time, startDate, endDate }) => (
          <div key={id}>
            <div className="max-w-sm p-6 bg-green-500 border border-gray-200 rounded-lg shadow-xl mx-5 my-5" >
              <a href="#">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">{reminder}</h5>
              </a>
              <p className="mb-1 font-normal text-white">Time: {time}</p>
              <p className="mb-3 font-normal text-white">Start Date: {startDate}</p>
              <p className="mb-3 font-normal text-white">End Date: {endDate}</p>
            </div>
          </div>
        ))}

      </div>

      {/* <!-- Main modal --> */}
      <div id="default-modal" tabIndex={-1} aria-hidden="true" className={`${isModalOpen ? '' : 'hidden'} fixed inset-0 flex items-center justify-center bg-black bg-opacity-50`}>
        <div className="bg-white p-8 rounded-lg w-96">
          <h3 className="text-xl font-semibold text-gray-900">Add Reminder</h3>
          <div className="my-5 mx-2">
            <div className='text-gray-200 mb-2 text-sm'>Reminder text</div>
            <input type="text" value={newReminder} onChange={(e) => setNewReminder(e.target.value)} placeholder="Enter reminder text" className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
          </div>
          <div className='text-gray-200 mb-2 mt-5 mx-2 text-sm'>Date & Time</div>
          <DatePicker
            selected={scheduledDate}
            onChange={(date: Date) => setScheduledDate(date)}
            showTimeSelect
            showTimeSelectOnly // Menampilkan hanya bagian waktu
            timeFormat="HH:mm"
            dateFormat="h:mm aa" // Mengatur format waktu
            placeholderText="Select time"
            className="border-gray-300 border rounded-xl px-2 py-2 mb-2 mx-2"
          />
          <div className='text-gray-200 mb-2 mt-5 mx-2 text-sm'>Start Date</div>
          <DatePicker
            selected={startDate}
            onChange={(date: Date) => setStartDate(date)}
            dateFormat="MMMM d, yyyy"
            placeholderText="Start date"
            className="border-gray-300 border rounded-xl px-2 py-2 mb-2 mx-2"
          />
          <div className='text-gray-200 mb-2 mt-5 mx-2 text-sm'>End Date</div>
          <DatePicker
            selected={endDate}
            onChange={(date: Date) => setEndDate(date)}
            dateFormat="MMMM d, yyyy"
            placeholderText="End date"
            className="border-gray-300 border rounded-xl px-2 py-2 mb-2 mx-2"
          />
          <div className="flex justify-end">
            <button onClick={toggleModal} className="my-5 py-3 px-5 mx-2 bg-blue-500 rounded-2xl text-white">Close</button>
            <button onClick={addReminder} className='my-5 py-3 px-5 mx-2 bg-green-500 rounded-2xl text-white'>Add</button>
          </div>
        </div>
      </div>


    </div>
  );
};

export default ReminderPage;
