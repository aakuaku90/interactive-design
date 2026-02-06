const DB_NAME = 'feedback-app';
const DB_VERSION = 1;
const STORE_NAME = 'submissions';

function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
      }
    };

    request.onsuccess = (e) => resolve(e.target.result);
    request.onerror = (e) => reject(e.target.error);
  });
}

export async function saveSubmission(data) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    const record = { ...data, timestamp: Date.now() };
    const request = store.add(record);
    request.onsuccess = () => resolve({ ...record, id: request.result });
    request.onerror = (e) => reject(e.target.error);
    tx.oncomplete = () => db.close();
  });
}

export async function getAllSubmissions() {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readonly');
    const store = tx.objectStore(STORE_NAME);
    const request = store.getAll();
    request.onsuccess = () => {
      const results = request.result.sort((a, b) => b.timestamp - a.timestamp);
      resolve(results);
    };
    request.onerror = (e) => reject(e.target.error);
    tx.oncomplete = () => db.close();
  });
}
