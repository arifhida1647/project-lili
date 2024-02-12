'use client'
import React, { useState, useEffect } from 'react';
import Head from 'next/head';

interface Reminder {
  id: string;
  title: string;
  date: string;
  time: string;
}

const ReminderApp: React.FC = () => {
  const [reminders, setReminders] = useState<Reminder[]>(() => {
    const storedReminders = localStorage.getItem('reminders');
    return storedReminders ? JSON.parse(storedReminders) : [];
  });
  const [newReminder, setNewReminder] = useState<Reminder>({
    id: '',
    title: '',
    date: '',
    time: '',
  });
  const [repeatDays, setRepeatDays] = useState<number>(0); // State untuk menyimpan jumlah hari pengulangan

  useEffect(() => {
    localStorage.setItem('reminders', JSON.stringify(reminders));
  }, [reminders]);

  const addReminder = () => {
    const id = Math.random().toString(36).substr(2, 9);
    const { title, date, time } = newReminder;
    const initialReminder = { id, title, date, time };
    setReminders([...reminders, initialReminder]);

    // Mengirim notifikasi saat pengguna menambahkan reminder
    sendNotification(newReminder.title);

    // Memproses pengulangan jika jumlah hari pengulangan > 0
    for (let i = 1; i <= repeatDays; i++) {
      const repeatedDate = new Date(new Date(date).getTime() + i * 24 * 60 * 60 * 1000); // Tambahkan hari ke tanggal
      const repeatedReminder = {
        id: Math.random().toString(36).substr(2, 9),
        title,
        date: repeatedDate.toISOString().split('T')[0],
        time,
      };
      setReminders(prevReminders => [...prevReminders, repeatedReminder]);
    }

    // Reset state untuk input baru
    setNewReminder({ id: '', title: '', date: '', time: '' });
    setRepeatDays(0);
  };

  const deleteReminder = (id: string) => {
    const updatedReminders = reminders.filter((reminder) => reminder.id !== id);
    setReminders(updatedReminders);
  };

  const sendNotification = (title: string) => {
  const scheduledTime = new Date(`${newReminder.date}T${newReminder.time}`).getTime();
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
