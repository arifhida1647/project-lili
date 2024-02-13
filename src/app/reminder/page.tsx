'use client'
import { useEffect, useState } from 'react';
import { openDB } from 'idb';

const Home: React.FC = () => {
  const [notificationPermission, setNotificationPermission] = useState<NotificationPermission>('default');
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  useEffect(() => {
    checkNotificationPermission();
  }, []);

  const checkNotificationPermission = async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      setNotificationPermission(permission);
    }
  };

  const scheduleNotification = async () => {
    if ('Notification' in window && notificationPermission === 'granted') {
      try {
        const db = await openDB('notificationsDB', 1, {
          upgrade(db) {
            db.createObjectStore('notifications', { keyPath: 'id' });
          },
        });

        const notificationData = { id: Date.now(), title, date, time };
        await db.add('notifications', notificationData);

        alert('Notifikasi telah dijadwalkan.');

        // Menentukan kapan notifikasi harus muncul
        const scheduledTime = new Date(`${date}T${time}`).getTime();
        const currentTime = new Date().getTime();
        const timeUntilNotification = scheduledTime - currentTime;

        // Mengatur timeout untuk memunculkan notifikasi pada waktu yang dijadwalkan
        setTimeout(() => {
          showNotification(notificationData);
        }, timeUntilNotification);
      } catch (error) {
        console.error('Error scheduling notification:', error);
      }
    } else if ('Notification' in window && notificationPermission !== 'granted') {
      alert('Anda belum mengizinkan notifikasi pada peramban Anda.');
    } else {
      alert('Peramban Anda tidak mendukung notifikasi.');
    }
  };

  const showNotification = async (notificationData: any) => {
    if ('Notification' in window) {
      const { title, body, icon } = notificationData;
      const options: NotificationOptions = {
        body,
        icon
      };
      await new Notification(title, options);
    }
  };

  return (
    <div>
      <h1>Reminder Schedule</h1>
      <form>
        <div>
          <label htmlFor="title">Judul:</label>
          <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div>
          <label htmlFor="date">Tanggal:</label>
          <input type="date" id="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
        <div>
          <label htmlFor="time">Waktu:</label>
          <input type="time" id="time" value={time} onChange={(e) => setTime(e.target.value)} />
        </div>
        <button type="button" onClick={scheduleNotification}>Buat Notifikasi</button>
      </form>
    </div>
  );
};

export default Home;

