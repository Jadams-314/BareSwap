const container = document.getElementById("image-container");
const textOverlay = document.getElementById("textOverlay");

const signupbtn = document.getElementById("showBtn");
const login = document.getElementById("form1");
const signup = document.getElementById("form2");

if (signupbtn && login && signup) {
    signupbtn.addEventListener("click", (e) => {
        e.preventDefault();
        login.style.display = "none";
        signup.style.display = "block";
    });
}

if (container && textOverlay) {
    container.appendChild(textOverlay);
}

function checkreset() {
    window.location.reload();
}

function checkreturnlogin() {
    window.location.reload();
}

function checkpass() {
    const firstName = document.getElementById("first_name").value.trim();
    const lastName = document.getElementById("last_name").value.trim();
    const email = document.getElementById("email").value.trim();
    const first = document.getElementById("first").value;
    const second = document.getElementById("second").value;
    const message = document.getElementById("message");

    message.style.color = "red";

    if (firstName === "" || lastName === "" || email === "") {
        message.textContent = "Please enter your name and email.";
        return false;
    }

    if (first === "" || second === "") {
        message.textContent = "Please enter and confirm your password.";
        return false;
    }

    if (first !== second) {
        message.textContent = "Passwords do not match.";
        return false;
    }

    message.textContent =
        "Form checks passed. Account has not been saved yet.";
    message.style.color = "green";

    return true;
}

window.addEventListener("load", () => {
    const form = document.getElementById("signup-form");

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        checkpass();
    });

    form.addEventListener("reset", () => {
        document.getElementById("message").textContent = "";
        document.getElementById("message2").textContent = "";
    });

    const returnButton = document.getElementById("rtrnlogin");

    if (returnButton) {
        returnButton.addEventListener("click", checkreturnlogin);
    }
});