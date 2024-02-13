'use client'
import { useEffect, useState } from 'react';

const Home: React.FC = () => {
  const [notificationPermission, setNotificationPermission] = useState<NotificationPermission>('default');

  useEffect(() => {
    checkNotificationPermission();
  }, []);

  const checkNotificationPermission = async () => {
    const permission = await Notification.requestPermission();
    setNotificationPermission(permission);
  };

  const scheduleNotification = () => {
    if (notificationPermission === 'granted') {
      const title = 'Reminder';
      const options: NotificationOptions = {
        body: 'Ini adalah notifikasi reminder!',
        icon: '/favicon.ico'
      };
      new Notification(title, options);
    } else {
      alert('Izin notifikasi belum diizinkan!');
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
