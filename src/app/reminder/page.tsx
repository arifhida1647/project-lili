'use client'
import { useEffect, useState } from 'react';

const Home: React.FC = () => {
  const [notificationPermission, setNotificationPermission] = useState<NotificationPermission>('default');

  useEffect(() => {
    checkNotificationPermission();
  }, []);

  const checkNotificationPermission = async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      setNotificationPermission(permission);
    }
  };

  const scheduleNotification = () => {
    if ('Notification' in window && notificationPermission === 'granted') {
      const title = 'Reminder';
      const options: NotificationOptions = {
        body: 'Ini adalah notifikasi reminder!',
        icon: '/favicon.ico'
      };
      new Notification(title, options);
    } else if ('Notification' in window && notificationPermission !== 'granted') {
      alert('Anda belum mengizinkan notifikasi pada peramban Anda.');
    } else {
      alert('Peramban Anda tidak mendukung notifikasi.');
    }
  };

  return (
    <div>
      <h1>Reminder Schedule</h1>
      <button onClick={scheduleNotification}>Buat Notifikasi</button>
    </div>
  );
};

export default Home;