const db = require('../database');
const bcrypt = require('bcrypt');

function login() {
    const username = document.getElementById('user').value;
    const password = document.getElementById('pass').value;

    // verificare câmpuri goale
    if (!username || !password) {
        alert("Complete all fields!");
        return;
    }

    db.get("SELECT * FROM users WHERE username = ?", [username], async (err, user) => {
        if (!user) {
            alert("User not found");
            return;
        }

        const valid = await bcrypt.compare(password, user.password);

        if (valid) {
            //salvam utilizatorul autentificat local
            localStorage.setItem("user", JSON.stringify(user));
            window.location = "dashboard.html";
        } else {
            alert("Wrong password");
        }
    });
}
function goRegister() {
    window.location = "register.html";
}