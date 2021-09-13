import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
const firebaseConfig = {
  apiKey: "AIzaSyDSg33iLGLfoNKW0X2BxpU1Y4CYyiPhvU0",
  authDomain: "twf-auth-2031f.firebaseapp.com",
  projectId: "twf-auth-2031f",
  storageBucket: "twf-auth-2031f.appspot.com",
  messagingSenderId: "856581971779",
  appId: "1:856581971779:web:90930097e8766b71bdd9f6",
  databaseURL: "https://twf-auth-2031f-default-rtdb.firebaseio.com/",
};

const fire = initializeApp(firebaseConfig);
const auth = getAuth(fire);
const database = getDatabase(fire);
// const storage = storage();
export { database };
export default auth;
