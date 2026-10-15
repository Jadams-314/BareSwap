const readline  = require('readline');
const fs = require('fs');
const USERS_FILE = "users.json";

//     LOGIN AND REGISTER SYSTEM

function loadUsers(file = USERS_FILE){
    if (!fs.existsSync(file)) return {};
    const text = fs.readFileSync(file, "utf8");
    if (text.trim() === "") return {};
    return JSON.parse(text);
} 


function saveUsers(users, file = USERS_FILE) {
    fs.writeFileSync(file, JSON.stringify(users, null, 2));

}

function registerUser(username, password, file = USERS_FILE) {
    const users = loadUsers(file);
    if (users[username]) return false;
    users[username] = password;
    saveUsers(users, file);
    return true;
}

 function checkLogin(username, password, file = USERS_FILE) {
    const users = loadUsers(file);
    return users[username] === password;
}

async function main() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    function ask(question) {
        return new Promise((resolve) => rl.question(question, resolve));
    }
    let running = true;
    while (running) {
        console.log("\n1) Register");
        console.log("2) Login");
        console.log("3) Quit");
        const choice = await ask("Choose: ");

        if (choice === "1") {
            const username = await ask("Choose a username: ");
            const password = await ask("Choose a password: ");
            if (registerUser(username, password)) {
                console.log("Account created!");
            }
            else {
                console.log("That username has be taken already.");
            }
        }
        else if (choice === "2") {
            const username = await ask("Username: ");
            const password = await ask("Password: ");
            if (checkLogin(username, password)){
                console.log("Welcome, " + username + "!");
            }
            else {
                console.log("Wrong username or password.");
            }
        }
        else if (choice === "3") {
            running = false;
        }
        else{
            console.log("Select from 1,2 or 3.");
        }
    }
    rl.close();
}

module.exports = {loadUsers, registerUser, checkLogin };

if (require.main === module) {
    main();
}