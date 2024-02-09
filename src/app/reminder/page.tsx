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
        <input type="text"
          value={newReminder}
          onChange={(e) => setNewReminder(e.target.value)}
          placeholder="Enter reminder text" className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
      </div>
      <div className="">
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
      <button className='my-5 py-3 px-5 mx-2 bg-green-500 rounded-2xl ' onClick={addReminder}>Add</button>
      <div className="my-5 mx-2">
        <label htmlFor="delete-input" className="block mx-2 mb-2 text-sm font-medium text-gray-900">Enter reminder text to delete:</label>
        <div className='flex mx-2'>
          <input type="text"
            value={deleteInput}
            onChange={(e) => setDeleteInput(e.target.value)}
            placeholder="" className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5" />
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

    </div>
  );
};

export default ReminderPage;
