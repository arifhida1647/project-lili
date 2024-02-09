'use client'
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const DatePicker = dynamic(() => import('react-datepicker'), { ssr: false });
import 'react-datepicker/dist/react-datepicker.css';
import Link from 'next/link';

const ReminderPage: React.FC = () => {
  const [reminders, setReminders] = useState<{ id: number, reminder: string, time: string }[]>([]);
  const [newReminder, setNewReminder] = useState<string>('');
  const [scheduledDate, setScheduledDate] = useState<Date | null>(null);
  const [idCounter, setIdCounter] = useState<number>(0);
  const [deleteInput, setDeleteInput] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // State to track modal open/close


  useEffect(() => {
    if ('Notification' in window && Notification.permission !== 'granted') {
      Notification.requestPermission();
    }

    const storedReminders = localStorage.getItem('reminders');
    if (storedReminders) {
      setReminders(JSON.parse(storedReminders));
      setIdCounter(Math.max(...JSON.parse(storedReminders).map((reminder: { id: number }) => reminder.id)) + 1);
    }
  }, []);

  const addReminder = () => {
    if (newReminder.trim() !== '' && scheduledDate) {
      const newReminderObj = { id: idCounter, reminder: newReminder, time: scheduledDate.toLocaleTimeString() };
      const updatedReminders = [...reminders, newReminderObj];
      setReminders(updatedReminders);
      localStorage.setItem('reminders', JSON.stringify(updatedReminders));
      setNewReminder('');
      setScheduledDate(null);
      setIdCounter(prevId => prevId + 1); // Increment idCounter after adding a reminder
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
        {reminders.map(({ id, reminder, time }) => (
          <div key={id}>
            <div className="max-w-sm p-6 bg-green-500 border border-gray-200 rounded-lg shadow-xl mx-5 my-5" >
              <a href="#">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">{reminder}</h5>
              </a>
              <p className="mb-3 font-normal text-white">{time}</p>
            </div>
          </div>
        ))}
      </div>

      {/* <!-- Main modal --> */}
      <div id="default-modal" tabIndex={-1} aria-hidden="true" className={`${isModalOpen ? '' : 'hidden'} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}>
        <div className="relative p-4 w-full max-w-2xl max-h-full">
          {/* <!-- Modal content --> */}
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            {/* <!-- Modal header --> */}
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Add Reminder
              </h3>
              <button onClick={toggleCloseModal} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            {/* <!-- Modal body --> */}
            <div className="p-4 md:p-5 space-y-4">
              <div className="my-5 mx-2">
                <div className='text-gray-200 mb-2 text-sm'>Reminder text </div>
                <input type="text"
                  value={newReminder}
                  onChange={(e) => setNewReminder(e.target.value)}
                  placeholder="Enter reminder text" className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
              </div>
              <div className='text-gray-200 mb-2 mt-5 mx-2 text-sm'>Date & Time</div>
              <DatePicker
                selected={scheduledDate}
                onChange={(date: Date) => setScheduledDate(date)}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={5}
                dateFormat="MMMM d, yyyy h:mm aa"
                placeholderText="date & time"
                className="border-gray-300 border rounded-xl px-2 py-2 mb-2 mx-2"
              />
            </div>
            {/* <!-- Modal footer --> */}
            <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
              <button className='my-5 py-3 px-5 mx-2 bg-green-500 rounded-2xl text-white' onClick={addReminder}>Add</button>
            </div>
          </div>
        </div>
      </div>


    </div>
  );
};

export default ReminderPage;
