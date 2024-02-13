'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const DB_NAME = 'reminderDB';
const STORE_NAME = 'reminders';

interface Reminder {
  id: string;
  title: string;
  date: string;
  time: string;
}

const openDatabase = () => {
  return new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);

    request.onerror = () => {
      reject('Error opening database');
    };

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onupgradeneeded = (event: any) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };
  });
};

const ReminderApp: React.FC = () => {
  const [db, setDb] = useState<IDBDatabase | null>(null);
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [newReminder, setNewReminder] = useState<Reminder>({
    id: '',
    title: '',
    date: '',
    time: '',
  });
  const [repeatDays, setRepeatDays] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    openDatabase()
      .then((database: IDBDatabase) => {
        setDb(database);
        fetchReminders(database);
        requestNotificationPermission(); // Meminta izin notifikasi saat komponen dimuat
      })
      .catch((error) => {
        console.error('Error opening database:', error);
      });
  }, []);

  useEffect(() => {
    if (db) {
      reminders.forEach((reminder) => {
        sendNotification(reminder.title, reminder.date, reminder.time);
      });
    }
  }, [reminders]);

  const requestNotificationPermission = () => {
    Notification.requestPermission().then((permission) => {
      if (permission !== 'granted') {
        console.error('Permission denied for notifications');
      }
    });
  };

  const fetchReminders = (database: IDBDatabase) => {
    const transaction = database.transaction(STORE_NAME, 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const getAllReminders = store.getAll();

    getAllReminders.onsuccess = () => {
      setReminders(getAllReminders.result);
    };

    getAllReminders.onerror = (event) => {
      if (event.target) {
        console.error('Error fetching reminders:');
      } else {
        console.error('Error fetching reminders: Unknown error occurred');
      }
    };
  };

  const addReminder = () => {
    if (!db) return;

    const id = Math.random().toString(36).substr(2, 9);
    const { title, date, time } = newReminder;
    const initialReminder = { id, title, date, time };

    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const addReminder = store.add(initialReminder);

    addReminder.onsuccess = () => {
      setReminders([...reminders, initialReminder]);
    };

    addReminder.onerror = (event) => {
      console.error('Error adding reminder:');
    };

    // Process repeating reminders if repeatDays > 0
    for (let i = 1; i <= repeatDays; i++) {
      const repeatedDate = new Date(new Date(date).getTime() + i * 24 * 60 * 60 * 1000);
      const repeatedReminder = {
        id: Math.random().toString(36).substr(2, 9),
        title,
        date: repeatedDate.toISOString().split('T')[0],
        time,
      };

      const addRepeatedReminder = store.add(repeatedReminder);

      addRepeatedReminder.onsuccess = () => {
        setReminders((prevReminders) => [...prevReminders, repeatedReminder]);
      };

      addRepeatedReminder.onerror = (event) => {
        console.error('Error adding repeated reminder:');
      };
    }

    // Reset state for new input
    setNewReminder({ id: '', title: '', date: '', time: '' });
    setRepeatDays(0);
    setIsModalOpen(false); // Tutup modal setelah menambahkan pengingat
  };

  const deleteReminder = (id: string) => {
    if (!db) return;

    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const deleteReminder = store.delete(id);

    deleteReminder.onsuccess = () => {
      const updatedReminders = reminders.filter((reminder) => reminder.id !== id);
      setReminders(updatedReminders);
    };

    deleteReminder.onerror = (event) => {
      console.error('Error deleting reminder:');
    };
  };

  const sendNotification = (title: string, date: string, time: string) => {
    const scheduledTime = new Date(`${date}T${time}`).getTime();
    const currentTime = Date.now();

    if (scheduledTime > currentTime) {
      setTimeout(() => {
        if (Notification.permission === 'granted') {
          new Notification('Reminder', {
            body: `Reminder: ${title}`,
          });
        } else {
          console.error('Permission denied for notifications');
        }
      }, scheduledTime - currentTime);
    }
  };
  const deleteAllReminders = () => {
    if (!db) return;

    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const clearRequest = store.clear();

    clearRequest.onsuccess = () => {
      setReminders([]);
    };

    clearRequest.onerror = (event) => {
      console.error('Error deleting all reminders:');
    };
  };


  return (
    <div>

      <main className='mx-2 relative'>
        <div className='flex justify-between py-5'>
          <div className='p-2 bg-green-500 rounded-xl '>
            <Link href="/">
              <img src="iconprev.svg" />
            </Link>
          </div>
          <div className='font-bold text-3xl text-green-500 pt-1'>Reminder</div>
          <div></div>
        </div>
        <div className='flex'>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-green-500 me-2 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mt-4 flex justify-center"
          >
            Add Reminder
          </button>
          <button
            onClick={deleteAllReminders}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4 flex justify-center"
          >
            Delete All
          </button>
        </div>
        {isModalOpen && (
          <Modal
            onClose={() => setIsModalOpen(false)}
            newReminder={newReminder}
            setNewReminder={setNewReminder}
            repeatDays={repeatDays}
            setRepeatDays={setRepeatDays}
            addReminder={addReminder}
          />
        )}
        <ol className="border-s mt-10 mx-5 border-gray-200">
          {reminders.map((reminder) => (
            <li className="mb-10 ms-6 border-2 shadow-xl border-green-400 p-3 rounded-lg" key={reminder.id}>
              <span className="absolute ms-5 flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -start-3 ring-8 ring-white ">
                <svg className="w-2.5 h-2.5 text-blue-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                </svg>
              </span>
              <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900">{reminder.title}</h3>
              <time className="block mb-2 text-sm font-normal leading-none text-gray-400">{reminder.date} - {reminder.time}</time>
              <button onClick={() => deleteReminder(reminder.id)} className='inline-flex items-center px-4 py-2 text-sm font-medium text-gray-100 bg-red-600 border border-gray-200 rounded-lg hover:bg-red-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-200 focus:text-gray-300'>
                Delete
              </button>
            </li>
          ))}
        </ol>
      </main>
    </div>
  );
};

interface ModalProps {
  onClose: () => void;
  newReminder: Reminder;
  setNewReminder: React.Dispatch<React.SetStateAction<Reminder>>;
  repeatDays: number;
  setRepeatDays: React.Dispatch<React.SetStateAction<number>>;
  addReminder: () => void;
}

const Modal: React.FC<ModalProps> = ({
  onClose,
  newReminder,
  setNewReminder,
  repeatDays,
  setRepeatDays,
  addReminder,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-8 max-w-sm w-full z-50">
        <h2 className="text-xl font-bold mb-4">Add Reminder</h2>
        <div className="space-y-4">
          <div className="text-gray-600 mt-2">Tittle Reminder</div>
          <input
            type="text"
            placeholder="Enter reminder title"
            value={newReminder.title}
            onChange={(e) => setNewReminder({ ...newReminder, title: e.target.value })}
            className="border border-gray-300 rounded px-3 py-2 w-full"
          />
          <div className="text-gray-600 mt-2">Date</div>
          <input
            type="date"
            value={newReminder.date}
            onChange={(e) => setNewReminder({ ...newReminder, date: e.target.value })}
            className="border border-gray-300 rounded px-3 py-2 w-full"
          />
          <div className="text-gray-600 mt-2">Time</div>
          <input
            type="time"
            value={newReminder.time}
            onChange={(e) => setNewReminder({ ...newReminder, time: e.target.value })}
            className="border border-gray-300 rounded px-3 py-2 w-full"
          />
          <div className="text-gray-600 mt-2">Repeat Day</div>
          <input
            type="number"
            placeholder="Repeat days"
            value={repeatDays}
            onChange={(e) => setRepeatDays(parseInt(e.target.value))}
            className="border border-gray-300 rounded px-3 py-2 w-full"
          />
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="bg-blue-500 mx-2 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Cancel
            </button>
            <button
              onClick={addReminder}
              className="bg-green-400 text-white px-4 py-2 rounded hover:bg-green-500"
            >
              Add Reminder
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReminderApp;
