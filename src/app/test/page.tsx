'use client'
import { useState, useEffect } from 'react';
import { openDB, DBSchema } from 'idb';

interface CronJob {
  cron_job_id: string;
  fromSubject: string;
}

const IndexPage = () => {
  const [cronHour, setCronHour] = useState<string>('*');
  const [cronMinute, setCronMinute] = useState<string>('0');
  const [fromEmail, setEmail] = useState<string>('');
  const [fromSubject, setSubject] = useState<string>('');
  const [cronJobs, setCronJobs] = useState<CronJob[]>([]);
  const [deleteCronJobId, setDeleteCronJobId] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadCronJobs();
  }, []);

  const loadCronJobs = async () => {
    try {
      const db = await openDB<MyDB>('my-db', 1, {
        upgrade(db) {
          db.createObjectStore('settings');
        },
      });

      const cronJobs = await db.getAll('settings');
      setCronJobs(cronJobs);
    } catch (error) {
      console.error('Error loading cron jobs from IndexedDB:', error);
    }
  };

  const saveCronJob = async (cronJob: CronJob) => {
    try {
      const db = await openDB<MyDB>('my-db', 1);
      await db.put('settings', cronJob, cronJob.cron_job_id);
    } catch (error) {
      console.error('Error saving cron job to IndexedDB:', error);
    }
  };

  const handleTestClick = async () => {
    setIsLoading(true);
    try {
      const cron_expression = `${cronMinute} ${cronHour} * * *`;

      const data = {
        token: '8715e02850fc5298cb8115e29be384cf',
        cron_expression: cron_expression,
        url: `https://temp-ten-lilac.vercel.app/home?to=${fromEmail}&subject=${fromSubject}&text=reminder`,
        cron_job_name: 'Nama Pekerjaan Cron Anda'
      };

      const response = await fetch('https://server-temp.vercel.app/home/create-job', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      const jsonData = await response.json();
      console.log(jsonData);

      saveCronJob({ cron_job_id: jsonData.cron_job_id, fromSubject });
      loadCronJobs();
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };


  const handleDeleteAll = async () => {
    try {
      const db = await openDB<MyDB>('my-db', 1);
      await db.clear('settings');
      setCronJobs([]);
    } catch (error) {
      console.error('Error deleting all cron jobs from IndexedDB:', error);
    }
  };

  const handleDeleteJob = async () => {
    try {
      const response = await fetch(`https://server-temp.vercel.app/home/delete-job?token=8715e02850fc5298cb8115e29be384cf&id=${deleteCronJobId}`, {
        method: 'GET'
      });

      if (response.ok) {
        const db = await openDB<MyDB>('my-db', 1);
        await db.delete('settings', deleteCronJobId);
        loadCronJobs();
      } else {
        console.error('Failed to delete cron job');
      }
    } catch (error) {
      console.error('Error deleting cron job:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <div className="bg-white shadow-md rounded px-8 py-8">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Jam (0-23):</label>
          <input required type="text" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={cronHour} onChange={(e) => setCronHour(e.target.value)} />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Menit (0-59):</label>
          <input required type="text" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={cronMinute} onChange={(e) => setCronMinute(e.target.value)} />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
          <input
            type="email"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={fromEmail}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">Subject:</label>
          <input required type="text" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={fromSubject} onChange={(e) => setSubject(e.target.value)} />
        </div>
        <div className="flex items-center">
          {isLoading ? (
            <div role="status">
              <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
            <button className="bg-blue-500 me-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={handleTestClick}>Add</button>
          )}
          <input type="text" placeholder="Cron Job ID" className="me-2 shadow appearance-none border rounded w-48 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={deleteCronJobId} onChange={(e) => setDeleteCronJobId(e.target.value)} />
          <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={handleDeleteJob}>Delete</button>
        </div>
        <div className="mt-4">
          <p className="text-gray-700 text-sm font-bold mb-2">Daftar Cron Jobs:</p>
          <ul>
            {cronJobs.map((cronJob) => (
              <li key={cronJob.cron_job_id} className="text-gray-700 text-sm">{cronJob.cron_job_id} - {cronJob.fromSubject}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default IndexPage;

interface MyDB extends DBSchema {
  'settings': {
    key: string;
    value: CronJob;
  };
}
