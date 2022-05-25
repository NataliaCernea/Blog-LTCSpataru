const firebaseConfig = {
    apiKey: "AIzaSyDIfV3HNT_MgokSUrLXQmH_ickFf9015cc",
    authDomain: "blog-school-54301.firebaseapp.com",
    projectId: "blog-school-54301",
    storageBucket: "blog-school-54301.appspot.com",
    messagingSenderId: "497382816999",
    appId: "1:497382816999:web:8e483f3500dbd89cf03642",
    measurementId: "G-F54H6F5CZG"
  };

function mobileMenu() {
    var x = document.getElementById("navbar");
    if (x.className === "") {
        x.className = "mobile";
    } else {
        x.className = "";
    }
}

const yearElement = document.getElementById('year');
const loginBtn = document.getElementById('login-btn');
const logoutBtn = document.getElementById('logout-btn');
const postareBtn = document.getElementById('postare-btn');
const salutare = document.getElementById('username');
let user = null;
let admins = ["502q1WPJwiMUopKLNbgYS0TfI0r2"]

// setam bazele firebase, ne conectam la serviciu
firebase.initializeApp(firebaseConfig);

// referinta la serviciul de autentificare
const auth = firebase.auth();
//referinta la baza de date
const db = firebase.firestore();
//referinta la colectia de postari din BD
const postariDb = db.collection('postari');

// alegem providerul de logare  Google
const provider = new firebase.auth.GoogleAuthProvider();

loginBtn.onclick = function() {
    console.log("logare...");
    auth.signInWithPopup(provider).then(function() {window.location.reload();})
    
}
logoutBtn.onclick = function() {
    auth.signOut();
    window.location.reload();
}
function isAdmin() {

    let admin;

    if (user == null)
    return false;
    admin = admins.includes(user.uid); 
  return admin;
}

function formatDate(time) {
    let date = new Date(time);
    let year = date.getFullYear();
    let month = date.getMonth() +1;
    let day = date.getDate();

    let result = day + "-" + month + "-" + year;
    return result;
}
auth.onAuthStateChanged(function(fuser) {
    user = fuser;
    console.log(user);
    if (user != null) {
        // logat in sistem
        logoutBtn.style.display = "block";
        loginBtn.style.display = "none";

        salutare.innerHTML = "Salutare, "+ user.displayName;



        if (isAdmin() == true) {
        postareBtn.style.display = "block";
        }
        else {
            postareBtn.style.display = "none";
        }
    }
    else {  
                logoutBtn.style.display = "none";
                loginBtn.style.display = "block";  
                postareBtn.style.display = "none";
        }

    document.querySelector('body').style.display = "block";
})

if (yearElement) {
    let date = new Date();
    
    yearElement.innerHTML = date.getFullYear() + " ©";
}

