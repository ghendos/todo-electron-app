const db = require('../database');
const bcrypt = require('bcrypt');


async function register() {
    const errorEl = document.getElementById("error");
    errorEl.innerText = "";
    //luam din inputuri..

    const username = document.getElementById('user').value.trim();
    const password = document.getElementById('pass').value;
    const confirm = document.getElementById('confirm').value;

    //validare câmpuri
    if (!username || !password || !confirm) {
        errorEl.innerText = "Complete all fields!";
        return;
    }

    //validare lungime parolă 
    if (password.length < 4) {
        errorEl.innerText = ""Password is too short!"";
        return;
    }

    //confirm password
    if (password !== confirm) {
        errorEl.innerText = "Passwords do not match!";
        return;
    }

    try {
        const hashed = await bcrypt.hash(password, 10);

        db.run(
            "INSERT INTO users (username, password, role) VALUES (?, ?, ?)",
            [username, hashed, 'user'],
            function (err) {
                if (err) {
                    // dacă username există deja
                    if (err.message.includes("UNIQUE")) {
                        errorEl.innerText = "Username already exists!";
                    } else {
                        errorEl.innerText = "Error creating account!";
                    }
                    return;
                }


                alert("Account created!");
                window.location = "login.html";
            }
        );

    } catch (e) {
        errorEl.innerText = ""Unexpected error occurred!"";
    }
}