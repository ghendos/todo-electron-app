//conectam dshboard-ul la baza de date
const db = require('../database');

const user = JSON.parse(localStorage.getItem("user"));

function loadTasks() {
    db.all("SELECT * FROM tasks WHERE user_id = ?", [user.id], (err, rows) => {
        const list = document.getElementById("list");
        list.innerHTML = "";

        rows.forEach(t => {
            //creaza fiecare task in lista

            const li = document.createElement("li");

            li.innerHTML = `
                <span class="task-text ${t.completed ? 'done' : ''}">
                    ${t.title}
                </span>
                <div class="actions">
                    <button class="complete" onclick="complete(${t.id})">✔</button>
                    <button class="delete" onclick="del(${t.id})">X</button>
                </div>
            `;

            list.appendChild(li);
        });
    });
}

function addTask() {
    const title = document.getElementById("task").value;

    db.run(
        //adaugam 

        "INSERT INTO tasks (title, completed, user_id) VALUES (?, 0, ?)",
        [title, user.id],
        loadTasks
    );
}

function complete(id) {
    db.run(
        //marcam ca finalizat

        "UPDATE tasks SET completed = 1 WHERE id = ?",
        [id],
        () => {
            loadTasks();
        }
    );
}

function del(id) {
    db.run("DELETE FROM tasks WHERE id = ?", [id], loadTasks);
}

function logout() {
    //preluam utilizatorul logat

    localStorage.removeItem("user");
    window.location = "login.html";
}

loadTasks();