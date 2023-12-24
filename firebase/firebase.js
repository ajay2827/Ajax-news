import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDOOCD1MGtvqmh5dsav23ZK4vMQFyLMK94',
  authDomain: 'news-reader-78c38.firebaseapp.com',
  projectId: 'news-reader-78c38',
  storageBucket: 'news-reader-78c38.appspot.com',
  messagingSenderId: '155686641481',
  appId: '1:155686641481:web:d465dd87e7fc5283bfc498',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
