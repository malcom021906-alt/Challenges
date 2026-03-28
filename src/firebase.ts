import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyBatmNypVDkEFZBkcZoqMx0eeCdE7MlklM",
  authDomain: "moonlit-triumph-386213.firebaseapp.com",
  projectId: "moonlit-triumph-386213",
  storageBucket: "moonlit-triumph-386213.appspot.com",
  messagingSenderId: "123186835176",
  appId: "1:123186835176:web:b183626ca3d838706dd65b",
  databaseURL: "https://moonlit-triumph-386213-default-rtdb.firebaseio.com"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const rtdb = getDatabase(app);