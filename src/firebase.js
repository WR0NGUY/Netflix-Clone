// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD9ImYRuJpZHJudcJD815rluINj5Bvi9dw",
  authDomain: "netflix-clone-5fa27.firebaseapp.com",
  projectId: "netflix-clone-5fa27",
  storageBucket: "netflix-clone-5fa27.firebasestorage.app",
  messagingSenderId: "540817109799",
  appId: "1:540817109799:web:2398eca04ee41907bd2f02"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password)=>{
    try{
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "user"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        });
    }catch (e) {
        console.log(e);
        toast.error(e.code.split('/')[1].split('-').join(" "));
    }
}

const login = async (email, password)=>{
    try {
         await signInWithEmailAndPassword(auth, email, password);
    }catch (e) {
        console.log(e);
        toast.error(e.code.split('/')[1].split('-').join(" "));
    }
}

const logout = ()=>{
    signOut(auth);
}

export {auth, db, login, signup, logout};