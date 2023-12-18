import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, browserLocalPersistence, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBOe2_GvMvAtbpRmlO6wBowB4YCfUJCGD4",
  authDomain: "lista-de-tarefas-2276c.firebaseapp.com",
  projectId: "lista-de-tarefas-2276c",
  storageBucket: "lista-de-tarefas-2276c.appspot.com",
  messagingSenderId: "421095639051",
  appId: "1:421095639051:web:477ad7aa4d8fbd9d3fdf0e",
  measurementId: "G-ZFC2Z0T328"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);

setPersistence(auth, browserLocalPersistence)
  .then(() => {
  })
  .catch((error) => {
    console.error("Erro ao definir a persistência:", error.message);
  });

export { auth, db };