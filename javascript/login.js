

function checkreset() {
    document.getElementById("login-form").reset();
    document.getElementById("message").innerHTML = "";
    document.getElementById("message2").innerHTML = "";
}

async function checklog() {
    const user = document.getElementById("user").value;
    const password = document.getElementById("password").value;
    const message = document.getElementById("message");

    if (user.trim() === "" || password === "") {
        message.innerHTML =
            "Please enter your username and password. <br>";
        message.style.color = "red";
        return false;
    }

    try {
        const response = await fetch(
            "http://localhost:3000/api/login", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: user.trim(),
                    password: password
                })
            }
        );

        const result = await response.json();

        if (!response.ok) {
            message.textContent = result.message;
            message.style.color = "red";
            return false;
        }
        else {
            message.textContent = "Welcome, " + result.username + "!";
            message.style.color = "green";

            setTimeout(() => {
                window.location.href = "index.html";
            }, 2000);

            return true;
        }
    }
    catch (error) {
        message.textContent =
            "Cannot connect to the backend. Check that it is running.";
        message.style.color = "red";
        return false;
    }
}

window.addEventListener("load", () => {
    document.getElementById("login-form")
        .addEventListener("submit", function(event) {
            event.preventDefault();
            checklog();
        });

    document.getElementById("reset")
        .addEventListener("click", checkreset);
});
