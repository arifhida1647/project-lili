'use client'
import React, { useState, useEffect } from 'react';
import Head from 'next/head';

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

  useEffect(() => {
    openDatabase()
      .then((database: IDBDatabase) => {
        setDb(database);
        fetchReminders(database);
      })
      .catch((error) => {
        console.error('Error opening database:', error);
      });
  }, []);

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
      sendNotification(title, date, time); // Panggil fungsi sendNotification setelah menambahkan pengingat
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
        sendNotification(title, repeatedReminder.date, time); // Panggil fungsi sendNotification untuk pengingat berulang
      };

      addRepeatedReminder.onerror = (event) => {
        console.error('Error adding repeated reminder:');
      };
    }

    // Reset state for new input
    setNewReminder({ id: '', title: '', date: '', time: '' });
    setRepeatDays(0);
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
          Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
              new Notification('Reminder', {
                body: `Reminder: ${title}`,
              });
            }
          });
        }
      }, scheduledTime - currentTime);
    }
  };

  return (
    <div>
      <Head>
        <title>Reminder App</title>
        <meta name="description" content="Your reminder app description" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Reminder App</h1>
        <div>
          <input
            type="text"
            placeholder="Enter reminder title"
            value={newReminder.title}
            onChange={(e) => setNewReminder({ ...newReminder, title: e.target.value })}
          />
          <input
            type="date"
            value={newReminder.date}
            onChange={(e) => setNewReminder({ ...newReminder, date: e.target.value })}
          />
          <input
            type="time"
            value={newReminder.time}
            onChange={(e) => setNewReminder({ ...newReminder, time: e.target.value })}
          />
          <input
            type="number"
            placeholder="Repeat days"
            value={repeatDays}
            onChange={(e) => setRepeatDays(parseInt(e.target.value))}
          />
          <button onClick={addReminder}>Add Reminder</button>
        </div>

        <ul>
          {reminders.map((reminder) => (
            <li key={reminder.id}>
              <div>{reminder.title}</div>
              <div>{reminder.date} - {reminder.time}</div>
              <button onClick={() => deleteReminder(reminder.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
};

export default ReminderApp;
